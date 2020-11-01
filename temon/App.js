/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer, ThemeProvider, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from './Components/Home/Index';
import { createStackNavigator } from '@react-navigation/stack';
import ResultsScreen from './Components/Results/Index';
import MusicPlayerScreen from './Components/MusicPlayer/Index';
import ScreenPlaylists from './Components/Playlists/Index';
import ScreenLibrary from './Components/Library/Index';

const Stack = createStackNavigator();

// const theme = {
//   Button: {
//     color: '#4F831F',
//   },
// };

const themeNavigation = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
  Button: {
    color: '#4F831F',
  },
};

const App: () => React$Node = () => {
  return (
    // <ThemeProvider theme={theme}>
    <NavigationContainer theme={themeNavigation}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} unmountOnBlur={true}/>
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            title: 'RESULTADOS',
            headerStyle: {
              backgroundColor: '#a548d8',
              height: 100,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 45,
            },
          }}
        />

        <Stack.Screen
          name="Library"
          component={ScreenLibrary}
          options={{
            title: 'BIBLIOTECA',
            headerStyle: {
              backgroundColor: '#0B797E',
              height: 100,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 45,
            },
          }}
        />
        <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} options={{ headerShown: false }} unmountOnBlur={true}/>
        <Stack.Screen name="Playlists" component={ScreenPlaylists} options={{ headerShown: false }} unmountOnBlur={true}/>

      </Stack.Navigator>
    </NavigationContainer>
    // </ThemeProvider>
  );
};

export default App;
