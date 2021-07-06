import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import client from './graphql/client';
import AuthProvider from './auth';


ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

