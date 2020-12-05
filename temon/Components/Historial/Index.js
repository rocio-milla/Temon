import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import HistorialList from '../Historial/HistorialList';

const HistorialScreen = ({route, navigation}) => {
  const { results} = route.params;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('MusicPlayer')}>
        <HistorialList navigation={navigation} results={results}/>
      </TouchableOpacity>
    </View>
  );
}

export default HistorialScreen;