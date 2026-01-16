"use client";

import { z } from "zod";
import { Block, HighlightedCodeBlock, parseProps } from "codehike/blocks";
import {
  AnnotationHandler,
  HighlightedCode,
  InnerToken,
  Pre,
} from "codehike/code";
import { useState, useEffect, useRef, useCallback } from "react";
import { SmoothPre } from "./smooth-pre";

// Token transitions handler for smooth code animations
const tokenTransitions: AnnotationHandler = {
  name: "token-transitions",
  PreWithRef: SmoothPre,
  Token: (props) => (
    <InnerToken merge={props} style={{ display: "inline-block" }} />
  ),
};

// Schema for scrollycoding content
const Schema = Block.extend({
  steps: z.array(Block.extend({ code: HighlightedCodeBlock })),
});

type ScrollycodingProps = {
  children?: React.ReactNode;
  steps?: unknown[];
  [key: string]: unknown;
};

export function Scrollycoding(props: ScrollycodingProps) {
  const { steps } = parseProps(props, Schema);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Find which step is most prominent in the viewport
  const updateActiveStep = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const targetY = viewportHeight * 0.3; // Focus point at 30% from top

    let closestIndex = 0;
    let closestDistance = Infinity;

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const rect = ref.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - targetY);

      // Only consider if element is at least partially visible
      if (rect.bottom > 0 && rect.top < viewportHeight) {
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      }
    });

    setActiveStep(closestIndex);
  }, []);

  useEffect(() => {
    // Initial update
    updateActiveStep();

    // Update on scroll
    const handleScroll = () => {
      requestAnimationFrame(updateActiveStep);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateActiveStep]);

  const activeCode = steps[activeStep]?.code;

  return (
    <div className="scrollycoding w-full">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Text content */}
        <div className="w-full lg:w-1/2 px-6 lg:pl-[max(24px,calc((100vw-1200px)/2))] lg:pr-16">
          <div className="max-w-md ml-auto space-y-20 pt-16 pb-32">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="transition-opacity duration-300 ease-out"
                style={{
                  opacity: activeStep === index ? 1 : 0.35,
                }}
              >
                <h3 className="text-base font-medium text-foreground mb-3">
                  {step.title}
                </h3>
                <div className="text-sm leading-[1.75] text-muted-foreground [&_strong]:text-foreground [&_code]:text-xs [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded">
                  {step.children}
                </div>

                {/* Mobile: Show code inline */}
                <div className="lg:hidden mt-6">
                  {step.code && <CodeDisplay code={step.code} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sticky code */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="sticky top-0 pt-16 px-6 lg:pr-[max(24px,calc((100vw-1200px)/2))] lg:pl-8">
            <div className="w-full">
              {activeCode && <CodeDisplay code={activeCode} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Clean syntax highlighted code - no box/container
function CodeDisplay({ code }: { code: HighlightedCode }) {
  return (
    <div className="font-mono">
      {/* Filename - subtle */}
      {code.meta && (
        <div className="text-xs text-muted-foreground mb-3 opacity-60">
          {code.meta}
        </div>
      )}
      {/* Just the code with syntax highlighting */}
      <Pre
        code={code}
        handlers={[tokenTransitions]}
        className="text-[13px] leading-[1.8]"
        style={{
          ...code.style,
          background: "transparent",
        }}
      />
    </div>
  );
}
