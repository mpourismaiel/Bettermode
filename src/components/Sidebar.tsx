import { BookAIcon, BookMarkedIcon, HomeIcon } from "lucide-react";

import { SidebarLink } from "./SidebarLink";

export const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-4">
      <SidebarLink to="/">
        <HomeIcon className="me-4 h-6 w-6" />
        Home
      </SidebarLink>
      <SidebarLink to="/docs">
        <BookMarkedIcon className="me-4 h-6 w-6" />
        Documentation
      </SidebarLink>
      <SidebarLink
        to="https://developers.bettermode.com/docs/guide/"
        target="_blank"
      >
        <BookAIcon className="me-4 h-6 w-6" />
        Api
      </SidebarLink>
    </aside>
  );
};
