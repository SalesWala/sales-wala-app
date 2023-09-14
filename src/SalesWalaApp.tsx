import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from '@src/routes/AuthRoutes';
import NonAuthRoutes from '@src/routes/NonAuthRoutes';
import LogoSpinner from '@src/components/LogoSpinner/LogoSpinner';
import {View} from 'moti';
import {useSalesWalaUser} from './hooks/user/userHooks';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function LoadingComponent(): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <LogoSpinner />
    </View>
  );
}

function SalesWalaApp(): JSX.Element {
  const {user, isLoading} = useSalesWalaUser();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <NavigationContainer>
          {user ? <AuthRoutes /> : <NonAuthRoutes />}
        </NavigationContainer>
      )}
    </GestureHandlerRootView>
  );
}

export default SalesWalaApp;
