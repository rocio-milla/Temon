import { size } from 'lodash';
import React, { useState, useCallback } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import runes from 'runes';
import {useNavigation } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~sqliteexample.db'});


const ScreenPlayListSelected = ( props ) => {

  console.log("ffff");
  db.transaction(tx => {

    tx.executeSql('SELECT * from playlist', [], (tx, results) => {
       var len = results.rows.length;

       let elements = [];

         for (let i = 0; i < len; i++) {
           elements.push(results.rows.item(i));
         }
         this.setState({ elementList:elements});
         console.log(this.state.elementList)
     });

  });
 

  const { navigation, route } = props;
  const { id, name } = route.params;
  console.log(route.params);


  return (

   // <>
   
  <Text>Holaaa Nombre Lista</Text>

    //</>
);
}
export default ScreenPlayListSelected;


