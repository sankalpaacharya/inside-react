"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A single highlighted token: [text, color?, styles?]
 * Matches CodeHike's Token type.
 */
type Token = [string, string?, React.CSSProperties?];

/** A line is an array of tokens */
export type HighlightedLine = Token[];

/** Console log entry produced when a line executes */
export interface ConsoleEntry {
  /** 0-based line index that triggers this log */
  line: number;
  /** Text to print */
  text: string;
  /** Optional type for styling */
  type?: "log" | "warn" | "error" | "info";
}

interface LineExecutionClientProps {
  lines: HighlightedLine[];
  speed?: number;
  title?: string;
  themeStyle?: React.CSSProperties;
  console?: ConsoleEntry[];
  startAt?: number;
  stopAt?: number;
  /** 0-based line indices to skip during execution */
  skip?: number[];
}

const LOG_COLOR_MAP: Record<string, string> = {
  log: "text-[#cdd6f4]",
  info: "text-[#89b4fa]",
  warn: "text-[#f9e2af]",
  error: "text-[#f38ba8]",
};

export function LineExecutionClient({
  lines,
  speed = 800,
  title = "Code Execution",
  themeStyle = {},
  console: consoleLogs = [],
  startAt = 0,
  stopAt,
  skip = [],
}: LineExecutionClientProps) {
  const effectiveStop = stopAt ?? lines.length - 1;
  const skipSet = new Set(skip);
  const [activeLine, setActiveLine] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [executedLines, setExecutedLines] = useState<Set<number>>(new Set());
  const [logs, setLogs] = useState<{ text: string; type: string }[]>([]);

  const reset = useCallback(() => {
    setActiveLine(-1);
    setIsPlaying(false);
    setExecutedLines(new Set());
    setLogs([]);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    if (activeLine >= effectiveStop) {
      setIsPlaying(false);
      return;
    }

    const timeout = setTimeout(() => {
      let next = activeLine === -1 ? startAt : activeLine + 1;
      while (skipSet.has(next) && next <= effectiveStop) next++;
      if (next > effectiveStop) {
        setIsPlaying(false);
        return;
      }
      setActiveLine(next);
      setExecutedLines((s) => new Set(s).add(next));

      const entries = consoleLogs.filter((e) => e.line === next);
      if (entries.length > 0) {
        setLogs((prev) => [
          ...prev,
          ...entries.map((e) => ({ text: e.text, type: e.type ?? "log" })),
        ]);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [isPlaying, activeLine, effectiveStop, startAt, speed, consoleLogs]);

  const play = () => {
    if (activeLine >= effectiveStop) {
      reset();
      setTimeout(() => setIsPlaying(true), 50);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="my-6 overflow-hidden rounded-xl border border-border font-mono text-sm"
      style={{
        background: themeStyle.background ?? "#1e1e2e",
        color: themeStyle.color ?? "#cdd6f4",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
        <span className="text-xs font-semibold opacity-60">{title}</span>
        <div className="flex gap-2">
          <button
            onClick={isPlaying ? () => setIsPlaying(false) : play}
            className="cursor-pointer rounded-md bg-[#cba6f7] px-3.5 py-1 text-xs font-semibold text-[#1e1e2e] transition-opacity hover:opacity-90"
          >
            {isPlaying
              ? "⏸ Pause"
              : activeLine >= effectiveStop
                ? "↻ Replay"
                : "▶ Run"}
          </button>
          {activeLine >= 0 && (
            <button
              onClick={reset}
              className="cursor-pointer rounded-md border border-white/15 bg-transparent px-3.5 py-1 text-xs font-semibold opacity-70 transition-opacity hover:opacity-100"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Code lines */}
      <div className="overflow-x-auto py-3">
        {lines.map((tokens, i) => {
          const isActive = i === activeLine;
          const isExecuted = executedLines.has(i) && !isActive;
          const isSkipped = skipSet.has(i);
          const isOutOfRange = i < startAt || i > effectiveStop || isSkipped;
          const isPending =
            activeLine >= 0 && !isExecuted && !isActive && !isOutOfRange;

          return (
            <div
              key={i}
              className={cn(
                "relative flex min-h-6.5 items-center px-4 transition-all duration-300",
                isActive && "bg-[#cba6f7]/10",
                isOutOfRange && "opacity-30",
                isPending && "opacity-35",
                isExecuted && "opacity-50",
              )}
            >
              {/* Active line indicator bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.75 rounded-r-sm"
                animate={{
                  backgroundColor: isActive
                    ? "#cba6f7"
                    : "rgba(203,166,247,0)",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Line number */}
              <span
                className={cn(
                  "mr-4 w-7 shrink-0 select-none text-right text-xs transition-colors duration-300",
                  isActive
                    ? "font-bold text-[#cba6f7]"
                    : "font-normal text-[#cdd6f4]/30",
                )}
              >
                {i + 1}
              </span>

              {/* Highlighted tokens */}
              <span className="whitespace-pre">
                {tokens.map((token, j) => {
                  const [text, color, styles] = token;
                  return (
                    <span
                      key={j}
                      className="transition-opacity duration-300"
                      style={{ ...styles, color: color ?? "inherit" }}
                    >
                      {text}
                    </span>
                  );
                })}
              </span>
            </div>
          );
        })}
      </div>

      {/* Console output panel */}
      <div className="border-t border-white/8 bg-black/15">
        <div
          className={cn(
            "px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wider opacity-50",
            logs.length > 0 && "border-b border-white/5",
          )}
        >
          Console
        </div>
        <div className="min-h-9 max-h-36 overflow-y-auto px-4 py-1.5">
          {logs.length === 0 ? (
            <span className="text-xs opacity-25">
              Run the code to see output...
            </span>
          ) : (
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "flex items-center gap-2 py-0.5 text-sm",
                    LOG_COLOR_MAP[log.type] ?? LOG_COLOR_MAP.log,
                  )}
                >
                  <span className="text-[0.7rem] opacity-40">›</span>
                  <span>{log.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
