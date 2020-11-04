import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Slider } from 'react-native-elements';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import runes from 'runes';
import { PersonalConfig } from '../../PersonalConfig.js';
import styles from './IndexStyle';

const MusicPlayerScreen = ({ route }) => {
  const { title, song } = route.params;

  // const { position, duration } = useTrackPlayerProgress(100)
  // const progress = TrackPlayer.useTrackPlayerProgress();
  const [buttonPlay, setButtonPlay] = useState("pause")
  const [idTrack, setIdTrack] = useState("")
  const [musicTheme, setMusicTheme] = useState({ id: "", url: "", title: "", duration: 0 })
  //const [count,setCount] = useState({value:0,state:0})
  //const [dateTouch,setDateTouch] = useState(null)
  let date;
  let count = 0;
  let timer;
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

      console.log("Mi URL ", `${PersonalConfig.url}/musica/escuchar?url=${encodeURI(song)}`);

      await TrackPlayer.add({
        id: 1,
        url: `${PersonalConfig.url}/musica/escuchar?url=${encodeURI(song)}`,
        title: title
      });
      await TrackPlayer.play();
      setMusicTheme({ ...musicTheme, title: title })
    };

    setPlayer();

    return (() => {
      TrackPlayer.destroy();
    })
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        TrackPlayer.destroy();
      };
    }, []));

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
    console.log("next track")
    TrackPlayer.skipToNext();
    TrackActual()
  }

  const prevTrack = () => {
    console.log("previous track")
    // TrackPlayer.skipToPrevious()
    // TrackActual()
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

  // const setPositionTrack = (e) => {
  //   TrackPlayer.seekTo(e)
  // }

  const TrackActual = () => {
    TrackPlayer.getCurrentTrack().then(
      (res) => { getIdTrack(res) }
    )
  }

  const touchScreen = () => {
    if (count == 0) {
      count += 1
      date = new Date()
      timer = setTimeout(function () { playAndStop() }, 100);
      //console.log("cont init: "+count)
    }
    else {
      let newDate = new Date()
      let diff = date.getTime() - newDate.getTime()
      let dateDiff = diff / 1000
      let diffSecond = Math.abs(dateDiff)
      if (diffSecond <= 1) {
        count += 1
        if (count == 2) {
          clearTimeout(timer);
          timer = setTimeout(function () { nextTrack() }, 100);
        }

        else if (count == 3) {
          clearTimeout(timer);
          timer = setTimeout(function () { prevTrack() }, 100);
          count = 0
        }
        date = newDate
      }
      else {
        count = 1
        timer = setTimeout(function () { playAndStop() }, 100);
        date = new Date()
      }
    }
  }

  const longTouchScreen = () => {
    console.log("toque largo");
  }

  return (
    <>
      <View style={styles.headers}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.iconSearch}>
            <Icon name="search" type='font-awesome' color='black' reverse size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconLibrary}>
            <Text style={styles.library}></Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.screen}>
        <Pressable onLongPress={() => longTouchScreen()} style={styles.screenButton} onPress={() => { touchScreen() }} />
      </View>
      <View style={styles.viewName}>
        <View style={styles.name}>
          <Text style={styles.nameMusic}>{runes.substr(musicTheme.title !== "" ? musicTheme.title : title, 0, 18)}</Text>
        </View>
      </View>
      <View style={styles.musicPlayer}>
        <View style={styles.contSlider}>
          <View style={styles.musicButtons}>
            <TouchableOpacity style={styles.prevButton} onPress={() => prevTrack()}>
              <Icon name="backward" type='font-awesome' color='#03902D' reverse size={50} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={() => playAndStop()}>
              <Icon name={buttonPlay} id="iconPlay" type='font-awesome' color='black' reverse size={60} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => nextTrack()}>
              <Icon name="forward" type='font-awesome' color='#9E00B4' reverse size={50} />
            </TouchableOpacity>
          </View>
          {/* <Slider
            style={styles.slider}
            minimumValue={0}
            step={1}
            maximumValue={duration}
            value={position}
            // onValueChange={(res) => setPositionTrack(res)}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#C3C3C3"
            trackStyle={{ height: 30, backgroundColor: 'transparent' }}
            thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          /> */}
        </View>
      </View>
    </>
  );
};

export default MusicPlayerScreen;
