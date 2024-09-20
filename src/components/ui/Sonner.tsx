import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface-3 group-[.toaster]:text-foreground-1 group-[.toaster]:border-surface-2 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-surface-2 group-[.toast]:text-foreground-1",
          cancelButton:
            "group-[.toast]:bg-surface-1 group-[.toast]:text-foreground-2",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
