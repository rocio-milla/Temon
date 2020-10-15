import React from 'react';
import {
    Image,
    Text, View,TouchableOpacity
} from 'react-native';
import { Button, Icon} from 'react-native-elements';
import LiveAudioStream from 'react-native-live-audio-stream';
import { Buffer } from 'buffer';

const HomeScreen = ({ navigation }) => {

    let value ;

    const options = {
        sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
        channels: 1,        // 1 or 2, default 1
        bitsPerSample: 16,  // 8 or 16, default 16
        audioSource: 6,     // android only (see below)
      };
    
      LiveAudioStream.init(options);


    startRecording = () => {

    console.warn("start")
    
    LiveAudioStream.start();

    LiveAudioStream.on('data', data => {
      //  var chunk = Buffer.from(data, 'base64');
        value = data;
        console.warn(value);
      });

}

stopRecording = () => {  

    console.warn("stop")
    LiveAudioStream.stop();

    fetch('https://77zrf57v5k.execute-api.us-east-1.amazonaws.com/default/solante-transcribe', {
        method: 'POST', // or 'PUT'
        headers: {
         'x-api-key': 'taGJN51Ylz8PHK6Sfp96J2BUCnCL02rK5IlWvd2N'
        },
        body: value
      })
  .then(response => response.json())
  .then(data => console.warn(data))
  .catch(error => console.error(error));
}
    return (

        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../images/index.jpg')}
                    style={{ height: "100%", width: "100%", resizeMode: 'contain' }} />
            </View>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
               
             <TouchableOpacity
              onPressIn={this.startRecording}    onPressOut={this.stopRecording}>
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