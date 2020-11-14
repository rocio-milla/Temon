import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import ResultList from '../Results/ResultList';

const ScreenPlayListSelected = ({ route }) => {

  const navigation = useNavigation()
  const { title, colour, songs } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: title, headerStyle: {
        backgroundColor: colour,
        height: 100,
      },
    })
  }, []);

  return (
    <>
      <View>
        {/* <FlatList
          data={songs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.cancionView}>
              <Text style={styles.cancionName}>{item.title.substr(0, 18)}...</Text>
              <Text style={styles.divider}></Text>
            </View>
          )}
        /> */}
        <ResultList navigation={navigation} results={songs} />
      </View>
    </>
  );
}
export default ScreenPlayListSelected;

const styles = StyleSheet.create({
  cancionView: {
    backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 8,
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20
  },
  cancionName: {
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 8
  },
  divider: {
    backgroundColor: "#4f831f",
    marginLeft: 20,
    marginRight: 20,
    height: 12,
    width: 340
  },
});