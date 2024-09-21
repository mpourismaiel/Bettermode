import { ApolloError } from "@apollo/client";
import { useQuery } from "@apollo/client/react/hooks";
import { createContext } from "react";

import GET_NETWORK from "../queries/get-network.gql";
import { Network as NetworkType } from "../types";

export const NetworkContext = createContext<{
  networkError?: ApolloError | null;
  networkLoading: boolean;
  network: NetworkType | null;
}>({
  networkError: null,
  networkLoading: false,
  network: null,
});

export const Network = ({ children }: { children: React.ReactNode }) => {
  const { data, loading, error } = useQuery(GET_NETWORK);

  return (
    <NetworkContext.Provider
      value={{
        networkError: error,
        networkLoading: loading,
        network: data?.network,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
