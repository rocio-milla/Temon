/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import GenreListScreen from './Components/GenreList/GenreList';
import GenreListArtistsScreen from './Components/GenreList/GenreListArtists';
import HomeScreen from './Components/Home/Index';
import ScreenLibrary from './Components/Library/Index';
import MusicPlayerScreen from './Components/MusicPlayer/Index';
import ScreenPlaylists from './Components/Playlists/Index';
import ScreenPlayListSelected from './Components/PlayListSelected/Index';
import ResultsScreen from './Components/Results/Index';
import HistorialScreen from './Components/Historial/Index';

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

const App = () => {
  return (
    // <ThemeProvider theme={theme}>
    <NavigationContainer theme={themeNavigation}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} unmountOnBlur={true} />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          unmountOnBlur={true}
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
          name="Historial"
          component={HistorialScreen}
          unmountOnBlur={true}
          options={{
            title: 'HISTORIAL',
            headerStyle: {
              backgroundColor: '#D12734',
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
        <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} options={{ headerShown: false }} unmountOnBlur={true} />
        <Stack.Screen name="HistorialMusicPlayer" component={MusicPlayerScreen} options={{ headerShown: false }} unmountOnBlur={true} />
        <Stack.Screen name="Playlists" component={ScreenPlaylists}
          unmountOnBlur={true}
          options={{
            title: 'PLAYLIST',
            headerStyle: {
              backgroundColor: '#0B797E',
              height: 100,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 45,
            },
          }} />
        <Stack.Screen
          name="PlayListSelected"
          component={ScreenPlayListSelected}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: 'white',
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
          name="GenreList"
          component={GenreListScreen}
          options={{
            title: 'GÉNEROS',
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
          name="GenreListSongs"
          component={GenreListArtistsScreen}
          options={{
            title: 'ARTISTAS',
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
      </Stack.Navigator>
    </NavigationContainer>
    // </ThemeProvider>
  );
};

export default App;
