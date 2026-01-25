"use client";
import { useState, ReactNode } from "react";

type TreeProps = {
  title: string;
  children: ReactNode;
};

type NodeProps = {
  label: string;
  children?: ReactNode;
  highlight?: boolean;
};

export default function ReconcileDemo() {
  const [count, setCount] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);

  function reconcile(): void {
    setAnimate(true);
    setTimeout(() => {
      setCount(c => c + 1);
      setAnimate(false);
    }, 400);
  }

  return (
    <div className="flex items-center justify-center gap-10 my-10 font-mono">
      <Tree title="Old Tree">
        <Node label="CounterApp">
          <Node label="Text">
            <Node label={`Count: ${count}`} highlight={animate} />
          </Node>
        </Node>
      </Tree>

      <button
        onClick={reconcile}
        className="px-4 py-2 rounded border bg-white hover:bg-gray-50 transition"
      >
        Reconcile
      </button>

      <Tree title="New Tree">
        <Node label="CounterApp">
          <Node label="Text">
            <Node label={`Count: ${count + (animate ? 1 : 0)}`} />
          </Node>
        </Node>
      </Tree>
    </div>
  );
}

function Tree({ title, children }: TreeProps) {
  return (
    <div className="border rounded-lg p-4 min-w-45">
      <div className="text-sm font-semibold mb-2 text-gray-600">{title}</div>
      {children}
    </div>
  );
}

function Node({ label, children, highlight }: NodeProps) {
  return (
    <div
      className={`border rounded px-2 py-1 mt-1 bg-gray-50 transition-transform
        ${highlight ? "bg-blue-100 border-blue-500 scale-105" : ""}
      `}
    >
      {label}
      {children && <div className="ml-4 mt-1">{children}</div>}
    </div>
  );
}
