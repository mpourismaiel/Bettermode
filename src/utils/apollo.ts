import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.bettermode.com/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const mergeNodesAndPageInfo = (existing = { nodes: [] }, incoming) => {
  return {
    ...existing,
    ...incoming,
    nodes: [...existing.nodes, ...incoming.nodes],
  };
};

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: [
              "excludePins",
              "filterBy",
              "orderBy",
              "orderByString",
              "postTypeIds",
              "reverse",
              "spaceIds",
              "query",
            ],
            merge: mergeNodesAndPageInfo,
          },
          postReactionParticipants: {
            keyArgs: ["limit", "postId", "reaction", "reverse"],
            merge: mergeNodesAndPageInfo,
          },
          replies: {
            keyArgs: ["postId", "reverse", "orderBy", "limit"],
            merge: mergeNodesAndPageInfo,
          },
        },
      },
    },
  }),
});
