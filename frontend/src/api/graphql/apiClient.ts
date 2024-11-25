import { ApolloClient, InMemoryCache } from "@apollo/client";

const ApolloGraphQLClient = new ApolloClient({
  uri: "https://graphql.country/graphql",
  cache: new InMemoryCache(),
});

export default ApolloGraphQLClient;
