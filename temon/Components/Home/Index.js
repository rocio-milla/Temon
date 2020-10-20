import React, { useEffect, useState } from 'react';
import {
    Image,
    TouchableOpacity, View
} from 'react-native';
import { Icon } from 'react-native-elements';
import LiveAudioStream from 'react-native-live-audio-stream';
import { Buffer } from 'buffer';

// import Voice
import Voice from '@react-native-community/voice';

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
      console.log('onSpeechStart: ', e);
      setStarted('√');
    };

    const onSpeechEnd = (e) => {
      //Invoked when SpeechRecognizer stops recognition
      console.log('onSpeechEnd: ', e);
      setEnd('√');
    };

    const onSpeechError = (e) => {
      //Invoked when an error occurs.
      console.log('onSpeechError: ', e);
      setError(JSON.stringify(e.error));
    };

    const onSpeechResults = (e) => {
      //Invoked when SpeechRecognizer is finished recognizing
      console.log('onSpeechResults: ', e);
      setResults(e.value);
    };

    const onSpeechPartialResults = (e) => {
      //Invoked when any results are computed
      console.log('onSpeechPartialResults: ', e);
      setPartialResults(e.value);
    };

    const onSpeechVolumeChanged = (e) => {
      //Invoked when pitch that is recognized changed
      console.log('onSpeechVolumeChanged: ', e);
      setPitch(e.value);
    };

    const startRecognizing = async () => {
      //Starts listening for speech for a specific locale
      console.log('audio');
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