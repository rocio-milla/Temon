// import Voice
import Voice from '@react-native-community/voice';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  TouchableOpacity, View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { PersonalConfig } from '../../PersonalConfig.js';

const HomeScreen = ({ navigation }) => {

  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSpeechError = (e) => {
    //Invoked when an error occurs.
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    setResults(e.value);
    setLoading(true);

  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('es-US');
      setError('');
      setResults([]);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;

      return () => {
        //destroy the process after switching the screen
        Voice.destroy().then(Voice.removeAllListeners);
        setLoading(false);
      };
    }, []));

  useEffect(() => {
    if (results[0]) {
      const bodyToSend = {
        cancion: results[0]
      }
      fetch(`${PersonalConfig.url}/musica/buscar`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(bodyToSend)
      })
        .then(response => { return response.json() })
        .then(results => {
          navigation.navigate('Results', {
            results: results.responseArray,
          });
        })
        .catch((error) => {
          console.log("Hubo un error ", error)
        });

    } else {
      setLoading(false);
    }
  }, [results])

  return (
    <>
      {!loading ? <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../images/logo.png')}
            style={{ height: "100%", width: "100%", resizeMode: 'contain' }} />
        </View>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity
            onPressIn={async () => await startRecognizing()} onPressOut={async () => await stopRecognizing()}>
            <Icon
              name="microphone"
              type='font-awesome'
              color='#a646dd'
              size={150}
              reverse
            />
          </TouchableOpacity>
        </View>
      </>
        :
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: "#a646dd" }}>
          <Icon
            name="microphone"
            type='font-awesome'
            color='white'
            className={"clase"}
            size={150}
          />
        </View>
      }
    </>
  );
}

export default HomeScreen;