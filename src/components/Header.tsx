import { Loader2Icon, MenuIcon } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "./Button";
import { Drawer, DrawerContent, DrawerTrigger } from "./Drawer";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderUser } from "./HeaderUser";

import { NetworkContext } from "../contexts/network";
import { sidebarLinks } from "../utils/sidebar-links";

export const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);

  const { network, networkLoading } = useContext(NetworkContext);

  const closeNavigation = () => setNavigationOpen(false);

  return (
    <header className="custom-container-wrapper bg-surface-1">
      <nav className="custom-container flex items-center justify-between py-4">
        {networkLoading || !network ? (
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
        <div className="hidden lg:flex">
          <HeaderSearch />
        </div>
        <div className="flex gap-4">
          <HeaderUser />
          <Drawer open={navigationOpen} onOpenChange={setNavigationOpen}>
            <DrawerTrigger asChild>
              <Button size="icon" className="flex lg:hidden">
                <MenuIcon className="h-8 w-8" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="px-4 mt-4 mb-2">
                <HeaderSearch />
              </div>
              <div className="flex flex-col gap-2">
                {sidebarLinks.map(({ to, text, icon: Icon, target }) => (
                  <Link
                    key={to}
                    to={to}
                    target={target}
                    className="flex items-center gap-4 p-4 text-lg"
                    onClick={closeNavigation}
                  >
                    <Icon className="h-6 w-6" />
                    <span>{text}</span>
                  </Link>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};
