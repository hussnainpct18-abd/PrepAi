import React from "react";

const PageTransitionLoader = () => {
  return (
    <>
      <style>{`
        @keyframes barLoad {
          0% { width: 0%; opacity: 1; }
          60% { width: 70%; }
          85% { width: 88%; }
          100% { width: 92%; }
        }
        @keyframes barGlow {
          0%, 100% { box-shadow: 0 0 8px #e0485a99, 0 0 2px #e0485a; }
          50% { box-shadow: 0 0 16px #e0485acc, 0 0 4px #e0485a; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .top-bar {
          animation: barLoad 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards,
                     barGlow 1.4s ease-in-out infinite;
        }
        .spinner-fade {
          animation: fadeIn 0.25s ease both;
        }
        .spinner-ring {
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] bg-transparent">
        <div className="top-bar h-full bg-gradient-to-r from-[#e0485a] to-[#b83048] rounded-r-full" />
      </div>

      {/* Optional dim overlay with centered spinner */}
      <div className="spinner-fade fixed inset-0 z-[9998] bg-[#0d0d0f]/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
        <div className="relative w-9 h-9">
          <div
            className="spinner-ring absolute inset-0 rounded-full border-2 border-[#1e1e2e]"
            style={{ borderTopColor: "#e0485a" }}
          />
        </div>
      </div>
    </>
  );
};

export default PageTransitionLoader;