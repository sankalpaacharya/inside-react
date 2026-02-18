"use client";

import { useEffect, useState } from "react";

function GaiaLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2441.45 2400"
    >
      <defs>
        <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#02bdff" />
          <stop offset="50%" stopColor="#059cda" />
          <stop offset="100%" stopColor="#0f537c" />
        </linearGradient>
      </defs>
      <g>
        <path
          fill="#059cda"
          d="M2294.76,754.91c52.05,40.47,71.76,93.13,90.55,155.88,197.81,650.16-261.39,1391.76-935.7,1488.14-21.8,3.12-71.79-10.84-92.82-19.7,56.56,5.45,107.78-12.37,158.53-34.53,231.32-101.03,347.34-289.02,356.36-540.29,2.82-78.64-6.26-139.1-15.36-215-.17-1.41.2-2.97,0-4.36,10.57.02,20.27-4.54,29.8-8.35,160.58-63.98,349.04-190.78,416.22-356.05,43.56-107.16,57.02-244.62,35.39-358.23-7.47-39.21-20.03-73.69-42.99-106.46Z"
        />
        <path
          fill="#059cda"
          d="M148.33,759.27c-66.61,93.84-55.47,288.96-25.54,395.37,53.37,189.75,213.09,315.21,384.68,396.32,24.67,11.66,53.12,24.23,79.31,30.86l2.18,4.36c-1.66,6.59-5.46,14.39-6.37,20.9-21.41,152.78-12.4,330.19,53.98,471.49,64.34,136.89,285.66,307.41,441.01,301.8-49.61,22.02-102.1,12.47-153.1,1.5C286.1,2244.42-134.68,1528.46,62.69,901.61c14.68-46.61,31.08-89.68,64.6-126.3l21.04-16.04Z"
        />
        <path
          fill="#059cda"
          d="M290.12,514.91c5.34-52.72,39.4-94.96,73.04-133.12,426.06-483.19,1252.51-488.16,1697.43-27.57,43.5,45.03,89.12,97.14,98.92,160.69-42.11-71.19-117.1-125.07-189.73-162.59-204.09-105.44-387.41-82.71-583.93,24.6-47.65,26.06-104.22,61.67-145.71,96.44-4.4,3.69-8.87,8.24-12.06,13.03h-6.54c-2.89-30.53-68.56-56.62-104.89-79.45-149.66-94.07-319.77-154.18-497.17-109.29-97.33,24.63-290.5,119.22-329.37,217.1ZM547.52,233.44c1.45,1.35,8.65-1.02,8.67-3.26.06-6.51-12.83-.61-8.67,3.26Z"
        />
        <path
          fill="#0f537c"
          d="M1856.31,1584c-5.67-40.19-5.48-89.09-4.45-129.91,5.15-203.81,70.21-488.23,209.55-643.49,58.33-65,152.18-118.81,233.35-55.69,32.96,32.77,35.52,67.24,42.99,106.46,21.63,113.62,8.17,251.08-35.39,358.23-67.18,165.27-255.63,292.07-416.22,356.05-9.56,3.81-19.26,8.37-29.83,8.35Z"
        />
        <path
          fill="#0f537c"
          d="M588.96,1586.18c131.16,59.49,255.06,148.11,356.9,249.61,95.16,94.85,235.97,275.99,222.8,417.03-3,51.75-34.83,114.47-89.54,125.35-1.76.35-3.74-.05-4.36,2.18-.72.06-1.46-.03-2.18,0-155.36,5.62-376.67-164.91-441.01-301.8-66.41-141.3-75.38-318.71-53.98-471.49.91-6.51,4.71-14.31,6.37-20.9Z"
        />
        <path
          fill="#0f537c"
          d="M1221.55,486.55c-117.35,84.94-228.36,147.92-398.71,184.83-132.56,34.87-378.72,69.78-490.24-27.69-32.68-28.56-59.45-86.04-42.48-128.78,38.87-97.88,232.04-192.47,329.37-217.1,177.4-44.9,347.51,15.22,497.17,109.29,36.33,22.84,75,48.92,104.89,79.45Z"
        />
        <path
          fill="#02bdff"
          d="M1856.31,1588.36c.91,75.9,18.18,136.36,15.36,215-9.02,251.27-125.04,439.26-356.36,540.29-50.75,22.16-101.96,39.98-158.53,34.53-126.94-53.77-87.47-203.8-38.27-301.19,95.44-188.97,303.5-371.35,490.07-467.64,15.29-7.89,31.28-16.21,47.73-20.99Z"
        />
        <path
          fill="#02bdff"
          d="M148.33,759.27c1.09-1.54,1.16-4.77,2.73-5.94,51.61-33.19,101.95-35.59,156.6-6.16,144.17,77.63,232.06,337.61,261.03,489.46,21.52,112.79,30.38,230.97,18.09,345.18-26.19-6.63-54.64-19.2-79.31-30.86-171.59-81.11-331.31-206.57-384.68-396.32-29.93-106.41-41.07-301.52,25.54-395.37Z"
        />
        <path
          fill="#02bdff"
          d="M2159.52,514.91c18.04,116.94-78.85,167.98-178.4,184.77-146.36,24.67-319.01-11.4-457.43-60.36-103.63-36.66-207.05-87.74-295.53-152.77,3.19-4.79,7.66-9.34,12.06-13.03,41.49-34.77,98.06-70.38,145.71-96.44,196.52-107.47,379.84-130.2,583.93-24.76,72.63,37.52,147.62,91.41,189.73,162.59Z"
        />
        <path
          fill="#059cda"
          d="M1084.12,2378.18c-.68,2.09-2.49,2.04-4.36,2.18.63-2.23,2.6-1.83,4.36-2.18Z"
        />
        <path
          fill="#0f537c"
          d="M547.52,233.44c-4.16-3.87,8.74-9.77,8.67-3.26-.02,2.24-7.22,4.61-8.67,3.26Z"
        />
      </g>
    </svg>
  );
}

