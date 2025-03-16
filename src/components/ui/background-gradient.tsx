"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, Variants } from "framer-motion";

type BackgroundGradientProps = {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
};

export function BackgroundGradient({
  children,
  className,
  containerClassName,
  animate = true,
}: BackgroundGradientProps) {
  const variants: Variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  const animationProps = animate
    ? {
        variants,
        initial: "initial",
        animate: "animate",
        transition: {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        },
        style: {
          backgroundSize: "400% 400%",
        },
      }
    : {};

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        {...animationProps}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-30 group-hover:opacity-50 blur-xl transition duration-500",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#f472b6,transparent),radial-gradient(circle_farthest-side_at_100%_0,#9333ea,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#7c3aed,transparent),radial-gradient(circle_farthest-side_at_0_0,#c026d3,#18181b)]"
        )}
      />
      <motion.div
        {...animationProps}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-90",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#f472b6,transparent),radial-gradient(circle_farthest-side_at_100%_0,#9333ea,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#7c3aed,transparent),radial-gradient(circle_farthest-side_at_0_0,#c026d3,#18181b)]"
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
