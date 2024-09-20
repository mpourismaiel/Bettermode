import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "@apollo/client/link/http";

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

const mergeNodesAndPageInfo = (
  existing = { nodes: [] },
  incoming: { nodes: unknown[] },
) => {
  return {
    ...existing,
    ...incoming,
    nodes: [...existing.nodes, ...incoming.nodes],
  };
};

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  ssrForceFetchDelay: 2000,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // posts: {
          //   keyArgs: [
          //     "excludePins",
          //     "filterBy",
          //     "orderBy",
          //     "orderByString",
          //     "postTypeIds",
          //     "reverse",
          //     "spaceIds",
          //     "query",
          //   ],
          //   merge: mergeNodesAndPageInfo,
          // },
          // postReactionParticipants: {
          //   keyArgs: ["limit", "postId", "reaction", "reverse"],
          //   merge: mergeNodesAndPageInfo,
          // },
          // replies: {
          //   keyArgs: ["postId", "reverse", "orderBy", "limit"],
          //   merge: mergeNodesAndPageInfo,
          // },
        },
      },
    },
  }).restore(
    (window as unknown as { __APOLLO_STATE__: NormalizedCacheObject })
      .__APOLLO_STATE__,
  ),
});
