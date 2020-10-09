import React from 'react';
import {Image,Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import {Header,LearnMoreLinks,Colors,DebugInstructions,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { Button, Icon,Slider } from 'react-native-elements';
import { ceil } from 'react-native-reanimated';

const MusicPlayerScreen = () => {
    
    return (
        <>
        <View style={styles.headers}>
            <View style={styles.menu}>
            <TouchableOpacity style={styles.iconSearch}>
            <Icon
                    name="search"
                    type='font-awesome'
                    color='#fff'
                    size={40}
            />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconLibrary}>
            <Text style={styles.library}></Text>
            </TouchableOpacity>
            </View>
        </View>

        <View style={styles.screen}>
          <Text></Text>
        </View>
      
        <View style={styles.soundOptions}>
            <View style={styles.options}>
                <TouchableOpacity style={styles.iconStart}>
                <Icon
                    name="star"
                    type='font-awesome'
                    color='#fff'
                    size={40}
                />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconPlus}>
                <Icon
                    name="plus"
                    type='font-awesome'
                    color='#fff'
                    size={40}
                />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.viewName}>
            <View style={styles.name}>
            <Text style={styles.nameMusic}>QUEEN - KILLE...</Text>
            </View>
        </View>

        <View style={styles.musicPlayer}> 
        
            <View style={styles.musicButtons}>

            
            <Icon
                name="backward"
                type='font-awesome'
                color='#03902D'
                size={45}
                reverse
            />        
            
            <Icon
                name="play"
                type='font-awesome'
                color='#000'
                size={60}
                reverse
            />   

            <Icon
                name="forward"
                type='font-awesome'
                color='#9E00B4'
                size={45}
                reverse
            />  
                  
        </View>

        <View style={styles.contSlider}>
          <Slider  
            style={styles.slider} 
            minimumValue={-10}
            step={0}
            maximumValue={42}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#C3C3C3"
            trackStyle={{ height: 30, backgroundColor: 'transparent' }}
            thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          />
        
        </View>
      </View>
        </>
    );
    
};

const styles = StyleSheet.create({
    headers:{
      backgroundColor:"#000",
      height:100,
      justifyContent:"center",
      alignItems:"center",
    },
    menu:{
      height:"100%",
      width:"90%",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
    },
    iconSearch:{
      height:70,
      width:70,
      borderRadius:35,
      justifyContent:"center",
      alignItems:"center",
      
    },
    iconLibrary:{
      height:70,
      width:70,
      borderRadius:35,
      backgroundColor:"#fff",
    },
    scrollView: {
      backgroundColor: Colors.lighter,
    },
  
    screen:{
      backgroundColor:"#787878",
      flex:3,
      justifyContent:"center",
      alignItems:"center",  
    },
  
    soundOptions:{
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"row",
    },
    options:{
      width:"90%",
      height:100,
      justifyContent:"space-between",
      alignItems:"center",
      flexDirection:"row",
    },
    iconStart:{
      height:70,
      width:70,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#047373",
      borderRadius:35,
    },
    iconPlus:{
      justifyContent:"center",
      
      height:70,
      width:70,
      backgroundColor:"#FE4900",
      borderRadius:35,
    },
  
    viewName:{
      justifyContent:"center",
      alignItems:"center",
      height:70
    },
    name:{
      justifyContent:"center",
      alignItems:"center",
      width:"90%",
    },
    nameMusic:{
      fontSize:38,
    },
    
    musicPlayer: {
      flex:2,
      justifyContent:"center",
      alignItems:"center",
    },
    musicButtons:{
      width:"90%",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
    },
    
    contSlider:{
      flex:2,
      width:"90%",
      marginLeft: 10,
      marginRight: 10,
      alignItems: "stretch",
      justifyContent: "center", 
    },
    slider:{
      width:"100%",
      
    },
  
  });

export default MusicPlayerScreen;