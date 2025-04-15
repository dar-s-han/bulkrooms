import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#000000",
      shimmerSize = "0.05em",
      shimmerDuration = "5s",
      borderRadius = "10px",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--spread": "180deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex items-center justify-center overflow-hidden whitespace-nowrap px-4 py-2 text-white font-semibold text-base",
          "transform-gpu transition-transform duration-100 ease-in-out",
          "bg-gradient-to-r from-[#1f1c2c]/70 to-[#928dab]/70",
          "rounded-full border-none shadow-none",
          className,
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 text-white/90">{children}</span>
        <div 
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            animation: `shimmer ${shimmerDuration} infinite`,
          } as CSSProperties}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              transform: "translateX(-100%)",
              animation: `shimmer ${shimmerDuration} infinite`,
              animationName: "shimmer",
              animationDuration: shimmerDuration,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            } as CSSProperties}
          />
        </div>
        <style>
          {`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}
        </style>
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton }; 