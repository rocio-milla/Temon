import React, { Component } from 'react'
import { View, StyleSheet,FlatList , ToastAndroid} from 'react-native'
import Dialog from "react-native-dialog";
import {Select, Option} from "react-native-chooser";
import { Icon,Button } from 'react-native-elements';   


var SQLite = require('react-native-sqlite-storage')

var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~sqliteexample.db'})

class ScreenPlaylists extends Component {


   state = {
      'name' :'',
      'elementList':[],
      'visible':false,
      'colour' : "red",
   
   }

   componentDidMount() {
    db.transaction(tx => {

      tx.executeSql(
        'create table if not exists playlist (id integer primary key not null, name text,colour text);',[],()=>console.log("creeeated"),(a,b)=>console.log(b)
      );

      //---------listar----------//
      tx.executeSql('SELECT * from playlist', [], (tx, results) => {
         var len = results.rows.length;

         let elements = [];

           for (let i = 0; i < len; i++) {
             elements.push(results.rows.item(i));
           }
           this.setState({ elementList:elements});
           console.log(this.state.elementList)
       });

       //-------------///
    });
  }

  onSelect(value) {

    console.log("color seleccionado es: "+ value)
    this.setState({colour : value});
  }




   //-------modal---------//
    showDialog = () => {

      this.setState({ visible:true});
      this.setState({ name:''});
  };
   
    hideDialog = () => {
      
    this.setState({ visible:false});
};
 //----------------//


 source = (name) =>{

  console.log(name);
  this.setState({ 'name' : name});
} 

   addPlaylist = ()=>{

    if(this.state.name!=''){

     db.transaction(
       tx => {
        console.log(tx.executeSql('insert into playlist (name,colour) values (?,?)',[this.state.name,this.state.colour],()=>console.log("sucess"),(a,b)=>console.log(b)));

        tx.executeSql('SELECT * from playlist', [], (tx, results) => {
         var len = results.rows.length;
         let elements = [];

        if(len > 0) {
   
           for (let i = 0; i < len; i++) {
             elements.push(results.rows.item(i));
             console.log(results.rows.item(i));
           }
           this.setState({ elementList:elements});
           console.log(this.state.elementList)

        }
       });

        console.log("exit");
      }
    )
    this.setState({ visible:false});

    } 

else{
  this.setState({ visible:true});
  ToastAndroid.show('INGRESE NOMBRE', ToastAndroid.SHORT);
}

   };

   deletePlaylist = (id) => {
    db.transaction(tx => {
    tx.executeSql(
    'DELETE FROM  playlist where id=?', [id],
    (tx, results) => {
    console.log('Results', results.rowsAffected); if (results.rowsAffected > 0) {
      console.log("id borrado :"+id)

    } 
    }
    );

    //----------listar------//
    tx.executeSql('SELECT * from playlist', [], (tx, results) => {
      var len = results.rows.length;
      let elements = [];
      if(len > 0) {
        for (let i = 0; i < len; i++) {
          elements.push(results.rows.item(i));
          console.log(results.rows.item(i));
        }
        this.setState({ elementList:elements});
        console.log(this.state.elementList)

      }
      if(len==0){
      let elements = [];

      this.setState({ elementList:elements});
}

    });
//-----------------------------//

    });

    };

   ListViewItemSeparator = () => {
      return (
        <View style={{ height: 0, width: '100%', backgroundColor: '#808080' }} />
      );
    };

   render() {
      return (
         <View style = {styles.container}>

            <Button onPress={this.showDialog}
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
              title="NUEVA PLAYLIST"/>

            <FlatList
                  data={this.state.elementList}
                  ItemSeparatorComponent={this.ListViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    <View key={item.id} style={{ backgroundColor: 'white', padding: 20 ,flexDirection: 'row'  ,alignItems:'center'   }}>

                  <Button
                   titleStyle={{
                   color: "white",
                   fontSize: 38,
                   fontWeight: "bold"
                  }}
                   buttonStyle={{
                   backgroundColor: item.colour,
                   borderRadius: 10,
                   height: 90,
                   width: 250,  
                   }}
                   title={item.name}/>


<Icon onPress = {()=>this.deletePlaylist(item.id)}
  name='trash'
  type='evilicon'
  color='black'
  size={100}
/>
                    </View>
                  )}
                />

                <Dialog.Container visible={this.state.visible}  >
                <Dialog.Title style = {{fontSize:50 , fontWeight: "bold"}}>NOMBRE</Dialog.Title>
                <Dialog.Input onChangeText = { this.source} defaultValue='' style = {styles.textInput}></Dialog.Input>

           <Select 
            onSelect = {this.onSelect.bind(this)}
            defaultText  = {this.state.colour}
            style = {{ margin:7,width:250,height:120,borderWidth : 1, backgroundColor :this.state.colour} }
            textStyle = {{color:this.state.colour}}
            backdropStyle  = {{backgroundColor : "#d3d5d6"}}
            optionListStyle = {{backgroundColor : "#F5FCFF"}}
          >

          <Option  style = {{backgroundColor : "#7685ed",height:100}}value = "#7685ed"></Option>
          <Option style = {{backgroundColor : "yellow",height:100}} value = "yellow"></Option>
          <Option style = {{backgroundColor : "black",height:100}} value = "black"></Option>
          <Option style = {{backgroundColor : "blue",height:100}} value = "blue"></Option>
          <Option style = {{backgroundColor : "red",height:100}} value = "red"></Option>
          <Option style = {{backgroundColor : "grey",height:100}} value = "grey"></Option>
          <Option style = {{backgroundColor : "pink",height:100}} value = "pink"></Option>
          <Option style = {{backgroundColor : "orange",height:100}} value = "orange"></Option>

          </Select>
          <Dialog.Button style = {{margin:0,fontSize:25 , fontWeight: "bold"}} label="AGREGAR" onPress={this.addPlaylist} />
          <Dialog.Button style = {{margin:0,fontSize:25 , fontWeight: "bold"}} label="CANCELAR" onPress={this.hideDialog} />
          </Dialog.Container>
          </View>
      )
   }
}
export default ScreenPlaylists

const styles = StyleSheet.create ({
   container: {
      flex: 1,
    alignItems: 'center',

      marginTop: 50
   },
   textInput: {

      borderWidth: 1,

   }
})