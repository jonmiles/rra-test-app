import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {API_URL} from '@env';

import {auth0} from './auth0';

const cache = new InMemoryCache({
  typePolicies: {
    Todo: {
      keyFields: ['id'],
    },
    Todos: {
      keyFields: ['id'],
      merge: false,
    },
    Query: {
      fields: {
        todos: {
          keyArgs: ['id'],
          merge: false,
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext(async (_, {headers}) => {
  let token: string | undefined;

  try {
    const credentials = await auth0.credentialsManager.getCredentials();

    // TODO
    // Not sure why accessToken payload is empty
    // You should not use the idToken for API access BUT solely for the
    // purpose of completing this task I'm using the idToken instead
    // const token = credentials.accessToken;
    token = credentials.idToken;
  } catch (e) {
    console.error('e = ', e);
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  cache: cache,
  link: authLink.concat(httpLink),
  name: 'rra_test-app',
  version: '0.1',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
