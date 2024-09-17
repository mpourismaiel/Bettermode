import { Loader2Icon } from "lucide-react";
import { useContext } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./Dropdown";
import { Login } from "./Login";

import { GlobalContext } from "../contexts/global";

export const HeaderUser = () => {
  const { user, shouldLoginPopup } = useContext(GlobalContext);
  return (
    <div className="flex">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              className="h-10 w-10 rounded-full"
              src={user.profilePicture.urls.thumb}
              alt={user.displayName || user.name}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end"></DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Login shouldPopup={shouldLoginPopup} />
      )}
    </div>
  );
};
