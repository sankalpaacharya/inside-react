import { highlight } from "codehike/code";
import premiumTheme from "@/lib/premium-theme.json";
import {
  LineExecutionClient,
  type HighlightedLine,
  type ConsoleEntry,
} from "./line-execution-client";

interface LineExecutionDemoProps {
  /** Raw code string to highlight */
  code: string;
  /** Language for syntax highlighting (default: "jsx") */
  lang?: string;
  /** Ms per line animation speed (default: 800) */
  speed?: number;
  /** Title shown in the header */
  title?: string;
  /** Console output entries tied to line indices */
  console?: ConsoleEntry[];
  /** 0-based line index to start execution from (default: 0) */
  startAt?: number;
  /** 0-based line index to stop execution at, inclusive (default: last line) */
  stopAt?: number;
}

/**
 * Server component that highlights code with CodeHike/Shiki
 * and passes the colored tokens to the animated client component.
 */
export async function LineExecutionDemo({
  code,
  lang = "jsx",
  speed = 800,
  title = "Code Execution",
  console: consoleLogs = [],
  startAt,
  stopAt,
}: LineExecutionDemoProps) {
  const highlighted = await highlight(
    { value: code.trim(), lang, meta: "" },
    premiumTheme as any
  );

  // Split tokens into lines.
  // CodeHike tokens: (Token | Whitespace)[]
  // Token = [string, color?, styles?], Whitespace = string (contains "\n")
  const lines: HighlightedLine[] = [[]];

  for (const token of highlighted.tokens) {
    if (typeof token === "string") {
      // Whitespace — split by newlines
      const parts = token.split("\n");
      // First part appends to current line
      if (parts[0]) {
        lines[lines.length - 1].push([parts[0]]);
      }
      // Each subsequent part starts a new line
      for (let k = 1; k < parts.length; k++) {
        lines.push([]);
        if (parts[k]) {
          lines[lines.length - 1].push([parts[k]]);
        }
      }
    } else {
      // Highlighted token [text, color?, styles?]
      lines[lines.length - 1].push(token);
    }
  }

  // Filter out completely empty trailing lines
  while (lines.length > 0 && lines[lines.length - 1].length === 0) {
    lines.pop();
  }

  return (
    <LineExecutionClient
      lines={lines}
      speed={speed}
      title={title}
      themeStyle={highlighted.style}
      console={consoleLogs}
      startAt={startAt}
      stopAt={stopAt}
    />
  );
}
