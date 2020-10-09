/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from './Components/Home/Index';
import { createStackNavigator } from '@react-navigation/stack';
import ResultsScreen from './Components/Results/Index';
import MusicPlayerScreen from './Components/MusicPlayer/Index'; 

const Stack = createStackNavigator();

const theme = {
  Button: {
    color: '#4F831F',
  },
};

const App: () => React$Node = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
