import { createContext } from "react";

export const GlobalContext = createContext<{
  user: any;
  setUser: (user: any) => void;
  shouldLoginPopup: boolean;
  networkError: any;
  networkLoading: boolean;
  network: any;
  logout: () => void;
}>({
  user: null,
  setUser: () => {},
  shouldLoginPopup: false,
  network: null,
  logout: () => {},
});
