import { createContext } from "react";

import { User } from "../types";

export const GlobalContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  shouldLoginPopup: boolean;
  logout: () => void;
}>({
  user: null,
  setUser: () => {},
  shouldLoginPopup: false,
  logout: () => {},
});
