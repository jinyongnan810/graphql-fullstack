import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import Test from "./components/Test";

const App = () => {
  const apolloClient = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache({}),
  });
  return (
    <ApolloProvider client={apolloClient}>
      <div>Hello GraphQL</div>
      <Test />
    </ApolloProvider>
  );
};

export default App;
