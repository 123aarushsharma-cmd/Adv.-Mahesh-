import React from "react";

interface LawLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function LawLogo({ className = "", iconOnly = false, size = "md" }: LawLogoProps) {
  const sizeMap = {
    sm: {
      svg: "h-8 w-8",
      title: "text-xs tracking-[0.15em]",
      subtitle: "text-[7px] tracking-[0.2em]",
      container: "space-x-2"
    },
    md: {
      svg: "h-12 w-12",
      title: "text-sm sm:text-base tracking-[0.2em]",
      subtitle: "text-[9px] tracking-[0.25em]",
      container: "space-x-3"
    },
    lg: {
      svg: "h-20 w-20",
      title: "text-lg sm:text-2xl tracking-[0.25em]",
      subtitle: "text-xs tracking-[0.3em]",
      container: "space-x-4"
    }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center ${currentSize.container} ${className}`}>
      {/* Premium SVG Vector Emblem */}
      <svg
        className={`${currentSize.svg} text-[#D4AF37] transition-all duration-300 transform hover:scale-105`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Hexagonal Shield with Double Rim */}
        <polygon
          points="50,5 90,28 90,72 50,95 10,72 10,28"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          className="animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <polygon
          points="50,9 86,30 86,70 50,91 14,70 14,30"
          stroke="url(#goldGradient)"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* Central Roman Pillar of Justice */}
        <path
          d="M47 38H53V72H47V38Z"
          fill="url(#goldGradient)"
          opacity="0.8"
        />
        <path
          d="M44 35H56V38H44V35Z"
          fill="url(#goldGradient)"
        />
        <path
          d="M42 72H58V75H42V72Z"
          fill="url(#goldGradient)"
        />
        <path
          d="M38 75H62V78H38V75Z"
          fill="url(#goldGradient)"
        />

        {/* Delicate Balancing Scales */}
        {/* Crossbeam */}
        <path
          d="M28 42H72V44H28V42Z"
          fill="url(#goldGradient)"
        />
        {/* Center Pivot Point */}
        <circle cx="50" cy="43" r="2.5" fill="url(#goldGradient)" />

        {/* Left Hanging Pan */}
        <line x1="33" y1="43" x2="25" y2="58" stroke="url(#goldGradient)" strokeWidth="0.75" />
        <line x1="33" y1="43" x2="41" y2="58" stroke="url(#goldGradient)" strokeWidth="0.75" />
        <path d="M22 58H44C44 63 22 63 22 58Z" fill="url(#goldGradient)" opacity="0.9" />

        {/* Right Hanging Pan */}
        <line x1="67" y1="43" x2="59" y2="58" stroke="url(#goldGradient)" strokeWidth="0.75" />
        <line x1="67" y1="43" x2="75" y2="58" stroke="url(#goldGradient)" strokeWidth="0.75" />
        <path d="M56 58H78C78 63 56 63 56 58Z" fill="url(#goldGradient)" opacity="0.9" />

        {/* Traditional Laurel Wreath Accents inside shield */}
        <path
          d="M18 60C18 67 24 74 32 76"
          stroke="url(#goldGradient)"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M82 60C82 67 76 74 68 76"
          stroke="url(#goldGradient)"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Definitions for gorgeous metallic gold color gradients */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="30%" stopColor="#FFF3B0" />
            <stop offset="70%" stopColor="#C8A23B" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>

      {!iconOnly && (
        <div className="flex flex-col text-left">
          <span className={`block font-serif font-bold text-white uppercase leading-none group-hover:text-[#D4AF37] transition-colors ${currentSize.title}`}>
            M. K. Sharma
          </span>
          <span className={`block font-mono text-[#A5A5A5] uppercase mt-1 ${currentSize.subtitle}`}>
            Law Chambers & Associates
          </span>
        </div>
      )}
    </div>
  );
}
