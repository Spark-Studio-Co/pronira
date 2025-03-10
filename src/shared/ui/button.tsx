"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/utils";

export const buttonVariants = {
  primary:
    "bg-main text-white rounded-full w-full py-4 flex  items-center justify-center  gap-2 font-bold",
  secondary: "bg-secondary text-white py-4 font-bold rounded-full",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  text: string;
  isLamp?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      disabled,
      text,
      isLamp,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          buttonVariants[variant],
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {text}
        {/* {isLamp && <img src={lamp} alt="Lamp" />} */}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
