import { ApolloProvider } from "@apollo/client";
import { Grommet } from "grommet";
import { Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import { AuthProvider } from "./context/AuthContext";
import client from "./graphql/apollo";
import GlobalStyle from "./styles/global";
import history from "./routes/history";
import Routes from "./routes";
import theme from "./styles/theme";

const App = () => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <GlobalStyle />
      <Grommet theme={theme}>
        <Router history={history}>
          <Routes />
        </Router>
      </Grommet>
    </AuthProvider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));