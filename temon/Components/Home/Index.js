// import Voice
import Voice from '@react-native-community/voice';
import React, { useEffect, useState } from 'react';
import {
  Image,
  TouchableOpacity, View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { PersonalConfig } from '../../PersonalConfig.js';

const HomeScreen = ({ navigation }) => {

  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    setStarted('√');
  };

  const onSpeechEnd = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    setEnd('√');
  };

  const onSpeechError = (e) => {
    //Invoked when an error occurs.
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    setResults(e.value);
  };

  const onSpeechPartialResults = (e) => {
    //Invoked when any results are computed
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('es-US');
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
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

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  useEffect(() => {
    return (() => {
      destroyRecognizer();
    })
  }, [])

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
        .then(response => response.json())
        .then(results => {
          navigation.navigate('Results', {
            results: results.responseArray,
          });
        })
        .catch((error) => {
          console.log("Hubo un error ", error)
        });

    }
  }, [results])


  return (

    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../../images/index.jpg')}
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
  );
}

export default HomeScreen;