import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import List from './List';

const GenreListArtistsScreen = ({route, navigation}) => {
  const { genreListSongs } = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('MusicPlayer')}>
        <List navigation={navigation} listItems={genreListSongs}/>
      </TouchableOpacity>
    </View>
  );
}

export default GenreListArtistsScreen;
