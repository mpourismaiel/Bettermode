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

export const typePolicies = {
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
};
