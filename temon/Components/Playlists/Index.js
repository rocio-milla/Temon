import React, { Component } from 'react'
import { View, StyleSheet,FlatList , ToastAndroid,TextInput,Animated,Text,TouchableOpacity } from 'react-native'
import Dialog from "react-native-dialog";
import {Select, Option} from "react-native-chooser";
import { Icon,Button } from 'react-native-elements';
import {useNavigation } from '@react-navigation/native';
import Mic from './mic';


var SQLite = require('react-native-sqlite-storage')

var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~sqliteexample.db'})

class ScreenPlaylists extends Component {

   state = {
      'name' :'',
      'elementList':[],
      'visible':false,
      'colour' : '#A646DD',
      'elementsListPlaylist':[],
      'listAllSong':[],
       'results':[],

      startValue: new Animated.Value(0),
      endValue: new Animated.Value(1)
   }

   componentDidMount() {

    db.transaction(tx => {

      tx.executeSql(
        'create table if not exists playlist (name text not null,colour text not null, primary key(name,colour));',[],()=>console.log("creeeated"),(a,b)=>console.log(b)
      );


            //--------------------------------tabla de canciones -------------------------//
      tx.executeSql(
        'create table if not exists song (url text not null,title text,namePlaylist text,colour text, FOREIGN KEY(namePlaylist,colour) REFERENCES playlist(name,colour),primary key(url));',[],()=>console.log("creeeated table song"),(a,b)=>console.log(b)
      );
///////////////------------------//////////////////////


        tx.executeSql(  
          'INSERT OR IGNORE  INTO playlist (name,colour) VALUES (?,?),(?,?),(?,?)',
          ["Clasicos!","#CF2EAD",
          "Variados","#3300CC",
          "Rock","#C84B02"]
          ,
          (tx, results) => {  
            
            
            if (results.rowsAffected > 0 ) {
              console.log('Insert success');              
            } else {
              console.log('Insert failed');
            }
          }
        );
 
        tx.executeSql(        
          'INSERT OR IGNORE INTO song (url,title,namePlaylist,colour) VALUES (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?)',
          ["https://www.youtube.com/watch?v=-tJYN-eG1zk","Queen - We will rock you","Clasicos!","#CF2EAD",
          "https://www.youtube.com/watch?v=zpzdgmqIHOQ","Madonna - La isla bonita","Clasicos!","#CF2EAD",
          "https://www.youtube.com/watch?v=9UY8kqV7KgE","Virus - Imágenes paganas","Variados","#3300CC",
          "https://www.youtube.com/watch?v=2ZBtPf7FOoM","Queen - Killer Queen","Variados","#3300CC"],
       
         // "Clasicos!","Guns N Roses","Roses - Welcome To The Jungle",
         // "Clasicos!","The Beatles","Helter Skelter"],
          //"Variados","Madonna","La isla bonita",
          //"Variados","The Rolling Stones","I can't get no",
          //"Variados","Juanes","Es por ti",
          //"Rock","Los Abuelos de la Nada","Mil horas",
          //"Rock","Soda Stereo","Cuando pase el temblor",
          //"Rock","Virus ","Imágenes paganas"],
          (tx, results) => {               
            if (results.rowsAffected > 0 ) {
              console.log('cancion insertada');              
            } else {
              console.log('cancion no insertada');
            }
          }
        );


      //---------listar playlists----------//
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

////////////----------SOLO PARA VER TODAS LAS CANCIONES------///////////
    /*   tx.executeSql('SELECT * from song', [], (tx, results) => {
        var len = results.rows.length;
        console.log(len)
        let elements = [];
        if(len > 0) {
          for (let i = 0; i < len; i++) {
            elements.push(results.rows.item(i));
            console.log(results.rows.item(i));
          }
          this.setState({ listAllSong:elements});
          console.log(this.state.listAllSong)
    
        }
      if(len==0){
          console.log("no hay")
        let elements = [];
    
        this.setState({ listAllSong:elements});
    }
    
      });*/

//----------------------------------------------//

    });

  }

