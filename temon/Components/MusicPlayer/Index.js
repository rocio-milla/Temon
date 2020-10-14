import React,{useEffect,useState} from 'react';
import {Image,Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import {Header,LearnMoreLinks,Colors,DebugInstructions,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { Button, Icon,Slider } from 'react-native-elements';
import TrackPlayer, { getPosition, pause, play } from 'react-native-track-player';


const track = {
    id: "1",
    url: "https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-8.mp3",
    title: "Track Title",
    artist: "Track Artist"
}

const track2 = {
  id: "2",
  url: "https://cdns-preview-0.dzcdn.net/stream/c-01ef0c4982c94b86c7c0e6b2a70dde4b-7.mp3",
  title: "Track Title",
  artist: "Track Artist"
}

const track3 = {
  id: "2",
  url: "https://cdns-preview-b.dzcdn.net/stream/c-b2e0166bba75a78251d6dca9c9c3b41a-7.mp3",
  title: "Track Title",
  artist: "Track Artist"
}

function alertT(){
  alert("dasd")
}

const MusicPlayerScreen = () => {
 
  TrackPlayer.setupPlayer().then(async () => {
    await TrackPlayer.add([track,track2,track3]);
  });

  const [buttonPlay,setButtonPlay] = useState("") 
  const [position,setPosition] = useState(0)
  const [statePlayer,setStatePlayer] = useState("play")
  
  useEffect(()=>{
    setButtonPlay("pause")    
  },[])

  let button = "pause"
  let playAndStop = () =>{
    if(button == "pause"){
      button = "play"
      TrackPlayer.play()
      alertT
    }
    else{
      button = "pause"
      TrackPlayer.pause()
      //setButtonPlay("pause")
    }
  }

  const duration = ()=>{
    let duration = TrackPlayer.getDuration().then((res)=>{alert(res)})
    return duration;
  }

  const nextTrack = ()=>{
    TrackPlayer.skipToNext();
  }

  const prevTrack =() =>{
    TrackPlayer.skipToPrevious()
  }
  
    return (
      <>
        <View style={styles.headers}>
            <View style={styles.menu}>
            <TouchableOpacity style={styles.iconSearch}>
              <Icon name="search" type='font-awesome'color='#fff' size={40}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconLibrary}>
              <Text style={styles.library}></Text>
            </TouchableOpacity>
            </View>
        </View>

        <View style={styles.screen}>
          <Text></Text>
        </View>

        <View style={styles.viewName}>
            <View style={styles.name}>
            <Text style={styles.nameMusic}>QUEEN - KILLE...</Text>
            </View>
        </View>

        <View style={styles.musicPlayer}>         
          

          <View style={styles.contSlider}>  
            <View style={styles.musicButtons}>
              <TouchableOpacity style={styles.prevButton} onPress={()=>prevTrack()}>
                <Icon name="backward"type='font-awesome'color='#ffffff'size={50}/>        
              </TouchableOpacity>

              <TouchableOpacity style={styles.playButton} onPress={()=>playAndStop()}>
                <Icon name={buttonPlay} id="iconPlay" type='font-awesome' color='#ffffff'size={60} />   
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextButton} onPress={()=>nextTrack()}>
                <Icon name="forward" type='font-awesome' color='#ffffff'size={50}/>
              </TouchableOpacity>
            </View>
            <Slider  
                style={styles.slider} 
                minimumValue={0}
                step={1}
                maximumValue= {10}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#C3C3C3"
                trackStyle={{ height: 30, backgroundColor: 'transparent' }}
                thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
              />
              <Text>pos:{0}, duration:</Text>
          </View>
        </View>
      </>
    );

};

/*
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

*/ 

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
      width:"100%",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
    },
    prevButton:{
      width:100,
      height:100,
      borderRadius:50,
      backgroundColor:"#03902D",
      justifyContent:"center",
      alignItems:"center",
    },
    playButton:{
      width:120,
      height:120,
      backgroundColor:"#000000",
      borderRadius:60,
      justifyContent:"center",
      alignItems:"center",
    },
    nextButton:{
      width:100,
      height:100,
      borderRadius:50,
      backgroundColor:"#9E00B4",
      justifyContent:"center",
      alignItems:"center",
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

export default MusicPlayerScreen;
