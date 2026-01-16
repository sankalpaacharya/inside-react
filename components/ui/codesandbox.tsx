"use client";

interface CodeSandboxProps {
  /** The CodeSandbox ID (e.g., "new" or "abc123") */
  id: string;
  /** Title for the sandbox */
  title?: string;
  /** Height of the embed */
  height?: number;
  /** Show file explorer (1 = hide, 0 = show) */
  hidenavigation?: boolean;
  /** Default module to open */
  module?: string;
  /** Theme: light or dark */
  theme?: "light" | "dark";
  /** View mode */
  view?: "editor" | "preview" | "split";
}

export function CodeSandbox({
  id,
  title = "Code Example",
  height = 500,
  hidenavigation = true,
  module,
  theme = "dark",
  view = "split",
}: CodeSandboxProps) {
  const params = new URLSearchParams({
    fontsize: "14",
    hidenavigation: hidenavigation ? "1" : "0",
    theme,
    view,
    ...(module && { module }),
  });

  const embedUrl = `https://codesandbox.io/embed/${id}?${params.toString()}`;

  return (
    <div
      className="not-prose my-8 rounded-xl border border-border overflow-hidden"
      style={{ height }}
    >
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        loading="lazy"
      />
    </div>
  );
}