  PlaylistElements = (name,colour) => {

    //console.log(name+"-"+colour)
  
    db.transaction(tx => {
   
    tx.executeSql('SELECT * from song where namePlaylist=? and colour=?', [name,colour], (tx, results) => {
      var len = results.rows.length;
      console.log(len)
      let elements = [];
      if(len > 0) {
        for (let i = 0; i < len; i++) {
          elements.push(results.rows.item(i));
         // console.log(results.rows.item(i));
        }
        this.setState({ elementsListPlaylist:elements});
      //  console.log(this.state.elementsListPlaylist)
  
      console.log("-------------------lista de canciones-------------------")
      console.log(this.state.elementsListPlaylist)

      this.props.navigation.navigate('PlayListSelected', {
        title:name,
        colour:colour,
        songs:this.state.elementsListPlaylist
      });
      }

    if(len==0){
        console.log("no hay")
      let elements = [];
  
      this.setState({ elementsListPlaylist:elements});

      console.log("-------------------lista de canciones-------------------")
      console.log(this.state.elementsListPlaylist)

      this.props.navigation.navigate('PlayListSelected', {
        title:name,
        colour:colour,
        songs:this.state.elementsListPlaylist
      });
  }
  
    });
  });


  };
  
  
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
     let cont=0;
    console.log("a agregar")
    console.log(this.state.name)
    console.log(this.state.colour)

    if(this.state.name!=''){

      for (let element of this.state.elementList) {

        if(element.name==this.state.name && element.colour==this.state.colour){

            console.log("cambia a 1")
            cont=cont+1;
  
             }
        }

    console.log("la condicion es : "+ cont)

    if(cont==1)
    {

      Animated.sequence([
        Animated.timing(this.state.startValue, {

          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.startValue, {

          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        })
      ]).start()

         // ToastAndroid.show('YA EXISTE', ToastAndroid.SHORT);
         console.log("ya existe")
    }

    else{

      console.log("no existe")
      db.transaction(
        tx => {
        tx.executeSql('insert into playlist (name,colour) values (?,?)',[this.state.name,this.state.colour]   ,
          (tx, results) => {

          if (results.rowsAffected > 0) {
            console.log("insertado")
      
          } 

          else {
            console.log("no se inserto")
          }
     });

     console.log("segunda parte")
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

 }
)
      this.setState({ visible:false});
}
    } 

      else
      {
       this.setState({ visible:true});


       ToastAndroid.show('INGRESE NOMBRE', ToastAndroid.SHORT);
    }

   };

