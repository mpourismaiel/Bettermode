import { sidebarLinks } from "../../utils/sidebar-links";
import { SidebarLink } from "./SidebarLink";

export const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-1">
      {sidebarLinks.map(({ to, text, icon: Icon, target }) => (
        <SidebarLink key={to} to={to} target={target}>
          <Icon className="me-4 h-4 w-4" />
          {text}
        </SidebarLink>
      ))}
    </aside>
  );
};
