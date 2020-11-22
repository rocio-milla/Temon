import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import List from './List';

const GenreListScreen = ({route, navigation}) => {
  const { genreResults } = route.params;
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('MusicPlayer')}>
        <List navigation={navigation} listItems={genreResults}/>
      </TouchableOpacity>
    </View>
  );
}

export default GenreListScreen;
