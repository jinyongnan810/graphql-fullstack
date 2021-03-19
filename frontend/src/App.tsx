import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Public from "./components/Public";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const link = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });
  const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache({}),
  });
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Header
          setSignedIn={() => setSignedIn(true)}
          setSignedOut={() => setSignedIn(false)}
          setLoading={() => setLoading(false)}
        />
        <Switch>
          <Route path="/dashboard">
            {!signedIn && !loading && <Redirect to="/" />}
            <Dashboard />
          </Route>
          <Route path="/signup">
            {signedIn && !loading && <Redirect to="/dashboard" />}
            <Signup setSignedIn={setSignedIn} />
          </Route>
          <Route path="/signin">
            {signedIn && !loading && <Redirect to="/dashboard" />}
            <Signin setSignedIn={setSignedIn} />
          </Route>
          <Route path="/">
            <Public />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
