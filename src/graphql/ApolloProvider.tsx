"use client";

import React, { PropsWithChildren } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider as _ApolloProvider,
  from,
  Observable,
  FetchResult,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
const uri = process.env.NEXT_PUBLIC_API || "";
const httpLink = new HttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Content-type": "application/json",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  for (const err of graphQLErrors || []) {
    if (err.message.includes("You are not logged in") || err.message.includes("jwt expired")) {
      if (operation.query.loc?.source.body.includes("refreshToken")) return;
      // if (!getRefreshToken()) return;
      const observable = new Observable<FetchResult<Record<string, unknown>>>(observer => {
        (async () => {
          try {
            // await refreshToken();
            operation.setContext({
              ...operation.getContext(),
              headers: {
                ...operation.getContext().headers,
                // Authorization: getAccessToken(),
              },
            });
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            };
            forward(operation).subscribe(subscriber);
          } catch {
            observer.error(err);
          }
        })();
      });
      return observable;
    }
  }
  if (networkError) console.error(networkError);
});

export const client = new ApolloClient({
  credentials: "omit",
  uri,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: from([authLink, errorLink, httpLink]),
});

/*const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return;
  const { data, errors } = await client.query({
    query: REFRESH_TOKEN,
    variables: { refreshToken },
  });
  if ((errors || []).length > 0) return;
  window.localStorage.setItem("token", data.login.refreshToken);
  return data.login.refreshToken;
};*/

export const ApolloProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <_ApolloProvider client={client}>{children}</_ApolloProvider>;
};
