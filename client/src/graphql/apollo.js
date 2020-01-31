import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";

import typePolicies from "./typePolicies";

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies
  }),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(
          ({ extensions: { serviceName }, message, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Service: ${serviceName}, Path: ${path[0]}`
            )
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    createPersistedQueryLink(),
    createUploadLink({
      credentials:
        process.env.REACT_APP_ENV === "production" ? "same-origin" : "include",
      uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
    })
  ])
});

export default client;
