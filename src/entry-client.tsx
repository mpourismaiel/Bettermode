import { ApolloProvider } from "@apollo/client/react/context";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "./components/ui/Sonner";
import { AuthContext } from "./contexts/auth";
import { Root } from "./main";
import { client } from "./utils/apollo";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{
          token:
            window.document.cookie
              .split(";")
              .find(c => c.includes("bettermode_access_token"))
              ?.split("=")[1] || "",
        }}
      >
        <BrowserRouter>
          <Root />
        </BrowserRouter>
        <Toaster />
      </AuthContext.Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
