import React from 'react';
import SalesWalaApp from '@src/SalesWalaApp';
import {Provider} from 'react-redux';
import store from '@src/redux/store';

import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {SalesWalaThemeContext} from '@src/contexts/SalesWalaThemeContext';
import {salesWalaTheme} from '@src/theme/salesWalaTheme';
import {ToastProvider} from 'react-native-toast-notifications';
import {Appearance} from 'react-native';
import {realmConfig} from '@src/realm/realmConfig';
import {RealmProvider} from '@realm/react';
import {ApolloProvider} from '@apollo/client';
import apolloClient from './apollo';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

export function SalesWalaAppRoot(): Element {
  // const { RealmProvider } = createRealmContext(realmConfig);

  Appearance.setColorScheme('light');
  return (
    <SalesWalaThemeContext.Provider value={{ ...salesWalaTheme }}>
      <AutocompleteDropdownContextProvider>

      <ToastProvider>
        <Provider store={store}>
          <RealmProvider {...realmConfig}>
            <ApolloProvider client={apolloClient}>
              <SalesWalaApp />
            </ApolloProvider>
          </RealmProvider>
        </Provider>
        </ToastProvider>
        </AutocompleteDropdownContextProvider>
    </SalesWalaThemeContext.Provider>
  );
}
