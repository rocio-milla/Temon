import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from "react";
import { View } from 'react-native';
import ResultList from '../Results/ResultList';

const ScreenPlayListSelected = ({ route }) => {

  const navigation = useNavigation()
  const { title, colour, songs } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: colour,
        height: 100,
      },
    })
  }, []);

  return (
    <>
      <View>
        <ResultList navigation={navigation} results={songs} />
      </View>
    </>
  );
}
export default ScreenPlayListSelected;