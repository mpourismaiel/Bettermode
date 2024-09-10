import { twMerge } from "tailwind-merge";

export const Placeholder = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge("animate-pulse rounded-md bg-surface-1/50", className)}
    />
  );
};
