import { cn } from "../../utils/string";

export const Placeholder = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surface-1/50", className)}
    />
  );
};
