import React from "react";
import { cn } from "@/lib/utils";

interface CodeWindowProps {
  children: React.ReactNode;
  className?: string;
  // Deprecated usage support (optional, but cleaner to just remove if unused)
  title?: string;
  headerClassName?: string;
  withTrafficLights?: boolean;
  actions?: React.ReactNode;
}

export function CodeWindow({ children, className }: CodeWindowProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-transparent border border-[#3d3a50] overflow-hidden my-6",
        className,
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
