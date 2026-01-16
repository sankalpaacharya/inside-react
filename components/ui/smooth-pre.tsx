"use client";

import { CustomPreProps, InnerPre, getPreRef } from "codehike/code";
import {
  TokenTransitionsSnapshot,
  calculateTransitions,
  getStartingSnapshot,
} from "codehike/utils/token-transitions";
import React from "react";

const MAX_TRANSITION_DURATION = 900; // milliseconds - calmer, smoother

export class SmoothPre extends React.Component<CustomPreProps> {
  ref: React.RefObject<HTMLPreElement | null>;

  constructor(props: CustomPreProps) {
    super(props);
    this.ref = getPreRef(this.props);
  }

  render() {
    return <InnerPre merge={this.props} style={{ position: "relative" }} />;
  }

  getSnapshotBeforeUpdate() {
    return getStartingSnapshot(this.ref.current!);
  }

  componentDidUpdate(
    prevProps: never,
    prevState: never,
    snapshot: TokenTransitionsSnapshot
  ) {
    const transitions = calculateTransitions(this.ref.current!, snapshot);
    transitions.forEach(({ element, keyframes, options }) => {
      const kf = keyframes as Record<string, unknown>;
      const animationKeyframes: PropertyIndexedKeyframes = {};

      const { translateX, translateY, ...rest } = kf;

      // Handle translate
      if (translateX && translateY) {
        const tx = translateX as [number, number];
        const ty = translateY as [number, number];
        animationKeyframes.translate = [
          `${tx[0]}px ${ty[0]}px`,
          `${tx[1]}px ${ty[1]}px`,
        ];
      }

      // Copy other properties
      Object.entries(rest).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          animationKeyframes[key] = value.map(String);
        }
      });

      element.animate(animationKeyframes, {
        duration: options.duration * MAX_TRANSITION_DURATION,
        delay: options.delay * MAX_TRANSITION_DURATION,
        easing: options.easing,
        fill: "both",
      });
    });
  }
}
