import { Loader2Icon, MenuIcon, SearchIcon } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "./Button";
import { Drawer, DrawerContent, DrawerTrigger } from "./Drawer";
import { HeaderUser } from "./HeaderUser";

import { GlobalContext } from "../contexts/global";
import { sidebarLinks } from "../utils/sidebar-links";

export const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);

  const { network, networkLoading } = useContext(GlobalContext);

  const closeNavigation = () => setNavigationOpen(false);

  return (
    <header className="custom-container-wrapper bg-surface-1">
      <nav className="custom-container flex items-center justify-between py-4">
        {networkLoading ? (
          <Loader2Icon className="animate-spin h-10 w-10" />
        ) : (
          <div>
            <h1 className="sr-only">{network.name}</h1>
            <Link to="/">
              <img
                src={network.images.darkLogo.url}
                alt={network.name}
                className="h-10"
              />
            </Link>
          </div>
        )}
        <div className="search">
          <div className="flex items-center rounded-full bg-surface-3">
            <label
              htmlFor="search"
              className="flex w-10 items-center justify-center border-r border-foreground-2/25 text-foreground-2"
            >
              <SearchIcon className="h-4 w-4" />
            </label>
            <input
              type="text"
              id="search"
              className="w-80 bg-transparent px-4 py-2 text-foreground-1 outline-none focus:outline-none active:outline-none"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex gap-4">
          <HeaderUser />
          <Drawer open={navigationOpen} onOpenChange={setNavigationOpen}>
            <DrawerTrigger asChild>
              <Button size="icon" className="flex lg:hidden">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              {sidebarLinks.map(({ to, text, icon: Icon, target }) => (
                <Link
                  key={to}
                  to={to}
                  target={target}
                  className="flex items-center gap-4 p-4 text-lg"
                  onClick={closeNavigation}
                >
                  <Icon className="h-4 w-4" />
                  <span>{text}</span>
                </Link>
              ))}
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};
