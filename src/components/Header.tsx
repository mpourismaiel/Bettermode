import { SearchIcon } from "lucide-react";
import viteLogo from "../assets/vite.svg";

export const Header = () => {
  return (
    <header className="custom-container-wrapper bg-surface-1">
      <nav className="custom-container flex items-center justify-between py-4">
        <div className="logo">
          <h1 className="hidden" aria-label="Logo">
            Technical Challenge
          </h1>
          <img src={viteLogo} alt="Technical Challenge" />
        </div>
        <div className="search">
          <div className="bg-surface-3 flex items-center rounded-full">
            <label
              htmlFor="search"
              className="border-foreground-2/25 text-foreground-2 flex w-10 items-center justify-center border-r"
            >
              <SearchIcon className="h-4 w-4" />
            </label>
            <input
              type="text"
              id="search"
              className="text-foreground-1 w-80 bg-transparent px-4 py-2 outline-none focus:outline-none active:outline-none"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="user">
          <img src={viteLogo} alt="Technical Challenge" />
        </div>
      </nav>
    </header>
  );
};
