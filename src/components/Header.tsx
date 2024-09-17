import { Loader2Icon, SearchIcon } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { HeaderUser } from "./HeaderUser";

import { GlobalContext } from "../contexts/global";

export const Header = () => {
  const { network, networkLoading } = useContext(GlobalContext);

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
        <HeaderUser />
      </nav>
    </header>
  );
};
