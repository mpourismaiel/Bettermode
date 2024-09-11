import { NavLink, NavLinkProps } from "react-router-dom";
import { cn } from "../utils/string";

export const SidebarLink = ({ className, ...props }: NavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "flex items-center rounded bg-surface-1 px-4 py-4 text-lg font-bold",
          {
            "bg-surface-3": isActive,
          },
          className,
        )
      }
      {...props}
    />
  );
};
