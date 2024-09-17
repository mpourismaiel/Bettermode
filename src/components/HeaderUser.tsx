import { Loader2Icon } from "lucide-react";

import { Login } from "./Login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./Dropdown";

export const HeaderUser = ({
  user,
  setUser,
  shouldPopup,
}: {
  user: any;
  setUser: (user: any) => void;
  shouldPopup?: boolean;
}) => {
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
        <Login setUser={setUser} shouldPopup={shouldPopup} />
      )}
    </div>
  );
};
