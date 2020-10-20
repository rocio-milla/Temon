import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {size} from 'lodash';
import {Divider} from 'react-native-elements';

export default function ResultList(props) {
  const {navigation} = props;
/*    const resultados = [
    'QUEEN - WE WILL ROCK YOU',
    'QUEEN - RADIO GAGA',
    'QUEEN - DONT STOP ME NOW',
    'QUEEN - LOVE OF MY LIFE',
    'QUEEN - SOMEBODY TO LOVE',
  ];  */

   const resultados = [
    {
      "singer": "QUEEN",
      "song": "WE WILL ROCK YOU"
    },
    {
      "singer": "QUEEN",
      "song": "RADIO GAGA"
    },
    {
      "singer": "QUEEN",
      "song": "DONT STOP ME NOW"
    },
    {
      "singer": "QUEEN",
      "song": "LOVE OF MY LIFE"
    },
    {
      "singer": "QUEEN",
      "song": "SOMEBODY TO LOVE"
    }
  ];
 
 // console.log(resultados);

  return (
    <ScrollView style={styles.main}>
      {size(resultados) > 0 ? (
        <FlatList
          data={resultados}
          renderItem={(cancion) => (
            <Cancion cancion={cancion} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          //onEndReachedThreshold={0.5}
          //onEndReached={handleLoadMore}
        />
      ) : (    
        <View style={styles.loaderCanciones}>
          <ActivityIndicator size="large" />
          <Text>Cargando canciones</Text>
        </View>
      )}
    </ScrollView>
  );
}

function Cancion(props) {
  const {cancion, navigation} = props;
  //const {singer, song} = cancion;
  const {item} = cancion;
  const {singer, song} = item;
  const playCancion = () => {
    navigation.navigate('MusicPlayer');
  };
  return (
    <TouchableOpacity onPress={playCancion}>
      <View style={styles.cancionView}>
        <Text style={styles.cancionName}>{singer}</Text>
        <Text style={styles.cancionName}>{song.substr(0, 15)}...</Text>
      </View>
      <Divider style={styles.divider}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor:"#fff",
  },
  loaderCanciones: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  cancionView: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 20,
    marginRight:20,
  },
  cancionName: {
    fontSize:38,
    fontWeight: "bold",
    marginTop: 4,
  },
  divider: {
    backgroundColor:"#4f831f",
    marginLeft: 20,
    marginRight:20,
    height: 12,
  },
});
