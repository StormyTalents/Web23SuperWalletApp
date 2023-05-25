/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import AppNavigator from 'navigation';
import {ContextProvider} from 'utils/context';

import './src/i18n';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ToastProvider>
      <ContextProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <AppNavigator />
      </ContextProvider>
    </ToastProvider>
  );
}

export default App;
