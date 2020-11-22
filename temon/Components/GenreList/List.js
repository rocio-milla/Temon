import { size } from 'lodash';
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import runes from 'runes';

export default function List(props) {
  const { navigation, listItems } = props;
  return (
    <>
      {size(listItems) > 0 ? (
        <FlatList
          style={styles.main}
          data={listItems}
          renderItem={(listItem) => (
            <Item listItem={listItem} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
          <View style={styles.loaderCanciones}>
            <ActivityIndicator size="large" />
            <Text style={styles.itemName}>NO HAY RESULTADOS</Text>
          </View>
        )}
    </>
  );
}

function Item(props) {
  const { listItem, navigation } = props;
  const { item } = listItem;

  return (
    <TouchableOpacity onPress={item.onTouchAction}>
      <View style={styles.itemView}>
        <Text style={styles.itemName}>{runes.substr(item.Name, 0, 18)}</Text>
        {runes.substr(item.Name, 18, 15) !== "" && <Text style={styles.itemName}>{`${runes.substr(item.Name, 18, 15)}...`}</Text>}
      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    alignSelf:'center',
    width: '100%'
  },
  loaderCanciones: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  itemView: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  itemName: {
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
