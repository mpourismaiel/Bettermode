import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import LOGIN_GUEST from "../queries/login-guest.gql";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const GlobalLayout = () => {
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  const [loginGuest, { error: loginGuestError }] = useLazyQuery(LOGIN_GUEST);

  const checkLogin = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(true);
      setCheckingLogin(false);
      return;
    }

    loginGuest({
      variables: { networkDomain: import.meta.env.VITE_NETWORK_DOMAIN },
      onCompleted(data) {
        localStorage.setItem("token", data.tokens.accessToken);
        setHasToken(true);
        setCheckingLogin(false);
      },
    });
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="min-h-screen bg-surface-2 pb-12 text-foreground-1">
      {checkingLogin ? (
        <div>Loading...</div>
      ) : loginGuestError ? (
        <div>Error: {loginGuestError.message}</div>
      ) : !hasToken ? (
        <div>No token</div>
      ) : (
        <>
          <Header />
          <div className="custom-container-wrapper">
            <div className="custom-container mt-4 grid grid-cols-12 lg:mt-8">
              <Sidebar />
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
