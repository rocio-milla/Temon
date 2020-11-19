'use strict';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Slider } from 'react-native-elements';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import runes from 'runes';
import { PersonalConfig } from '../../PersonalConfig.js';
import styles from './IndexStyle';
import {useNavigation } from '@react-navigation/native' 
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const MusicPlayerScreen = ({ route }) => {
  const navigation = useNavigation()

  const { results ,title, song } = route.params;
  const { position, duration } = useTrackPlayerProgress(200);
  // const progress = TrackPlayer.useTrackPlayerProgress();
  const [buttonPlay, setButtonPlay] = useState("pause");
  const [idTrack, setIdTrack] = useState("");
  const [musicTheme, setMusicTheme] = useState({ id: "", url: "", title: "", duration: 0 });
  const [count, setCount] = useState(0);
  const [swipeState,setSwipeState] = useState(0);
  const [touchState,setTouchState] = useState({state1: 0,state2: 0});
  const [gestureName,setGestureName] = useState("none");
  //const [count,setCount] = useState({value:0,state:0})
  //const [dateTouch,setDateTouch] = useState(null)
  let playerReady = false;
  useEffect(() => {
    const setPlayer = async () => {
      if (!playerReady) {
        await TrackPlayer.setupPlayer();

        await TrackPlayer.updateOptions({
          stopWithApp: true,
          capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_STOP,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          ],

          compactCapabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SKIP,
          ]
        });

        playerReady = true;
      }
      await TrackPlayer.reset();
      let res = [];
      res = results;
      let idActualTrack;
      for(let i=0;i<res.length;i++){
        if(song == res[i].url){
          idActualTrack = ""+i+""
        }
        await TrackPlayer.add({
          id: ""+i+"",
          url: `${PersonalConfig.url}/musica/escuchar?url=${encodeURI(res[i].url)}`,
          title: res[i].video
        });
      }
      await TrackPlayer.skip(idActualTrack)
      await TrackPlayer.play();
      setMusicTheme({ ...musicTheme, title: title })
      
    };
    setPlayer();
    setSwipeState(0)
    setCount(0)
    setButtonPlay("pause")
    setTouchState(0)
    setGestureName("none")
    return (() => {
      TrackPlayer.destroy();
    })
  }, [])

  useEffect(()=>{
    if(touchState==0){
    }
    else if(touchState>=1 && touchState<=2){
        let incremental = position
        console.log(incremental+"\n")
        TrackPlayer.setVolume(0)
        TrackPlayer.play()
        let adelantar = duration * 0.025
        incremental = incremental+adelantar
        const timer = setTimeout(() => {
          setCount(1)
        }, 200);
        const interval = setInterval(() => {
          if(touchState==1){
            incremental = incremental-adelantar
            TrackPlayer.seekTo(incremental)
          }
          else if(touchState==2){
            incremental = incremental+adelantar
            TrackPlayer.seekTo(incremental)
            TrackPlayer.getPosition().then((res)=>{console.log(res)})
          }
        }, 200);
  
      return () => {
        clearInterval(interval)
        clearTimeout(timer);
        if (buttonPlay == "play") {
          TrackPlayer.pause()
        }
        TrackPlayer.setVolume(1)
      };
    }
    else if(touchState==3){
      if(count==0){
        playAndStop()
      }
      else{
        setCount(0)
      }
    }
    else{

    }
  },[touchState])

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        TrackPlayer.destroy();
      };
    }, []));
    
  /*comienso swipe*/ 
   
  let cancelOut = 0
  const onSwipeLeft = (gestureState) => {
    cancelOut = 1
    console.log("swipe : izquierda")
    prevTrack()
  }
   
  const onSwipeRight = (gestureState) => {
    cancelOut = 1
    console.log("swipe : derecha")
    nextTrack()
    
  }

  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setGestureName(gestureName)
    switch (gestureName) {
      case SWIPE_UP:
        console.log("arriba");
      break;
      case SWIPE_DOWN:
        console.log("abajo");
      break;
      case SWIPE_LEFT:
        console.log("izquierda");
      break;
      case SWIPE_RIGHT:
        console.log("derecha");
      break;
      }
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
    gestoIsClickThreshold:10
  };
  /*fin swipe*/ 
  const playAndStop = () => {
    if (buttonPlay == "pause") {
      setButtonPlay("play")
      TrackPlayer.pause()
    }
    else {
      setButtonPlay("pause")
      TrackPlayer.play()
    }
  }

  const nextTrack = () => {
    TrackPlayer.skipToNext();
    TrackActual()
  }

  const prevTrack = () => {
    TrackPlayer.skipToPrevious()
    TrackActual()
  }

  let updateTheme = (res) => {
    setMusicTheme({
      id: res.id,
      url: res.url,
      title: res.title,
    })
  }

  let getIdTrack = (res) => {
    setIdTrack(res)
    TrackPlayer.getTrack(res).then((data) => {
      updateTheme(data)
    })
  }

  const setPositionTrack = (e) => {
     TrackPlayer.seekTo(e)
  }

  const TrackActual = () => {
    TrackPlayer.getCurrentTrack().then(
      (res) => { getIdTrack(res) }
    )
  }

  const pressInLeft = () => {
    setTouchState(1)
    console.log("in isquierda")
  }

  const pressOutLeft = () => {
    if(cancelOut==0){  
      console.log("out isquierda: ")
      setTouchState(3)
    }
    else{
      setTouchState(4)
      cancelOut=0
    }
  }

  const pressInRight = () => {
    setTouchState(2)
    console.log("in derecha")
  }

  const pressOutRight = () => {
    if(cancelOut==0){  
      console.log("out derecha")
      setTouchState(3)
    }
    else{
      setTouchState(4)
      cancelOut=0
    }
  }
  
  const library = () => {
    navigation.navigate('Library');
  };

  return (
    <>
      <View style={styles.headers}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.iconSearch}>
            <Icon name="search" type='font-awesome' color='black' reverse size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconLibrary} onPress={() => library()}>
            <Text style={styles.library}></Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.screen}>
          <GestureRecognizer
            onSwipeRight= {(state)=>{onSwipeLeft(state)}}
            onTouchStart = {()=>{pressInLeft()}}            
            onTouchEnd = {()=>{pressOutLeft()}}
            config={config}   
            style={styles.gestureRecognizer1}
          >
          </GestureRecognizer>
          <GestureRecognizer
            onSwipeLeft= {(state)=>{onSwipeRight(state)}}
            onTouchStart = {()=>{pressInRight()}}
            onTouchEnd = {()=>{pressOutRight()}}
            config={config}
            style={styles.gestureRecognizer2}
          >
          </GestureRecognizer>
      </View>
      <View style={styles.viewName}>
        <View style={styles.name}>
          <Text style={styles.nameMusic}>{runes.substr(musicTheme.title !== "" ? musicTheme.title : title, 0, 18)}</Text>
        </View>
      </View>
      <View style={styles.musicPlayer}>
          <View style={styles.musicButtons}>
            <TouchableOpacity style={styles.prevButton} onPress={() => prevTrack()}>
              {<Icon name="backward" type='font-awesome' color='#ffffff' size={50} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={() => playAndStop()}>
              {<Icon name={buttonPlay} id="iconPlay" type='font-awesome' color='#ffffff' size={60} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => nextTrack()}>
              {<Icon name="forward" type='font-awesome' color='#ffffff' size={50} />}
            </TouchableOpacity>
          </View>
          <View style={styles.contSlider}>
          {<Slider
            style={styles.slider}
            minimumValue={0}
            step={1}
            maximumValue={duration}
            value={position}
            onValueChange={(res) => setPositionTrack(res)}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#C3C3C3"
            trackStyle={{ height: 30, backgroundColor: 'transparent' }}
            thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          /> }
        </View>
      </View>
    </>
  );
};

export default MusicPlayerScreen;
