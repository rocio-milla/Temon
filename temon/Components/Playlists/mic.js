// import Voice
import Voice from '@react-native-community/voice';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  TouchableOpacity, View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Sound from 'react-native-sound';
import { PersonalConfig } from '../../PersonalConfig.js';

const Mic = ({setResults}) => {

  const [error, setError] = useState('');
  const onSpeechError = (e) => {
    //Invoked when an error occurs.
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    setResults(e.value[0]);

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

      };
    }, []));


  return (
    <>

        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity
            onPressIn={async () => {
 
              await startRecognizing();
            }}
             onPressOut={async () => await stopRecognizing()}>
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

export default Mic;