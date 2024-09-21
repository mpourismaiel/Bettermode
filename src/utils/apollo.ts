import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "@apollo/client/link/http";

import { typePolicies } from "./apollo-type-policies";

const httpLink = createHttpLink({
  uri: "https://api.bettermode.com/",
});

const authLink = setContext((_, { headers }) => {
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("bettermode_access_token="))
    ?.split("=")[1];

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  ssrForceFetchDelay: 2000,
  cache: new InMemoryCache({
    typePolicies,
  }).restore(
    (window as unknown as { __APOLLO_STATE__: NormalizedCacheObject })
      .__APOLLO_STATE__,
  ),
});
