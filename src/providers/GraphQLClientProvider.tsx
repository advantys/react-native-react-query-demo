import { GraphQLClient } from 'graphql-request';
import React from 'react';
import { Client as WebSocketClient, createClient } from 'graphql-ws';

type Props = {
  children: React.ReactNode;
  defaultState?: GraphQLClientState;
};

export type GraphQLClientState = {
  graphQLClient: GraphQLClient;
  webSocketClient: WebSocketClient;
};

export type GraphQLClientProviderState = GraphQLClientState | null;

export const GraphQLClientContext =
  React.createContext<GraphQLClientProviderState>(null);

const initialState: GraphQLClientState = {
  graphQLClient: new GraphQLClient('http://localhost:8080/v1/graphql', {
    headers: {
      //authorization: '',
    },
  }),
  webSocketClient: createClient({
    url: 'ws://localhost:8080/v1/graphql',
  }),
};

export function GraphQLClientProvider({ children, defaultState }: Props) {
  return (
    <GraphQLClientContext.Provider value={defaultState || initialState}>
      {children}
    </GraphQLClientContext.Provider>
  );
}
