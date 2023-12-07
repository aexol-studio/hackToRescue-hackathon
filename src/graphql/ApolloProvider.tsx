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
// import { REFRESH_TOKEN } from "@/graphql/requests/refreshToken";

const uri = process.env.NEXT_PUBLIC_API || "";
const httpLink = new HttpLink({ uri });

// const getAccessToken = () => window.localStorage.getItem('token');
// // const getRefreshToken = () => window.localStorage.getItem("refreshToken");

// const fakerAuthLink = setContext((_, { headers }) => {
//   const token = getAccessToken();
//   return {
//     headers: {
//       ...headers,
//       ...{
//         Authorization:
//           'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qYzNSalV4TnpCRlFqWkVOelpCT0RoRk5EUkVOalk1UVVGRU0wRXhOMFEzTkRnMk16azJOUSJ9.eyJodHRwczovL2dyYXBocWxlZGl0b3IuY29tL3BsYW4iOiJmcmVlIiwiaHR0cHM6Ly9ncmFwaHFsZWRpdG9yLmNvbS9jb3VudHJ5IjoiUEwiLCJuaWNrbmFtZSI6ImFkYW0ubWljaGFsb3dza2kiLCJuYW1lIjoiYWRhbS5taWNoYWxvd3NraUBhZXhvbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvZThjY2ViMzEyOWVkNjg3ZjhiZDdkMmEyOTNlNzcyMTM_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhZC5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMy0xMC0xOVQxMTo0NjozNC42MTlaIiwiZW1haWwiOiJhZGFtLm1pY2hhbG93c2tpQGFleG9sLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2F1dGguZ3JhcGhxbGVkaXRvci5jb20vIiwiYXVkIjoieUtPWmo2MU4yQmloMEFzT0luOHFwSTF0bTlkN1RCS00iLCJpYXQiOjE2OTc3OTExNjEsImV4cCI6MTY5NzgyNzE1Mywic3ViIjoiYXV0aDB8NjRjY2ZiNjhiMmE0NzgzNjIyNTA1M2I4Iiwic2lkIjoiUm1xMmQyUk5lZi1FbEhqRFFMYkczeHh2MGRLV3J2SW0iLCJub25jZSI6IllWZEdSa3RSU201Vk5FdHBTVFJ2ZUdOVVJEYzFiRGxGWkdwR1ZITnpWbkZrY0hGeFpIUjNhbkpEUnc9PSJ9.WkhssBQBm5hyZpSbWZry_e5vlNpFn3acEgX3ZXq4JkETbz3XsiCJdMxAec-4nc8j6_2TDGH7R6mGSQ-yFDoe6IBnS0hfomzr0xmdrdFpktAmLJzt376Gd24E_fFxm4UvOA-ZE0b0hVpaj1U77-M00i1lNN2YyAEBre9BbfsPzkQSaMq5QIdquejyzE5bK4p_mztsmkb1OsojmHA138MVnT_6TjWLBt4a3ZbaPHORkQGJ3sE2cS-SFRh6pE2NPPkbY8-PeyaIlX5VQaY05tkYwfK90DZsEOqE7SlyuQ4jlO3Z2mnIHI7f8-EMxhyLIWmNuoy34q47v7SNEGVfrWuMAQ',
//       },
//       'Content-type': 'application/json',
//     },
//   };
// });

const authLink = setContext((_, { headers }) => {
  //   const token = getAccessToken();
  return {
    headers: {
      ...headers,
      //   ...(token && { Authorization: token }),
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
