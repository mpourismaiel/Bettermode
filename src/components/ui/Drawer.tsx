// Courtesy of Shadcn: https://ui.shadcn.com/docs/components/drawer
import * as React from "react";
import { Drawer as DrawerVaul } from "vaul";

import { cn } from "../../utils/string";

export const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerVaul.Root>) => (
  <DrawerVaul.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);

export const DrawerTrigger = DrawerVaul.Trigger;

export const DrawerPortal = DrawerVaul.Portal;

export const DrawerClose = DrawerVaul.Close;

export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerVaul.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerVaul.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerVaul.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerVaul.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerVaul.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerVaul.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] shadow-xl bg-surface-1 text-foreground-1",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-surface-3" />
      {children}
    </DrawerVaul.Content>
  </DrawerPortal>
));

export const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerVaul.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerVaul.Title>
>(({ className, ...props }, ref) => (
  <DrawerVaul.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerVaul.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerVaul.Description>
>(({ className, ...props }, ref) => (
  <DrawerVaul.Description
    ref={ref}
    className={cn("text-sm text-foreground-2", className)}
    {...props}
  />
));
