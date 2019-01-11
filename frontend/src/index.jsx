import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import 'semantic-ui-css/semantic.min.css';

const API_URL = 'http://localhost:8000/graphql';

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
  operation.setContext(
    ({ headers = {}, localToken = localStorage.getItem('token') }) => {
      if (localToken) {
        // eslint-disable-next-line no-param-reassign
        headers.authorization = `Bearer ${localToken}`;
      }
      return { headers };
    }
  );

  return forward(operation);
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
