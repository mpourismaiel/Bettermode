import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { LOGIN_GUEST } from "../queries/login";

export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const [hasToken, setHasToken] = useState(false);

  const [loginGuest, { loading: loginGuestLoading, error: loginGuestError }] =
    useLazyQuery(LOGIN_GUEST);

  const checkLogin = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(true);
      return;
    }

    loginGuest({
      variables: { networkDomain: import.meta.env.VITE_NETWORK_DOMAIN },
      onCompleted(data) {
        localStorage.setItem("token", data.tokens.accessToken);
        setHasToken(true);
      },
    });
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  if (loginGuestLoading) {
    return <div>Loading...</div>;
  }

  if (loginGuestError) {
    return <div>Error: {loginGuestError.message}</div>;
  }

  if (!hasToken) {
    return <div>No token</div>;
  }

  return children;
};
