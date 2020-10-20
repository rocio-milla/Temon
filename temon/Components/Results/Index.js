import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import ResultList from '../Results/ResultList';

const ResultsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('MusicPlayer')}>
        <ResultList navigation={navigation}/>
      </TouchableOpacity>
    </View>
  );
}

export default ResultsScreen;
