import { size } from 'lodash';
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import runes from 'runes';

export default function ResultList(props) {
  const { navigation, results } = props;

  return (
    <>
      {size(results) > 0 ? (
        <FlatList
          style={styles.main}
          data={results}
          renderItem={(cancion) => (
            <Cancion cancion={cancion} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
          <View style={styles.loaderCanciones}>
            <ActivityIndicator size="large" />
            <Text style={styles.cancionName}>0 RESULTADOS</Text>
          </View>
        )}
    </>
  );
}

function Cancion(props) {
  const { cancion, navigation } = props;
  const { item } = cancion;
  let { url, video, title } = item;
  video = video ? video : title;
  const playCancion = () => {
    navigation.navigate('MusicPlayer', {
      title: video,
      song: url
    });
  };
  return (
    <TouchableOpacity onPress={() => playCancion()}>
      <View style={styles.cancionView}>
        {/* <Text style={styles.cancionName}>{singer}</Text> */}
        <Text style={styles.cancionName}>{runes.substr(video, 0, 18)}</Text>
        {runes.substr(video, 18, 15) !== "" && <Text style={styles.cancionName}>{`${runes.substr(video, 18, 15)}...`}</Text>}
      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
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
    marginRight: 20,
  },
  cancionName: {
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 4,
  },
  divider: {
    backgroundColor: "#4f831f",
    marginLeft: 20,
    marginRight: 20,
    height: 12,
  },
});
