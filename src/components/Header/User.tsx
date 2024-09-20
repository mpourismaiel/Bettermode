import { LogOutIcon } from "lucide-react";
import { useContext } from "react";

import { GlobalContext } from "../../contexts/global";
import { Login } from "../Login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/Dropdown";

export const User = () => {
  const { user, shouldLoginPopup, logout } = useContext(GlobalContext);

  return (
    <div className="flex">
      {user && user.username !== "Guest" ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              className="h-10 w-10 rounded-full"
              src={user.profilePicture.urls.thumb}
              alt={user.displayName || user.name}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={logout}>
              <LogOutIcon className="h-4 w-4 me-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Login shouldPopup={shouldLoginPopup} />
      )}
    </div>
  );
};
