import { NavLink, NavLinkProps } from "react-router-dom";

import { cn } from "../utils/string";

export const SidebarLink = ({ className, ...props }: NavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "flex items-center rounded bg-transparent px-4 py-2 text-lg font-thin transition-colors duration-200 ease-out hover:bg-surface-3",
          {
            "bg-surface-3 font-normal": isActive,
          },
          className,
        )
      }
      {...props}
    />
  );
};
