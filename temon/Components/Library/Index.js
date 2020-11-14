import React, { Component } from 'react'
import { View, StyleSheet} from 'react-native'
import {Button } from 'react-native-elements';   
import {useNavigation } from '@react-navigation/native' 



const ScreenLibrary = () => {
    
    const navigation = useNavigation();

    const playlists = () => {
        navigation.navigate('Playlists');
      };
    
      return (
         <View style = {styles.container}>


            <Button  onPress={() => playlists()}
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
              title="PLAYLISTS"/>

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
              title="HISTORIAL"/>

            <Button 
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
              title="ME GUSTA"/>
    </View> 
      );

}



export default ScreenLibrary


const styles = StyleSheet.create ({
   container: {
      flex: 1,
    alignItems: 'center',

      marginTop: 30,
  
   }

})