// Animated pulse ring component
function PulseRing({
  delay,
  duration,
  size,
}: {
  delay: number;
  duration: number;
  size: number;
}) {
  return (
    <div
      className="absolute rounded-full border border-cyan-400/30"
      style={{
        width: size,
        height: size,
        animation: `pulse-ring ${duration}s ease-out ${delay}s infinite`,
      }}
    />
  );
}

// Voice bar component for the equalizer effect
function VoiceBar({ delay, height }: { delay: number; height: number }) {
  return (
    <div
      className="w-1 rounded-full bg-gradient-to-t from-cyan-500 to-cyan-300"
      style={{
        height: `${height}px`,
        animation: `voice-bar 0.8s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}

export default function GaiaPage() {
  const [isActive, setIsActive] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-24 h-24 opacity-50">
          <GaiaLogo />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

      {/* Subtle radial glow behind logo */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(2, 189, 255, 0.3) 0%, rgba(2, 189, 255, 0.1) 30%, transparent 70%)",
          animation: isActive ? "glow-pulse 3s ease-in-out infinite" : "none",
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container with pulse rings */}
        <button
          onClick={() => setIsActive(!isActive)}
          className="relative flex items-center justify-center cursor-pointer group"
          aria-label={isActive ? "Pause animation" : "Start animation"}
        >
          {/* Pulse rings */}
          {isActive && (
            <>
              <PulseRing delay={0} duration={2.5} size={160} />
              <PulseRing delay={0.5} duration={2.5} size={200} />
              <PulseRing delay={1} duration={2.5} size={240} />
              <PulseRing delay={1.5} duration={2.5} size={280} />
            </>
          )}

          {/* Outer glow ring */}
          <div
            className={`absolute w-32 h-32 rounded-full transition-all duration-500 ${
              isActive
                ? "bg-gradient-to-r from-cyan-500/20 via-cyan-400/20 to-cyan-500/20"
                : "bg-zinc-800/50"
            }`}
            style={{
              animation: isActive ? "outer-glow 2s ease-in-out infinite" : "none",
              boxShadow: isActive
                ? "0 0 60px rgba(2, 189, 255, 0.3), inset 0 0 30px rgba(2, 189, 255, 0.1)"
                : "none",
            }}
          />

          {/* Inner circle background */}
          <div
            className={`absolute w-28 h-28 rounded-full transition-all duration-500 ${
              isActive
                ? "bg-gradient-to-br from-zinc-800 to-zinc-900"
                : "bg-zinc-900"
            }`}
            style={{
              boxShadow: isActive
                ? "inset 0 0 20px rgba(2, 189, 255, 0.2), 0 0 40px rgba(2, 189, 255, 0.2)"
                : "inset 0 0 20px rgba(0, 0, 0, 0.5)",
            }}
          />

          {/* GAIA Logo */}
          <div
            className="relative w-20 h-20 z-10 transition-transform duration-300 group-hover:scale-105"
            style={{
              filter: isActive
                ? "drop-shadow(0 0 20px rgba(2, 189, 255, 0.5))"
                : "drop-shadow(0 0 10px rgba(2, 189, 255, 0.2))",
              animation: isActive ? "logo-breathe 3s ease-in-out infinite" : "none",
            }}
          >
            <GaiaLogo className="w-full h-full" />
          </div>
        </button>

        {/* Voice bars / equalizer effect */}
        {isActive && (
          <div className="flex items-center gap-1 mt-8 h-8">
            <VoiceBar delay={0} height={12} />
            <VoiceBar delay={0.1} height={20} />
            <VoiceBar delay={0.2} height={28} />
            <VoiceBar delay={0.15} height={24} />
            <VoiceBar delay={0.25} height={32} />
            <VoiceBar delay={0.1} height={24} />
            <VoiceBar delay={0.2} height={28} />
            <VoiceBar delay={0.05} height={20} />
            <VoiceBar delay={0.15} height={12} />
          </div>
        )}

        {/* Text */}
        <div className="mt-8 text-center">
          <h1 className="text-3xl font-light text-white tracking-wide">
            <span className="font-semibold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              GAIA
            </span>
          </h1>
          <p className="mt-2 text-zinc-500 text-sm font-light tracking-wider">
            {isActive ? "Listening..." : "Click to activate"}
          </p>
        </div>

        {/* Subtle hint */}
        <p className="mt-12 text-zinc-600 text-xs tracking-wider uppercase">
          General-purpose AI Assistant
        </p>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes voice-bar {
          0% {
            transform: scaleY(0.3);
            opacity: 0.5;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes glow-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.35;
          }
        }

        @keyframes outer-glow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes logo-breathe {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }
      `}</style>
    </div>
  );
}
