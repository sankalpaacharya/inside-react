"use client";

import { z } from "zod";
import { Block, HighlightedCodeBlock, parseProps } from "codehike/blocks";
import {
  AnnotationHandler,
  HighlightedCode,
  InnerToken,
  Pre,
} from "codehike/code";
import { useState, useEffect, useRef } from "react";
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
  const [mounted, setMounted] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [mounted, steps.length]);

  const activeCode = steps[activeStep]?.code;

  return (
    <>
      {/* Full-width scrollycoding - breaks out of container */}
      <div className="scrollycoding relative -mx-6 lg:-mx-[calc((100vw-64rem)/2+1.5rem)] lg:w-screen">
        <div className="flex">
          {/* Left: Text content - 50% width */}
          <div className="w-full lg:w-1/2 px-6 lg:pl-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] lg:pr-12">
            <div className="space-y-[60vh] py-[35vh]">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="transition-all duration-700 ease-out"
                  style={{
                    opacity: activeStep === index ? 1 : 0.15,
                    transform:
                      activeStep === index ? "none" : "translateY(4px)",
                  }}
                >
                  <h3 className="text-lg font-medium text-foreground mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-[15px] leading-[1.8] text-zinc-400 max-w-md [&_strong]:text-foreground [&_code]:text-[13px] [&_code]:bg-zinc-800/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-zinc-300">
                    {step.children}
                  </div>

                  {/* Mobile: Show code inline */}
                  <div className="lg:hidden mt-8">
                    {step.code && <CodePanel code={step.code} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky code panel - 50% width */}
          <div className="hidden lg:block lg:w-1/2 relative">
            <div className="sticky top-0 h-screen flex items-center pr-6 lg:pr-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]">
              <div className="w-full h-[75vh]">
                {activeCode && <CodePanel code={activeCode} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CodePanel({ code }: { code: HighlightedCode }) {
  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden bg-[#0d1117] border border-zinc-800/40 shadow-2xl shadow-black/30">
      {/* Tab header - like fant.io */}
      <div className="flex items-center border-b border-zinc-800/40 bg-[#161b22] shrink-0">
        <button className="px-4 py-2.5 text-xs font-medium text-zinc-200 border-b-2 border-cyan-500 bg-[#0d1117]">
          Code
        </button>
      </div>

      {/* Code content with token transitions */}
      <div className="flex-1 overflow-auto">
        <Pre
          code={code}
          handlers={[tokenTransitions]}
          className="p-5 text-[13px] leading-[1.75] h-full font-mono"
          style={{
            ...code.style,
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
}
