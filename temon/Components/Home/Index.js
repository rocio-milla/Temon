import React from 'react';
import {
    Image,
    Text, View
} from 'react-native';
import { Button, Icon} from 'react-native-elements';
import LiveAudioStream from 'react-native-live-audio-stream';
import { Buffer } from 'buffer';

const HomeScreen = ({ navigation }) => {

  iniciarGrabacion = () => {

const options = {
    sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only (see below)
  };

  LiveAudioStream.init(options);

    console.warn("iniciar")
    
    LiveAudioStream.start();

   LiveAudioStream.on('data', data => {
        var chunk = Buffer.from(data, 'base64');

        console.warn(chunk);
      });

}

detenerGrabacion = () => {  

    console.warn("parar")
    LiveAudioStream.stop();

}

    return (

        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../images/index.jpg')}
                    style={{ height: "100%", width: "100%", resizeMode: 'contain' }} />
            </View>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Icon
                    name="microphone"
                    type='font-awesome'
                    color='#a646dd'
                    size={75}
                    reverse
                    onPress={this.iniciarGrabacion} 
                />
                <Icon
                    name="stop-circle"
                    type='font-awesome'
                    color='#a646dd'
                    size={150}
                    onPress={this.detenerGrabacion} 
                />
            </View>
        </>
    );
}

export default HomeScreen;