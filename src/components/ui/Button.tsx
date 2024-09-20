import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "../../utils/string";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-surface-1 hover:bg-surface-3",
        primary: "bg-primary hover:bg-primary/50 text-foreground-1",
        secondary: "bg-secondary hover:bg-secondary/50 text-foreground-1",
      },
      size: {
        default: "rounded-lg px-4 py-2 text-lg",
        sm: "rounded-lg px-4 py-2 text-sm",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
