import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from "react";
import { View } from 'react-native';
import ResultList from '../Results/ResultList';

const ScreenFavorites = ({ route }) => {

  const navigation = useNavigation()
  const {results } = route.params;

  return (
    <>
      <View>
        <ResultList navigation={navigation} results={results} />
      </View>
    </>
  );
}
export default ScreenFavorites ;