import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

import LOGIN_GUEST from "../queries/login-guest.gql";
import LOGIN_CHECK from "../queries/login-check.gql";
import { Loader2Icon } from "lucide-react";
import { Alert } from "../components/Alert";

export const GlobalLayout = () => {
  const [user, setUser] = useState(null);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  const [loginGuest, { error: loginGuestError }] = useLazyQuery(LOGIN_GUEST);
  const [fetchUser, { data, loading }] = useLazyQuery(LOGIN_CHECK);

  const getGuestToken = useCallback(() => {
    loginGuest({
      variables: { networkDomain: import.meta.env.VITE_NETWORK_DOMAIN },
      onCompleted(data) {
        localStorage.setItem("token", data.tokens.accessToken);
        setHasToken(true);
        setCheckingLogin(false);
      },
    });
  }, [loginGuest]);

  const checkLogin = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      getGuestToken();
      return;
    }

    try {
      const response = await fetchUser();
      setUser(response.data.authMember);

      setHasToken(true);
      setCheckingLogin(false);
    } catch (error) {
      // TODO: Show login modal? we already know user used to be logged in
      console.error("Error checking login", error);
      setLoginPopup(true);
      getGuestToken();
    }
  }, [fetchUser, getGuestToken]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
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
          <Header user={user} setUser={setUser} shouldPopup={loginPopup} />
          <div className="custom-container-wrapper">
            <div className="custom-container mt-4 grid grid-cols-12 gap-6 lg:mt-8">
              <div className="col-span-3">
                <Sidebar />
              </div>
              <div className="col-span-9">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
