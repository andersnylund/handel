import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import 'semantic-ui-css/semantic.min.css';

const API_URL = '/graphql';

const httpLink = new HttpLink({
  uri: API_URL,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.error(graphQLErrors);
    // do something with graphql error
  }
  if (networkError) {
    console.error(networkError);
    // do something with network error
  }
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const idToken = localStorage.getItem('id_token');
    // TODO use Auth.js
    if (idToken) {
      // eslint-disable-next-line no-param-reassign
      headers.authorization = idToken;
    }
    return { headers };
  });

  return forward(operation);
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
