import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { HeaderUser } from "./HeaderUser";

import viteLogo from "../assets/vite.svg";

export const Header = ({
  user,
  setUser,
  shouldPopup,
}: {
  user: any;
  setUser: (user: any) => void;
  shouldPopup?: boolean;
}) => {
  return (
    <header className="custom-container-wrapper bg-surface-1">
      <nav className="custom-container flex items-center justify-between py-4">
        <div className="logo">
          <h1 className="hidden" aria-label="Logo" aria-hidden hidden>
            Technical Challenge
          </h1>
          <Link to="/">
            <img src={viteLogo} alt="Technical Challenge" />
          </Link>
        </div>
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
        <HeaderUser user={user} setUser={setUser} shouldPopup={shouldPopup} />
      </nav>
    </header>
  );
};
