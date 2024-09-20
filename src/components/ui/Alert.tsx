import { cn } from "../../utils/string";

export const Alert = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded border border-red-800 bg-red-300 p-4 text-red-800",
        className,
      )}
    >
      {children}
    </div>
  );
};
