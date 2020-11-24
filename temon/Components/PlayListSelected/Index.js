import React, { useEffect,useState} from "react";
import { Alert,FlatList, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import {useNavigation } from '@react-navigation/native';
import Dialog from "react-native-dialog";
import { Icon } from 'react-native-elements';

var SQLite = require('react-native-sqlite-storage')

var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~sqliteexample.db'})

  const ScreenPlayListSelected = ( {route }) => {

  const navigation = useNavigation() 
  const { title, colour,songs} = route.params;

  const [elements, setElements] = useState(songs);
  const [visible, setVisible] = useState(false);

  const [urlElegida, setUrlElegida] = useState();
  const [namePlaylistElegido, setNamePlaylistElegido] = useState();
  const [colourElegido, setColourElegido] = useState();
 

  useEffect(() => {
    navigation.setOptions({
      title: title,           
      headerStyle: {
      backgroundColor: colour,
      height: 100,
    },})

    }, []);



    const showDialog = (url,namePlaylist,colour) => {

      console.log("show dialog "+ url+"-"+namePlaylist+"-"+colour)
setVisible(true)

setUrlElegida(url)
setNamePlaylistElegido(namePlaylist)
setColourElegido(colour)
console.log(urlElegida)


  };



    const deleteSongPlaylist = (url,name,colour) => {
      console.log(url+"-"+name+"-"+colour)


     db.transaction(tx => {
     tx.executeSql(
     'DELETE FROM  song where url=? and namePlaylist=? and colour=?', [url,name,colour],
     (tx, results) => {
     console.log('Results', results.rowsAffected); 
     
     if (results.rowsAffected > 0) {
       console.log("id borrado :"+url)
 
     } 
     }
     );
 
     //----------listar------//
     tx.executeSql('SELECT * from song where namePlaylist=? and colour=?', [name,colour], (tx, results) => {
      var len = results.rows.length;
      console.log(len)
      let elements = [];
      if(len > 0) {
        for (let i = 0; i < len; i++) {
          elements.push(results.rows.item(i));
          console.log(results.rows.item(i));
        }

        setElements(elements)
        setVisible(false)
      }
    if(len==0){
        console.log("no hay")
      let elements = [];
      setElements(elements)
      setVisible(false)
  }
  
    });
 //-----------------------------//
 
     });


     };

  return (
    <>
         <View>

        <FlatList

              data={elements}
                
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (




                
                <View key={item.id} style={styles.cancionView}>
                  <TouchableOpacity onLongPress={()=>showDialog(item.url,item.namePlaylist,item.colour)}>
                  <Text style={styles.cancionName}>{item.title.substr(0, 33)}...</Text>
                  </TouchableOpacity>
                  <Text style={styles.divider}></Text>

                  <Dialog.Container visible={visible}>

                  <Dialog.Description style = {{fontSize:38 , fontWeight: "bold"}}>
                    ¿ELIMINAR?
                  </Dialog.Description>

                  <Dialog.Button style = {{marginRight:40,fontSize:35 , fontWeight: "bold"}} label="CANCELAR"  onPress={()=>setVisible(false)}/>
                  <Dialog.Button style = {{fontSize:35 , fontWeight: "bold"}} label="SI" onPress = {()=>deleteSongPlaylist(urlElegida,namePlaylistElegido,colourElegido)} />
              
              </Dialog.Container>
           
                </View> 

                
                  )}
                />



          </View>
    </>
);
}
export default ScreenPlayListSelected;


const styles = StyleSheet.create({


  cancionView: {
    backgroundColor: 'white' ,flexDirection: 'column'  ,alignItems:'center'  ,  justifyContent: 'center' ,
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
    width:340
  },

});