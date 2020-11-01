import React, { Component } from 'react'
import { View, StyleSheet,FlatList , ToastAndroid,TextInput } from 'react-native'
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

     onChangeText = (text) => {

      console.log(text);

    }


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
               
                <TextInput style={{ height: 60,fontSize:38, borderColor: 'gray', borderWidth: 1,fontWeight: "bold" ,width:250,margin:7}}
                onChangeText={ this.source}/>

    {/*        <Dialog.Input onChangeText = { this.source} defaultValue='' style = {styles.textInput}></Dialog.Input> */}
         
              <Select 
                onSelect = {this.onSelect.bind(this)}
                defaultText  = {this.state.colour}
                style = {{ margin:7,width:250,height:120,borderWidth : 1, backgroundColor :this.state.colour} }
                textStyle = {{color:this.state.colour}}
                backdropStyle  = {{backgroundColor : "#d3d5d6"}}
                optionListStyle = {{backgroundColor : "#F5FCFF"}}
              >

              <Option  style = {{backgroundColor : "#C84B02",height:100}}value = "#C84B02"></Option>
              <Option style = {{backgroundColor : "#3300CC",height:100}} value = "#3300CC"></Option>
              <Option style = {{backgroundColor : "#D12734",height:100}} value = "#D12734"></Option>
              <Option style = {{backgroundColor : "#47761C",height:100}} value = "#47761C"></Option>
              <Option style = {{backgroundColor : "#0B797E",height:100}} value = "#0B797E"></Option>
              <Option style = {{backgroundColor : "#A646DD",height:100}} value = "#A646DD"></Option>
              <Option style = {{backgroundColor : "#000000",height:100}} value = "#000000"></Option>
              <Option style = {{backgroundColor : "#CF2EAD",height:100}} value = "#CF2EAD"></Option>

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
      fontSize: 20
   }
})