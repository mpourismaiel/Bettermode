import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react/context";
import React from "react";
import { StaticRouter } from "react-router-dom/server";

import { Root } from "./main";

import { AuthContext } from "./contexts/auth";

export function render({
  path,
  token,
  client,
}: {
  path: string;
  token: string;
  client: ApolloClient<InMemoryCache>;
}) {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={{ token }}>
          <StaticRouter location={path}>
            <Root />
          </StaticRouter>
        </AuthContext.Provider>
      </ApolloProvider>
    </React.StrictMode>
  );
}
