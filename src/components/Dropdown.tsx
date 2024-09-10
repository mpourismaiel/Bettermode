// Courtesy of Shadcn: https://ui.shadcn.com/docs/components/dropdown-menu
import * as React from "react";
import * as DropdownMenuRadix from "@radix-ui/react-dropdown-menu";

import { cn } from "../utils/string";

export const DropdownMenu = DropdownMenuRadix.Root;
export const DropdownMenuTrigger = DropdownMenuRadix.Trigger;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuRadix.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuRadix.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuRadix.Portal>
    <DropdownMenuRadix.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border border-surface-3 bg-surface-1 p-1 text-foreground-1 shadow-xl",
        className,
      )}
      {...props}
    />
  </DropdownMenuRadix.Portal>
));

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuRadix.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuRadix.Item
    ref={ref}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded px-2 py-1.5 outline-none transition-colors hover:bg-surface-3 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuRadix.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuRadix.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuRadix.Label
    ref={ref}
    className={cn("px-2 py-1.5 font-semibold", inset && "pl-8", className)}
    {...props}
  />
));

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuRadix.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuRadix.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuRadix.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-surface-3", className)}
    {...props}
  />
));
