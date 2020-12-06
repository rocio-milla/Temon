'use strict';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Option, Select } from "react-native-chooser";
import Dialog from "react-native-dialog";
import { Icon, Slider } from 'react-native-elements';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import runes from 'runes';
import { PersonalConfig } from '../../PersonalConfig.js';
import styles from './IndexStyle';

var SQLite = require('react-native-sqlite-storage')

var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~sqliteexample.db' })

const temonApiFileUrl = `${PersonalConfig.url}/musica/escuchar?url=`;

const MusicPlayerScreen = ({ route }) => {
  const navigation = useNavigation()

  const { results, title, song } = route.params;
  const { position, duration } = useTrackPlayerProgress(200);
  const [first,setFirst] = useState("");
  const [last,setLast] = useState("");
  const [buttonPlay, setButtonPlay] = useState("pause");
  const [idTrack, setIdTrack] = useState("");
  const [musicTheme, setMusicTheme] = useState({ id: "", url: "", title: "", duration: 0 });
  const [count, setCount] = useState(0);
  const [touchState, setTouchState] = useState({ state1: 0, state2: 0 });
  const [visible, setVisible] = useState(false);
  const [listPlaylist, setListPlaylist] = useState([]);
  const [defaultPlaylist, setDefaultPlaylist] = useState();
  const [defaultColour, setDefaultColour] = useState();
  const [swipeState, setSwipeState] = useState(0);
  const [gestureName, setGestureName] = useState("none");
  const [enFavoritos, setEnFavoritos] = useState(false);

  let playerReady = false;
  useEffect(() => {
    const setPlayer = async () => {
      if (!playerReady) {
        await TrackPlayer.setupPlayer();

        TrackPlayer.updateOptions({
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
      for (let i = 0; i < res.length; i++) {
        if (song == res[i].url) {
          idActualTrack = "" + i + ""
        }

        await TrackPlayer.add({
          id: "" + i + "",
          url: `${PersonalConfig.url}/musica/escuchar?url=${encodeURI(res[i].url)}`,
          title: res[i].video
        });
      }
      setLast(res[res.length-1].url)
      setFirst(res[0].url)
      TrackPlayer.addEventListener('playback-track-changed', () => {
        TrackActual()
      });
      await TrackPlayer.skip(idActualTrack)
      await TrackPlayer.play();
      setMusicTheme({ ...musicTheme, url: song, title: title })
    }
    setPlayer();
    setSwipeState(0)
    setCount(0)
    setButtonPlay("pause")
    setTouchState(0)
    setGestureName("none")
    return (() => {
      TrackPlayer.destroy();
    })
  }, []);

  useEffect(() => {
    if (touchState == 0) {
    }
    else if (touchState >= 1 && touchState <= 2) {
      let incremental = position
      TrackPlayer.setVolume(0)
      TrackPlayer.play()
      let adelantar = duration * 0.025
      incremental = incremental + adelantar
      const timer = setTimeout(() => {
        setCount(1)
      }, 200);
      const interval = setInterval(() => {
        if (touchState == 1) {
          incremental = incremental - adelantar
          if(incremental<=0){
            incremental=0
            TrackPlayer.seekTo(incremental)
          }else{
            TrackPlayer.seekTo(incremental)
          }
        }
        else if (touchState == 2) {
          incremental = incremental + adelantar
          TrackPlayer.seekTo(incremental)
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
    else if (touchState == 3) {
      if (count == 0) {
        playAndStop()
      }
      else {
        setCount(0)
      }
    }
    else {

    }
  }, [touchState])

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        TrackPlayer.destroy();
      };
    }, []));

  /*comienzo swipe*/

  let cancelOut = 0
  const onSwipeLeft = (gestureState) => {
    cancelOut = 1
    prevTrack()
  }

  const onSwipeRight = (gestureState) => {
    cancelOut = 1
    nextTrack()
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
    gestoIsClickThreshold: 10
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
    if(musicTheme.url != last){
      TrackPlayer.skipToNext();
      TrackActual()
    }
  }

  const prevTrack = () => {
    if(musicTheme.url != first){
      TrackPlayer.skipToPrevious()
      TrackActual()
    }
  }

  let updateTheme = (res) => {
    setMusicTheme({
      id: res.id,
      url: res.url.substring(temonApiFileUrl.length),
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
  }

  const pressOutLeft = () => {
    if (cancelOut == 0) {
      setTouchState(3)
    }
    else {
      setTouchState(4)
      cancelOut = 0
    }
  }

  const pressInRight = () => {
    setTouchState(2)
  }

  const pressOutRight = () => {
    if (cancelOut == 0) {
      setTouchState(3)
    }
    else {
      setTouchState(4)
      cancelOut = 0
    }
  }

  const library = () => {
    navigation.navigate('Library');
  };

  const home = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~sqliteexample.db' });
    db.transaction(tx => {
      
      tx.executeSql('SELECT 1 FROM favoritos WHERE url=?', [musicTheme.url], (_, results) => {
        setEnFavoritos(results.rows.length > 0);
      });
    });

    if(musicTheme.url!="" || musicTheme.title!=""){
      db.transaction(tx => {
        tx.executeSql(
          'INSERT OR IGNORE INTO historial (url, title) values (?, ?)',
          [musicTheme.url, musicTheme.title],
          (_, results) => results,
          (_, error) => {
            console.log(error.code);
            console.log(error.message);
        });
      });
    }

  }, [musicTheme]);

  const agregarAFavoritos = () => {
    if (!enFavoritos) {
      var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~sqliteexample.db' })
      db.transaction(tx => {
        tx.executeSql(
          'INSERT OR IGNORE INTO favoritos (url, title) values (?, ?)',
          [musicTheme.url, musicTheme.title],
          (_, results) => setEnFavoritos(true),
          (_, error) => {
            console.log(error.code);
            console.log(error.message);
          });
      });
    }
  };

  const quitarDeFavoritos = () => {
    if (enFavoritos) {
      var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~sqliteexample.db' })
      db.transaction(tx => {
        tx.executeSql('DELETE FROM favoritos WHERE url=?',
          [musicTheme.url],
          () => setEnFavoritos(false),
          (_, error) => {
            console.log(error.code);
            console.log(error.message);
          });
      });
    }
  }

  //-------modal---------//
  const showDialog = () => {

    db.transaction(tx => {

      //---------listar playlists----------//
      tx.executeSql('SELECT * from playlist', [], (tx, results) => {

        var len = results.rows.length;

        let elements = [];
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            elements.push(results.rows.item(i));
          }
          setListPlaylist(elements)
          setDefaultPlaylist(elements[0].name)
          setDefaultColour(elements[0].colour)
        }

        if (len == 0) {
          let elements = [];
          setListPlaylist(elements)
          setDefaultPlaylist(null)
          setDefaultColour(null)
        }
      });

    });
    setVisible(true)

  };

  const hideDialog = () => {

    setVisible(false)
  };
  //----------------//

  const onSelect = (item) => {
    setDefaultPlaylist(item.name)
    setDefaultColour(item.colour)
  }
  /*useEffect(() => {
    
  
    db.transaction(tx => {
  
      //---------listar playlists----------//
      tx.executeSql('SELECT * from playlist', [], (tx, results) => {
         var len = results.rows.length;
  
         let elements = [];
  
           for (let i = 0; i < len; i++) {
             elements.push(results.rows.item(i));
           }
           setListPlaylist(elements)
           console.log("playlists cargadas:"+status)
  
  
           if(status==true){
        setDefaultPlaylist(elements[0].name)
          setDefaultColour(elements[0].colour)}
  
          setStatus(false)
    
       });
  
    });
  
    
    }, [listPlaylist]);*/


  const addToPlaylist = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT OR IGNORE INTO song (url,title,namePlaylist,colour) VALUES (?,?,?,?)',
        [song, title, defaultPlaylist, defaultColour],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('cancion insertada');
          } else {
            console.log('cancion no insertada');
          }
        }
      );
    });
    setVisible(false)
  };

  return (
    <>
      <View style={styles.headers}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.iconHead} onPress= {()=>home()} >
          <Icon
                name='home'
                type='ionicon'
                color='#ffffff'
                size={80}
              />
          </TouchableOpacity>
          {!enFavoritos ?
            <TouchableOpacity style={styles.iconHead} 
            onPress={() => agregarAFavoritos()} >
              <Icon
                name='heart'
                type='ionicon'
                color='#1b7701'
                size={80}
              />
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.iconHead}
              onPress={() => quitarDeFavoritos()} >
              <Icon
                name='heart-dislike'
                type='ionicon'
                color='#a646dd'
                size={80}
              />
            </TouchableOpacity>
          }
          <TouchableOpacity style={styles.iconHead} 
            onPress={showDialog}>
            <Icon
              name='add-circle'
              type='ionicon'
              color='#C74E08'
              size={80}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconHead} onPress={() => library()}>
          <Icon
              name='book'
              type='ionicon'
              color='#0B797E'
              size={80}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.screen}>
        <GestureRecognizer
          onSwipeRight={(state) => { onSwipeLeft(state) }}
          onTouchStart={() => { pressInLeft() }}
          onTouchEnd={() => { pressOutLeft() }}
          config={config}
          style={styles.gestureRecognizer1}
        >
        </GestureRecognizer>
        <GestureRecognizer
          onSwipeLeft={(state) => { onSwipeRight(state) }}
          onTouchStart={() => { pressInRight() }}
          onTouchEnd={() => { pressOutRight() }}
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
        <Dialog.Container visible={visible}  >
          <Dialog.Title style={{ fontSize: 38, fontWeight: "bold" }}>PLAYLIST</Dialog.Title>
          <Select
            onSelect={onSelect.bind(this)}
            defaultText={defaultPlaylist}
            style={{ borderWidth: 1, backgroundColor: defaultColour, width: 300 }}
            textStyle={{ fontSize: 38, fontWeight: "bold", color: "white" }}
            backdropStyle={{ backgroundColor: "#d3d5d6" }}
            optionListStyle={{ backgroundColor: "#F5FCFF", width: '100%', height: '100%' }}
          >
            {listPlaylist.map((item, i) => (
              <Option style={{ backgroundColor: item.colour, height: 80 }} value={item} key={i}>
                <Text style={{ fontSize: 38, color: 'white', fontWeight: "bold" }} >
                  {item.name}
                </Text>
              </Option>))}
          </Select>
          <Dialog.Button style={{ marginRight: 25, fontSize: 25, fontWeight: "bold" }} label="AGREGAR" onPress={addToPlaylist} />
          <Dialog.Button style={{ margin: 0, fontSize: 25, fontWeight: "bold" }} label="CANCELAR" onPress={hideDialog} />
        </Dialog.Container>
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
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
          />}
        </View>
      </View>
    </>
  );
};

export default MusicPlayerScreen;
