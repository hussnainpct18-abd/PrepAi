import React, { useEffect, useState } from "react";
import { Brain } from "lucide-react";

const loadingMessages = [
  "Warming up your interview coach...",
  "Analyzing your resume...",
  "Preparing tailored questions...",
  "Almost ready...",
];

const Loading = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0d0d0f] flex items-center justify-center overflow-hidden px-4">
      <style>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.15); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 30px) scale(1.1); }
        }
        @keyframes ringSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ringSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 24px #e0485a55; }
          50% { transform: scale(1.06); box-shadow: 0 0 40px #e0485a88; }
        }
        @keyframes fadeSwap {
          0% { opacity: 0; transform: translateY(6px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-6px); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes barSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .orb-1 {
          animation: floatOrb1 7s ease-in-out infinite;
        }
        .orb-2 {
          animation: floatOrb2 8s ease-in-out infinite;
        }
        .ring-outer {
          animation: ringSpin 3.2s linear infinite;
        }
        .ring-inner {
          animation: ringSpinReverse 2.4s linear infinite;
        }
        .logo-pulse {
          animation: logoPulse 2.2s ease-in-out infinite;
        }
        .msg-fade {
          animation: fadeSwap 1.8s ease-in-out infinite;
        }
        .dot {
          animation: dotBounce 1.4s ease-in-out infinite;
        }
        .bar-sweep {
          animation: barSweep 1.6s ease-in-out infinite;
        }
        .content-in {
          animation: fadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb-1 absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#e0485a] opacity-[0.12] blur-[100px]" />
        <div className="orb-2 absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#b83048] opacity-[0.1] blur-[110px]" />
      </div>

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#e2e2e8 1px, transparent 1px), linear-gradient(90deg, #e2e2e8 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="content-in relative z-10 flex flex-col items-center gap-8">
        {/* Orbiting ring loader with centered logo */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div
            className="ring-outer absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "#e0485a",
              borderRightColor: "#e0485a44",
            }}
          />
          <div
            className="ring-inner absolute inset-3 rounded-full border-2 border-transparent"
            style={{
              borderBottomColor: "#b83048",
              borderLeftColor: "#b8304844",
            }}
          />
          <div className="logo-pulse relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e0485a] to-[#b83048] flex items-center justify-center">
            <Brain className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-2xl font-bold font-['Sora',sans-serif] text-white tracking-tight">
            Prep<span className="text-[#e0485a]">AI</span>
          </h1>
        </div>

        {/* Progress bar */}
        <div className="w-56 h-1 rounded-full bg-[#1e1e2e] overflow-hidden relative">
          <div className="bar-sweep absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#e0485a] to-transparent" />
        </div>

        {/* Rotating message */}
        <div className="h-5 flex items-center justify-center">
          <p key={messageIndex} className="msg-fade text-sm text-[#7e7e94]">
            {loadingMessages[messageIndex]}
          </p>
        </div>

        {/* Bouncing dots */}
        <div className="flex gap-1.5">
          <span className="dot w-2 h-2 rounded-full bg-[#e0485a]" style={{ animationDelay: "0s" }} />
          <span className="dot w-2 h-2 rounded-full bg-[#e0485a]" style={{ animationDelay: "0.2s" }} />
          <span className="dot w-2 h-2 rounded-full bg-[#e0485a]" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
};

export default Loading;