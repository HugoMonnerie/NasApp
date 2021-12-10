/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import {AppTabNavigator} from "./src/components/navigators/AppTabNavigator";
import { Provider } from "react-redux"
import { store , persistor} from "./src/redux/store";
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  //                 <NavigationContainer>
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AppTabNavigator/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
