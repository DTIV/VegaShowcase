import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

/* Import Websocketlink, split, httplink to connect to subscriptions
https://www.apollographql.com/docs/react/data/subscriptions/ */

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";


// SUBSCRIPTION CONNECTION
const httpLink = new HttpLink({
  uri: 'https://lb.testnet.vega.xyz/query'
});

const wsLink = new WebSocketLink({
  uri: 'wss://lb.testnet.vega.xyz/query',
  options: {
    reconnect: true
  }
});

// CONNECTION SLITTER
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// CREATE CLIENT
const client = new ApolloClient({
  // uri: 'https://lb.testnet.vega.xyz/query',
  link: splitLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
