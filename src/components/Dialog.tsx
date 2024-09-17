// Courtesy of Shadcn: https://ui.shadcn.com/docs/components/dialog
import * as DialogRadix from "@radix-ui/react-dialog";
import { FullscreenIcon, XIcon } from "lucide-react";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";

import { cn } from "../utils/string";

export const Dialog = DialogRadix.Root;

export const DialogTrigger = DialogRadix.Trigger;

export const DialogPortal = DialogRadix.Portal;

export const DialogClose = DialogRadix.Close;

export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogRadix.Overlay>,
  ComponentPropsWithoutRef<typeof DialogRadix.Overlay>
>(({ className, ...props }, ref) => (
  <DialogRadix.Overlay
    ref={ref}
    className={cn(
      "bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogRadix.Overlay.displayName;

export const DialogContent = forwardRef<
  ElementRef<typeof DialogRadix.Content>,
  ComponentPropsWithoutRef<typeof DialogRadix.Content>
>(({ className, children, ...props }, ref) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogRadix.Content
        ref={ref}
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 flex translate-x-[-50%] translate-y-[-50%] flex-col gap-4 bg-surface-1 p-6 shadow-lg duration-200",
          {
            "max-w-screen min-h-screen w-screen": isFullscreen,
            "w-full max-w-lg border border-surface-3 sm:rounded-lg":
              !isFullscreen,
          },
          className,
        )}
        {...props}
      >
        {children}
        <button
          onClick={toggleFullscreen}
          className="absolute right-12 top-4 cursor-pointer rounded-sm text-foreground-2 opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none"
        >
          <FullscreenIcon className="h-4 w-4" />
          <span className="sr-only">Full screen</span>
        </button>
        <DialogRadix.Close className="absolute right-4 top-4 rounded-sm text-foreground-2 opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none">
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogRadix.Close>
      </DialogRadix.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogRadix.Content.displayName;

export const DialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center text-foreground-1 sm:text-left",
      className,
    )}
    {...props}
  />
);

export const DialogTitle = forwardRef<
  ElementRef<typeof DialogRadix.Title>,
  ComponentPropsWithoutRef<typeof DialogRadix.Title>
>(({ className, ...props }, ref) => (
  <DialogRadix.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));

export const DialogDescription = forwardRef<
  ElementRef<typeof DialogRadix.Description>,
  ComponentPropsWithoutRef<typeof DialogRadix.Description>
>(({ className, ...props }, ref) => (
  <DialogRadix.Description
    ref={ref}
    className={cn("text-sm text-foreground-2", className)}
    {...props}
  />
));
