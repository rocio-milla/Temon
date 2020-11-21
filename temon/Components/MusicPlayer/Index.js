import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Slider } from 'react-native-elements';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import runes from 'runes';
import { PersonalConfig } from '../../PersonalConfig.js';
import styles from './IndexStyle';
import {useNavigation } from '@react-navigation/native' 
import Dialog from "react-native-dialog";
import {Select, Option} from "react-native-chooser";
import { set } from 'lodash';


var SQLite = require('react-native-sqlite-storage')

var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~sqliteexample.db'})

const MusicPlayerScreen = ({ route }) => {
  const navigation = useNavigation()

  const { results ,title, song } = route.params;
  const { position, duration } = useTrackPlayerProgress(100)
  // const progress = TrackPlayer.useTrackPlayerProgress();
  const [buttonPlay, setButtonPlay] = useState("pause")
  const [idTrack, setIdTrack] = useState("")
  const [musicTheme, setMusicTheme] = useState({ id: "", url: "", title: "", duration: 0 })
  const [count, setCount] = useState(0)
  const [dateTouch,setDateTouch] = useState(null)
  const [increment,setIncrement] = useState(0)
  const [touchState,setTouchState] = useState({state1: 0,state2: 0})
  const [visible, setVisible] = useState(false);
  const [listPlaylist, setListPlaylist] = useState([]);
  const [defaultPlaylist, setDefaultPlaylist] = useState();
  const [defaultColour, setDefaultColour] = useState();
//  const [status, setStatus] = useState(true);

  //const [count,setCount] = useState({value:0,state:0})
  //const [dateTouch,setDateTouch] = useState(null)
  let date;
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
      let res = [];
      res = results;
      //let urls = "https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-8.mp3" 
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
    setIncrement(null)
    setDateTouch(null)
    setCount(0)
    setButtonPlay("pause")
    setTouchState(0)

    return (() => {
      TrackPlayer.destroy();
    })
  }, [])

  useEffect(()=>{
    //hold touch
    if(touchState==5){
      let posi=0,incrementable=0; 
      const interval = setInterval(() => {
        incrementable+=3
        if(increment!=null){
          TrackPlayer.setVolume(0)
          TrackPlayer.play()
        }
        if(increment == true){
          posi = position + incrementable
          TrackPlayer.seekTo(posi)
          //playAndStop()
        }
        else if(increment == false){
          posi = position - incrementable
          TrackPlayer.seekTo(posi)
          //playAndStop()
        } 
      }, 250);
      return () => {
        if(increment!=null){
          clearInterval(interval)
          TrackPlayer.seekTo(posi)
          if(buttonPlay=="play"){
            TrackPlayer.pause()
            TrackPlayer.setVolume(1)
          }
          else{
            TrackPlayer.pause()
            TrackPlayer.setVolume(1)
            TrackPlayer.play()
          }
          setIncrement(null)
          // TrackPlayer.getPosition().then((res)=>{console.log("pos-actual => "+ res)});
          //TrackPlayer.play()
        }else{
          clearInterval(interval)   
        }
      };
    }
    //1 touch
    const makeADifference = () => {    
      let newDate = new Date();
      let diff = dateTouch.getTime() - newDate.getTime();
      let dateDiff = diff / 1000;
      let diffSecond = Math.abs(dateDiff);
      return diffSecond;
    }

    if(touchState==0){
    }
    else if(touchState==1){
      const timer = setTimeout(() => {
        playAndStop()
        setIncrement(null)
      }, 500);
      setCount(1)
      setIncrement(true)
      return () => clearTimeout(timer);
    }
    else if(touchState==2){
      if(makeADifference()<=0.500){
        const timer = setTimeout(() => {
          nextTrack()
          setIncrement(null)
        }, 500);
        setCount(3)
        setIncrement(false)
        setDateTouch(new Date)
        return () => clearTimeout(timer);
      }
      else{
        const timer = setTimeout(() => {
          playAndStop()
          setIncrement(null)
        }, 500);
        setCount(2)
        setIncrement(true)
        setDateTouch(new Date)
        return () => clearTimeout(timer);
      } 
    }
    else if(touchState==3){
      if(makeADifference()<=0.500){
        const timer = setTimeout(() => {
          nextTrack()
          setIncrement(null)
        }, 500)
        setCount(3)
        setIncrement(false)
        setDateTouch(new Date)
        return () => clearTimeout(timer);
      }
      else{
        const timer = setTimeout(() => {
          playAndStop()
          setIncrement(null)
        }, 500)
        setCount(1)
        setIncrement(true)
        setDateTouch(new Date)
        return () => clearTimeout(timer);
      }
    }
    else if(touchState==4){
      if(makeADifference()<=0.500){
        const timer = setTimeout(() => {
          prevTrack()
          setIncrement(null)
        }, 500)
        setCount(1)
        setIncrement(false)
        setDateTouch(new Date)
        return () => clearTimeout(timer);
      }
      else{
        const timer = setTimeout(() => {
          playAndStop()
        }, 500)
        setCount(1)
        setIncrement(true)
        setDateTouch(new Date)
        return () => clearTimeout(timer);
      }
    }
  },[touchState])

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

  // const setPositionTrack = (e) => {
  //   TrackPlayer.seekTo(e)
  // }

  const TrackActual = () => {
    TrackPlayer.getCurrentTrack().then(
      (res) => { getIdTrack(res) }
    )
  }

  const touchScreen = () => {
    if(count == 0){
      setDateTouch(new Date)
      setTouchState(1)
    }
    else if(count == 1){
      
      setTouchState(2)
    }
    else if(count == 2){
      setTouchState(3)
    }
    else if(count == 3){
      setTouchState(4)
    }
  }

  let pressOutCancel = 0
  let pressCancel = 0
  
  const _pressIn = (res) => {
    setTouchState(5) 
  }
  
  const _pressOut = (res) => {
    if(pressOutCancel==0){
      setTouchState(6) 
      pressCancel=1
    }
    else{
      pressOutCancel=0
    }
  }
  
  const _press = (res) => {
    if(pressCancel == 1){
      pressCancel = 0
    }
    else{
      setTouchState(6)
      pressOutCancel = 1
      touchScreen()
    }
  }

  const library = () => {
    navigation.navigate('Library');
  };


   //-------modal---------//
   const showDialog = () => {

   db.transaction(tx => {

    //---------listar playlists----------//
    tx.executeSql('SELECT * from playlist', [], (tx, results) => {

      var len = results.rows.length;

      let elements = [];

        for (let i = 0; i < len; i++) {
          elements.push(results.rows.item(i));
        }
        setListPlaylist(elements)
        console.log("playlists cargadas:")

          console.log("--------------------")
          console.log("nombre"+elements[0].name)
          console.log("color"+elements[0].colour)
       setDefaultPlaylist(elements[0].name)
       setDefaultColour(elements[0].colour)

    });

  });
  setVisible(true)

};
 
