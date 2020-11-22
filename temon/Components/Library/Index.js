import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

var SQLite = require('react-native-sqlite-storage');

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',

      marginTop: 30,
   }
});

const ScreenLibrary = () => {
   const navigation = useNavigation();

   const playlists = () => {
      navigation.navigate('Playlists');
   };

   const favoritos = () => {
      var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~sqliteexample.db' });

      db.transaction(tx => {
         tx.executeSql('SELECT * FROM favoritos', [], (tx, results) => {
            const rowsLength = results.rows.length;
            const canciones = [];
            for (let i = 0; i < rowsLength; i++) {
               canciones.push(results.rows.item(i));
            }
            
            console.log(canciones)
            navigation.navigate('Results', {
               results: canciones,
            });
         });
      });
   };

   return (
      <View style={styles.container}>
         <Button onPress={() => playlists()}
            titleStyle={{
               color: "white",
               fontSize: 38,
               fontWeight: "bold"
            }}
            buttonStyle={{
               backgroundColor: "#C84B02",
               borderRadius: 10,
               height: 90,
               width: 340,
            }}
            title="PLAYLISTS" />

         <Button
            titleStyle={{
               color: "white",
               fontSize: 38,
               fontWeight: "bold"
            }}
            buttonStyle={{
               marginTop: 30,
               backgroundColor: "#D12734",
               borderRadius: 10,
               height: 90,
               width: 340,
            }}
            title="HISTORIAL" />

         <Button
            onPress={() => favoritos()}
            titleStyle={{
               color: "white",
               fontSize: 38,
               fontWeight: "bold",
            }}
            buttonStyle={{
               marginTop: 30,
               backgroundColor: "#3300CC",
               borderRadius: 10,
               height: 90,
               width: 340,
            }}
            title="FAVORITOS" />
      </View>
   );
}

export default ScreenLibrary;
