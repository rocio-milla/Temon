import { size } from 'lodash';
import React, { useState, useCallback } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import runes from 'runes';
import {useNavigation } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~sqliteexample.db'});



const ScreenPlayListSelected = ( {route }) => {

  const { title, colour,songs} = route.params;
/*  console.log("ffff");
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

  });*/


  //onst { navigation, route } = props;

  //console.log(route.params);

  return (

    <>
         <View>
         <Text style={{fontSize :38, backgroundColor:colour}}>{title}</Text>
        <FlatList
                  data={songs}
                
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    <View key={item.id} style={{ backgroundColor: 'white' ,flexDirection: 'row'  ,alignItems:'center'  ,  justifyContent: 'center' }}>

                      <Text style={{fontSize :20}}>{item.title}</Text>

                    </View>
                  )}
                />
            
  </View>
    </>
);
}
export default ScreenPlayListSelected;


