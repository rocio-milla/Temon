import { size } from 'lodash';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Dialog from "react-native-dialog";
import { Divider } from 'react-native-elements';
import runes from 'runes';

var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~sqliteexample.db' })

const HistorialList = (props) => {
  const { navigation, results } = props;
  const [resultList, setResultList] = useState(results);
  const reloadHistorial = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * from historial', [], (tx, r) => {
        var len = r.rows.length;
        let elements = [];
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            elements.push(r.rows.item(i));
          }
          setResultList(elements)
        }
        else {
          let elements = [];
          setResultList(elements)
        }
      });
    });
  }

  useEffect(() => {
    setResultList(results)
  }, [results])

  return (
    <>
      {size(resultList) > 0 ? (
        <FlatList
          style={styles.main}
          data={resultList}
          renderItem={(cancion) => (
            <MusicTheme results={resultList} cancion={cancion} navigation={navigation} reloadHistorial={reloadHistorial} />
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

export default HistorialList;

const MusicTheme = (props) => {
  const [visible, setVisible] = useState(false);
  const { results, cancion, navigation, reloadHistorial } = props;
  const { item } = cancion;
  let { url, video, title } = item;
  video = video ? video : title;

  let resultsList = title ? results.map(s => {
    if (s.hasOwnProperty("title")) {
      s.video = s.title;
      delete s.title;
    }
    return s;
  }) : results

  const playCancion = () => {
    navigation.navigate('HistorialMusicPlayer', {
      title: video,
      song: url,
      results: resultsList
    });
  };

  const deleteSongHistorial = (url, name) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM historial where url=? and title=?', [url, name],
      );
    });
    reloadHistorial();
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => playCancion()} onLongPress={() => { setVisible(true) }}>
        <View style={styles.cancionView}>
          <Text style={styles.cancionName} numberOfLines={2}>{video}</Text>
        </View>
        <Divider style={styles.divider} />
      </TouchableOpacity>
      <Dialog.Container visible={visible}>
        <Dialog.Description style={{ fontSize: 38, fontWeight: "bold" }}>
          ¿ELIMINAR?
        </Dialog.Description>
        <Dialog.Button style={{ marginRight: 25, fontSize: 35, fontWeight: "bold", backgroundColor: "red", color: "white", height: 70, width: 100 }} label="NO" onPress={() => setVisible(false)} />
        <Dialog.Button style={{ marginRight: 25, fontSize: 35, fontWeight: "bold", backgroundColor: "green", color: "white", height: 70, width: 100 }} label="SI" onPress={() => deleteSongHistorial(url, video)} />
      </Dialog.Container>
    </>
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
