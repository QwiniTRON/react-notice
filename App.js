import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux'
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { INITApp } from './src/bootstrap'
import { Navigation } from './src/Navigation/AppNavigation'
import { store } from './src/store/store'

export default function App() {
  const [isINIT, setIsINIT] = useState(false)

  if (!isINIT) return <AppLoading
    onFinish={() => setIsINIT(true)}
    startAsync={INITApp}
    onError={err => console.log(err)} />

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ApplicationProvider>
  );
}

