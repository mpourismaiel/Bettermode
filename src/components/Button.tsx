import { forwardRef } from "react";

import { cn } from "../utils/string";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-surface-1 hover:bg-surface-3",
      },
      toggle: {
        active: "bg-surface-3 hover:bg-surface-3",
        inactive: "bg-surface-1 hover:bg-surface-3",
      },
      size: {
        default: "rounded-lg px-4 py-2 text-lg",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      toggle: "active",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, toggle, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, toggle, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
