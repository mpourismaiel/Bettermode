import { useLazyQuery } from "@apollo/client/react/hooks";
import { Loader2Icon } from "lucide-react";
import { createContext } from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Alert } from "../components/ui/Alert";
import LOGIN_CHECK from "../queries/login-check.gql";
import LOGIN_GUEST from "../queries/login-guest.gql";
import { User } from "../types";
import { AuthContext } from "./auth";
import { NetworkProvider } from "./network";

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

export const GlobalProvider = () => {
  const { token } = useContext(AuthContext);

  const [user, setUser] = useState<User | null>(null);
  const [checkingLogin, setCheckingLogin] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  const [loginGuest, { error: loginGuestError }] = useLazyQuery(LOGIN_GUEST);
  const [fetchUser] = useLazyQuery(LOGIN_CHECK);

  const getGuestToken = useCallback(async () => {
    setCheckingLogin(true);
    const response = await loginGuest({
      variables: { networkDomain: import.meta.env.VITE_NETWORK_DOMAIN },
    });
    document.cookie = `bettermode_access_token=${response.data.tokens.accessToken}; path=/; max-age=3600; samesite=strict; secure`;

    setCheckingLogin(false);
  }, [loginGuest]);

  const checkLogin = useCallback(async () => {
    if (!token) {
      getGuestToken();
      return;
    }

    try {
      const response = await fetchUser();
      setUser(response.data.authMember);
    } catch (error) {
      // TODO: Show login modal? we already know user used to be logged in
      console.error("Error checking login", error);
      setLoginPopup(true);
      getGuestToken();
    }
  }, [fetchUser, getGuestToken, token]);

  const logout = useCallback(async () => {
    document.cookie = "bettermode_access_token=; path=/; max-age=0";
    setCheckingLogin(true);
    setUser(null);
    getGuestToken();
    const { client } = await import("../utils/apollo");
    client.resetStore();
  }, [getGuestToken]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        shouldLoginPopup: loginPopup,
        logout,
      }}
    >
      <div className="min-h-screen bg-surface-2 pb-12 text-foreground-1">
        {checkingLogin || loginGuestError ? (
          <div className="flex h-screen w-screen items-center justify-center">
            {checkingLogin ? (
              <Loader2Icon className="h-12 w-12 animate-spin" />
            ) : loginGuestError ? (
              <Alert>
                {loginGuestError
                  ? `Error: ${loginGuestError?.message || "Something went wrong!"}`
                  : `Something seriously went wrong! Please try again`}
              </Alert>
            ) : null}
          </div>
        ) : (
          <NetworkProvider>
            <Header />
            <div className="custom-container-wrapper">
              <div className="custom-container mt-4 grid grid-cols-12 gap-6 lg:mt-8">
                <div className="col-span-3 hidden lg:flex">
                  <Sidebar />
                </div>
                <div className="col-span-12 lg:col-span-9">
                  <Outlet />
                </div>
              </div>
            </div>
          </NetworkProvider>
        )}
      </div>
    </GlobalContext.Provider>
  );
};
