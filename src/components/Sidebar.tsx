import { BookAIcon, BookMarkedIcon, HomeIcon } from "lucide-react";

import { SidebarLink } from "./SidebarLink";

export const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-1">
      <SidebarLink to="/">
        <HomeIcon className="me-4 h-4 w-4" />
        Home
      </SidebarLink>
      <SidebarLink to="/docs">
        <BookMarkedIcon className="me-4 h-4 w-4" />
        Documentation
      </SidebarLink>
      <SidebarLink
        to="https://developers.bettermode.com/docs/guide/"
        target="_blank"
      >
        <BookAIcon className="me-4 h-4 w-4" />
        Api
      </SidebarLink>
    </aside>
  );
};
