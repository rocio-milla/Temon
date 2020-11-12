import React from 'react';
import {StyleSheet} from 'react-native';
import {Header,LearnMoreLinks,Colors,DebugInstructions,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
    
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
      flex:3,
      justifyContent:"center",
      alignItems:"center",  
    },
    screenButton:{
      width:"100%",
      height:"100%",
      backgroundColor:"#787878",
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
    prevButton:{
      backgroundColor:"#03902D",
      width:100,
      height:100,
      borderRadius:50,
      justifyContent:"center"
    },
    playButton:{
      backgroundColor:"black",
      justifyContent:"center",
      width:120,
      height:120,
      borderRadius:60,
    },
    nextButton:{
      backgroundColor:"#9E00B4",
      justifyContent:"center",
      width:100,
      height:100,
      borderRadius:50,
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
      flex:1,
    },
  
  });

  