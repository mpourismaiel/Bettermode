import { SearchIcon } from "lucide-react";

export const Search = () => {
  return (
    <div className="flex items-center rounded-full bg-surface-3">
      <label
        htmlFor="search"
        className="flex w-16 lg:w-10 items-center justify-center border-r border-foreground-2/25 text-foreground-2"
      >
        <SearchIcon className="w-6 h-6 lg:h-4 lg:w-4" />
      </label>
      <input
        type="text"
        id="search"
        className="w-full lg:w-80 bg-transparent px-4 py-4 lg:py-2 text-foreground-1 outline-none focus:outline-none active:outline-none"
        placeholder="Search..."
      />
    </div>
  );
};
