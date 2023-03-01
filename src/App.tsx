import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';
import {Auth0Provider} from 'react-native-auth0';
import {AUTH0_DOMAIN, AUTH0_CLIENT_ID} from '@env';

import {Navigator} from './Navigator';
import {client} from './lib/apollo';
import {store} from './redux/store';

export default () => (
  <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <StatusBar />
          <Navigator />
        </SafeAreaProvider>
      </ApolloProvider>
    </Provider>
  </Auth0Provider>
);