   deletePlaylist = (name,colour) => {
     console.log(name)
     console.log(colour)
    db.transaction(tx => {
    tx.executeSql(
    'DELETE FROM  playlist where name=? and colour=?', [name,colour],
    (tx, results) => {
    console.log('Results', results.rowsAffected); if (results.rowsAffected > 0) {
      console.log("id borrado :"+id)
    } 
    }
    );

    //----------listar playlists------//
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
                  marginBottom:10,
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
                    <View key={item.id} style={{ backgroundColor: 'white', padding: 10 ,flexDirection: 'row'  ,alignItems:'center'  ,  justifyContent: 'center' }}>
                    
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

                    onPress={()=>this.PlaylistElements(item.name,item.colour)} 
                 
                      title={item.name}/>
                    
                    { /* <Lista       item={item}  />*/}

                      <Icon onPress = {()=>this.deletePlaylist(item.name,item.colour)}
                        name='trash'
                        type='evilicon'
                        color='black'
                        size={100}
                        />
                    </View>
                  
                  )}
                />

                <Dialog.Container visible={this.state.visible}  >

                  <Animated.View style={[styles.square, {opacity: this.state.startValue}]} >
                  <Text style={{ color: 'white',  fontSize:38, fontWeight: 'bold' }}> YA EXISTE
                  </Text>
                  </Animated.View>
                  
                  <View style={{marginTop:-70,flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>

                    <Dialog.Title style = {{fontSize:38 , fontWeight: "bold"}}>NOMBRE</Dialog.Title>
                    <Text style = {{margin:0 ,fontSize:38 , fontWeight: "bold", textAlign: 'center'}}>{this.state.name}</Text>
                    <Mic setResults={(texto)=>this.setState({ name:texto}) }/>

                  </View>
              

              { /* <TextInput style={{ height: 60,fontSize:38, borderColor: 'gray', borderWidth: 1,fontWeight: "bold" ,width:250,margin:7}}
                onChangeText={ this.source}/>*/}

    {/*        <Dialog.Input onChangeText = { this.source} defaultValue='' style = {styles.textInput}></Dialog.Input> */}
         
                <Select 
                  onSelect = {this.onSelect.bind(this)}
                  defaultText  = {this.state.colour}
                  style = {{ margin:23,marginTop:150,width:250, height:150,borderWidth : 1, backgroundColor :this.state.colour} }
                  textStyle = {{color:this.state.colour}}
                  backdropStyle  = {{backgroundColor : "#d3d5d6"}}
                  optionListStyle = {{backgroundColor : "#F5FCFF",width:250,height:250}}>
                <Option  style = {{backgroundColor : "#C84B02",height:125}}value = "#C84B02"></Option>
                <Option style = {{backgroundColor : "#3300CC",height:125}} value = "#3300CC"></Option>
                <Option style = {{backgroundColor : "#D12734",height:125}} value = "#D12734"></Option>
                <Option style = {{backgroundColor : "#47761C",height:125}} value = "#47761C"></Option>
                <Option style = {{backgroundColor : "#0B797E",height:125}} value = "#0B797E"></Option>
                <Option style = {{backgroundColor : "#A646DD",height:125}} value = "#A646DD"></Option>
                <Option style = {{backgroundColor : "#000000",height:125}} value = "#000000"></Option>
                <Option style = {{backgroundColor : "#CF2EAD",height:125}} value = "#CF2EAD"></Option>
                </Select>

                <Dialog.Button style = {{marginRight:25,fontSize:25 , fontWeight: "bold"}} label="AGREGAR" onPress={this.addPlaylist} />
                <Dialog.Button style = {{margin:0,fontSize:25 , fontWeight: "bold"}} label="CANCELAR" onPress={this.hideDialog} />
              
              </Dialog.Container>
           

            { /*PARA VER LAS CANCIONES DE LA PLAYLIST
            
            <FlatList
                  data={this.state.elementsListPlaylist}
                  ItemSeparatorComponent={this.ListViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    <View key={item.id} style={{ backgroundColor: 'white' ,flexDirection: 'row'  ,alignItems:'center'  ,  justifyContent: 'center' }}>

                      <Text style={{fontSize :20}}>{item.title}</Text>

                    </View>
                  )}
                />*/}


{ /*  SOLO PARA VER TODAS LAS CANCIONES
           <FlatList
                  data={this.state.listAllSong}
                  ItemSeparatorComponent={this.ListViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    <View key={item.id} style={{ backgroundColor: 'white' ,flexDirection: 'row'  ,alignItems:'center'  ,  justifyContent: 'center' }}>

                      <Text style={{fontSize :20}}>{item.title}</Text>


                    </View>
                  )}
                  />*/}

          </View>
      )
   }
}
export default ScreenPlaylists

function Lista(props){
  const { item } = props;
  const {name} = item;
  console.log(name);
  const navigation = useNavigation();
  return(
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
                     onPress={() => 
                        navigation.navigate("PlayListSelected", {
                        screen: "PlayListSelected",
                          params: { name },
                        })
                      }
                        
                      title={name}/>
  );
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
    alignItems: 'center',

      marginTop: 50
   },
   textInput: {
      borderWidth: 1,
      fontSize: 20
   },

   square: {
    alignItems: 'center',
    height: 50,
    width: 300,
    backgroundColor: 'green',
  }
})