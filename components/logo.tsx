"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showName = true,
}: {
  className?: string;
  iconClassName?: string;
  showName?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5 select-none outline-none", className)}
    >
      {/* Prism mark — uses currentColor, auto-adapts to dark/light */}
      <div className="relative h-[30px] w-[30px] shrink-0 transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          {/* Triangle fill */}
          <path
            d="M16 3L30 27H2L16 3Z"
            fill="currentColor"
            fillOpacity="0.07"
          />
          {/* Triangle stroke */}
          <path
            d="M16 3L30 27H2L16 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Left refracted ray */}
          <line
            x1="2" y1="27" x2="0" y2="32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          {/* Right refracted ray */}
          <line
            x1="30" y1="27" x2="33" y2="30"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          {/* Core dot */}
          <circle cx="16" cy="18" r="2" fill="currentColor" />
        </svg>
      </div>

      {showName && (
        <span className="flex items-baseline gap-[2px] leading-none">
          <span
            className="text-[1.2rem] font-extrabold tracking-[-0.05em] text-foreground"
            style={{ fontFamily: "'Georgia', 'Palatino', serif" }}
          >
            NovaUI
          </span>
          {/* Blinking dot */}
          <span
            className="inline-block w-[5px] h-[5px] rounded-full mb-[6px] bg-foreground"
            style={{ animation: "prism-blink 2.2s ease-in-out infinite" }}
          />
        </span>
      )}

      <style>{`
        @keyframes prism-blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.2; transform: scale(0.5); }
        }
      `}</style>
    </Link>
  );
}