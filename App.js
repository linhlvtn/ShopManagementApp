import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
};

export default App;