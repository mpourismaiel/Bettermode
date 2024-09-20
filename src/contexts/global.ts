import { createContext } from "react";

export const GlobalContext = createContext<{
  user: any;
  setUser: (user: any) => void;
  shouldLoginPopup: boolean;
  logout: () => void;
}>({
  user: null,
  setUser: () => {},
  shouldLoginPopup: false,
  logout: () => {},
});