const hideDialog = () => {
    
  setVisible(false)
};
//----------------//

const onSelect = (item) => {

  console.log("nombre: "+ item.name)
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

    console.log(song+"---"+title+"---"+defaultPlaylist+"---"+defaultColour)
    
    db.transaction(tx => {

      tx.executeSql(        
        'INSERT OR IGNORE INTO song (url,title,namePlaylist,colour) VALUES (?,?,?,?)',
        [song,title,defaultPlaylist,defaultColour],
        (tx, results) => {               
          if (results.rowsAffected > 0 ) {
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
          <TouchableOpacity style={styles.iconSearch}>
            <Icon name="search" type='font-awesome' color='black' reverse size={40} />
          </TouchableOpacity>

          <TouchableOpacity  onPress={showDialog}>
          <Icon style = {{ marginLeft:70} }
                        name='plus'
                        type='evilicon'
                        color='orange'
                        size={100}
                  
                        />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconLibrary} onPress={() => library()}>
            <Text style={styles.library}></Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <View style={styles.screen}>
        <Pressable 
          onPressIn={(res)=>{_pressIn()}}
          onPressOut={(res)=>{_pressOut()}}
          onPress={(res)=>{_press()}}
          style={styles.screenButton}
        />
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

           <Dialog.Title style = {{fontSize:38 , fontWeight: "bold"}}>PLAYLIST</Dialog.Title>

          <Select
                      onSelect = {onSelect.bind(this)}
                      defaultText  = {defaultPlaylist}
                      style = {{borderWidth : 1,backgroundColor:defaultColour,width:300}}
                      textStyle = {{fontSize:38,fontWeight: "bold",color:"white"}}
                      backdropStyle  = {{backgroundColor : "#d3d5d6"}}
                      optionListStyle = {{backgroundColor : "#F5FCFF",width:250,height:250}}
                    >
                {listPlaylist.map(item => (
                  
                <Option  style = {{backgroundColor :item.colour ,height:80}} value = {item}>
                  <Text style = {{fontSize:38,color:'white',fontWeight: "bold"}} >
                  {item.name}
                  </Text>
                </Option> ))}
          </Select>

            <Dialog.Button style = {{marginRight:25,fontSize:25 , fontWeight: "bold"}} label="AGREGAR" onPress={addToPlaylist} />
            <Dialog.Button style = {{margin:0,fontSize:25 , fontWeight: "bold"}} label="CANCELAR" onPress={hideDialog}  />

        </Dialog.Container>


          <View style={styles.contSlider}>
          {<Slider
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
          /> }
        </View>


      </View>
    </>
  );
};

export default MusicPlayerScreen;
