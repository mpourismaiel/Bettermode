import { useLazyQuery } from "@apollo/client";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Alert } from "../components/Alert";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

import GET_NETWORK from "../queries/get-network.gql";
import LOGIN_CHECK from "../queries/login-check.gql";
import LOGIN_GUEST from "../queries/login-guest.gql";

import { GlobalContext } from "../contexts/global";

export const GlobalLayout = () => {
  const [user, setUser] = useState(null);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  const [loginGuest, { error: loginGuestError }] = useLazyQuery(LOGIN_GUEST);
  const [fetchUser] = useLazyQuery(LOGIN_CHECK);
  const [
    fetchNetwork,
    { data: networkData, loading: networkLoading, error: networkError },
  ] = useLazyQuery(GET_NETWORK);

  const getNetwork = useCallback(async () => {
    fetchNetwork();
  }, [fetchNetwork]);

  const getGuestToken = useCallback(async () => {
    const response = await loginGuest({
      variables: { networkDomain: import.meta.env.VITE_NETWORK_DOMAIN },
    });
    localStorage.setItem("token", response.data.tokens.accessToken);
    getNetwork();
    setHasToken(true);
    setCheckingLogin(false);
  }, [loginGuest, getNetwork]);

  const checkLogin = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      getGuestToken();
      return;
    }

    try {
      const response = await fetchUser();
      setUser(response.data.authMember);
      getNetwork();

      setHasToken(true);
      setCheckingLogin(false);
    } catch (error) {
      // TODO: Show login modal? we already know user used to be logged in
      console.error("Error checking login", error);
      setLoginPopup(true);
      getGuestToken();
    }
  }, [fetchUser, getGuestToken, getNetwork]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setHasToken(false);
    setCheckingLogin(true);
    setLoginPopup(false);
    setUser(null);
    getGuestToken();
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
        networkLoading,
        networkError,
        network: networkData?.network,
        logout,
      }}
    >
      <div className="min-h-screen bg-surface-2 pb-12 text-foreground-1">
        {checkingLogin || loginGuestError || !hasToken ? (
          <div className="flex h-screen w-screen items-center justify-center">
            {checkingLogin ? (
              <Loader2Icon className="h-12 w-12 animate-spin" />
            ) : loginGuestError || !hasToken ? (
              <Alert>
                {loginGuestError
                  ? `Error: ${loginGuestError?.message || "Something went wrong!"}`
                  : `Something seriously went wrong! Please try again`}
              </Alert>
            ) : null}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </GlobalContext.Provider>
  );
};
