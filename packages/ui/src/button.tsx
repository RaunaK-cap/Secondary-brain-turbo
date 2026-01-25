"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
  "aria-label"?: string;
}

export const Button = ({ children, className, variant = "default", size = "default", onClick, "aria-label": ariaLabel }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variantClasses = {
    default: "bg-gradient-to-r from-accent to-accent-alt text-accent-foreground hover:shadow-lg hover:shadow-accent/30",
    outline: "border border-border hover:bg-secondary hover:text-accent",
    ghost: "hover:bg-secondary hover:text-accent",
  };

  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ""}`.trim();

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
