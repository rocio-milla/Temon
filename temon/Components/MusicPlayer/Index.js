import React, { useEffect, useState, useRef } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import { Button, Icon, Slider } from 'react-native-elements';
import TrackPlayer, { getPosition, getTrack, pause, play, useTrackPlayerProgress, TrackPlayerEvents, Capability } from 'react-native-track-player';
import styles from './IndexStyle'
import { PersonalConfig } from '../../PersonalConfig.js';

const track = {
  id: "1",
  url: "https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-8.mp3",
  title: "Harder, Better, Faster, Stronger",
  artist: "Daft Punk"
}

const track2 = {
  id: "2",
  url: "https://cdns-preview-0.dzcdn.net/stream/c-01ef0c4982c94b86c7c0e6b2a70dde4b-7.mp3",
  title: "Digital Love",
  artist: "Daft Punk"
}

const track3 = {
  id: "3",
  url: "https://cdns-preview-8.dzcdn.net/stream/c-83ff26e7b23e7a7a248f3392d04f2fed-3.mp3",
  title: "Pillar Of Fire",
  artist: "Tony Levin"
}

TrackPlayer.setupPlayer().then(async () => {
  TrackPlayer.updateOptions({
    alwaysPauseOnInterruption: true,
    waitForBuffer: true,
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SEEK_TO,
      TrackPlayer.CAPABILITY_JUMP_FORWARD,
      TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      TrackPlayer.CAPABILITY_SEEK_TO,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
  });
  await TrackPlayer.add([track, track2, track3]);
});


let date;
let count = 0;
let timer;

const MusicPlayerScreen = ({ route }) => {
  const { title, song } = route.params;

  const { position, bufferedPosition, duration } = useTrackPlayerProgress(100)
  const [buttonPlay, setButtonPlay] = useState("pause")
  const [idTrack, setIdTrack] = useState("")
  const [musicTheme, setMusicTheme] = useState({ id: "", url: "", title: "", duration: 0 })
  const [song2, setSong] = useState();
  //const [count,setCount] = useState({value:0,state:0})
  //const [dateTouch,setDateTouch] = useState(null)


  useEffect(() => {
    TrackPlayer.setupPlayer({}).then(async () => {
    })

    // setButtonPlay("pause")
    // TrackPlayer.play()
    // TrackActual()
    // TrackPlayer.addEventListener("playback-track-changed", () => {
    //   console.log("ahora si")
    //   TrackActual()
    // })
  }, [])

  useEffect(() => {
    if(song2)
      setMusicTheme({ url: URL.createObjectURL(song2), title: title })
  }, [song2])

  useEffect(() => {
    const bodyToSend = {
      url: song
    }
    fetch(`${PersonalConfig.url}/musica/escuchar`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(bodyToSend)
    })
      .then(response => response.blob())
      .then(blob => { setSong(blob) })
      .catch((error) => {
        console.log("Hubo un error ", error)
      });
  }, [])

  let playAndStop = () => {
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

  const touchScreen = () => {
    if (count == 0) {
      count += 1
      date = new Date()
      timer = setTimeout(function () { playAndStop() }, 1000);
      console.log("cont init: " + count)
    }
    else {
      let newDate = new Date()
      let diff = date.getTime() - newDate.getTime()
      let dateDiff = diff / 1000
      let diffSecond = Math.abs(dateDiff)
      if (diffSecond <= 1) {
        count += 1
        console.log("tiempo: " + diffSecond)
        if (count == 2) {
          clearTimeout(timer);
          timer = setTimeout(function () { nextTrack() }, 1000);
        }

        else if (count == 3) {
          clearTimeout(timer);
          timer = setTimeout(function () { prevTrack() }, 1000);
          count = 0
        }
        date = newDate
      }
      else {
        count = 1
        timer = setTimeout(function () { playAndStop() }, 1000);
        date = new Date()
        console.log("teimpo:" + diffSecond)
        console.log("cont: " + count)
      }
    }
  }

  const longTouchScreen = () => {
    var timer = setTimeout(function () { alert("asd") }, 1000);
  }

  return (
    <>
      <View style={styles.headers}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.iconSearch}>
            <Icon name="search" type='font-awesome' color='#fff' size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconLibrary}>
            <Text style={styles.library}></Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.screen}>
        <TouchableOpacity onLongPress={() => longTouchScreen()} style={styles.screenButton} onPress={() => { touchScreen() }}>

        </TouchableOpacity>
      </View>

      <View style={styles.viewName}>
        <View style={styles.name}>
          <Text style={styles.nameMusic}>{musicTheme.title}</Text>
        </View>
      </View>

      <View style={styles.musicPlayer}>

        <View style={styles.contSlider}>
          <View style={styles.musicButtons}>
            <TouchableOpacity style={styles.prevButton} onPress={() => prevTrack()}>
              <Icon name="backward" type='font-awesome' color='#ffffff' size={50} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.playButton} onPress={() => playAndStop()}>
              <Icon name={buttonPlay} id="iconPlay" type='font-awesome' color='#ffffff' size={60} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={() => nextTrack()}>
              <Icon name="forward" type='font-awesome' color='#ffffff' size={50} />
            </TouchableOpacity>
          </View>
          <Slider
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
          />
          <Text>pos:{position},duration:{duration},idTrack{idTrack}</Text>

        </View>
      </View>
    </>
  );
};

export default MusicPlayerScreen;
