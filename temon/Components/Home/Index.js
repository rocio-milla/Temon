import React, { useEffect, useState } from 'react';
import {
    Image,
    TouchableOpacity, View
} from 'react-native';
import { Icon } from 'react-native-elements';
import LiveAudioStream from 'react-native-live-audio-stream';
import { Buffer } from 'buffer';

const startRecording = (setValue) => {

    LiveAudioStream.start();

    LiveAudioStream.on('data', data => {
        // var chunk = Buffer.from(data, 'base64');
        setValue(data)
    });
}

const stopRecording = (value, setResultFetch) => {
    console.log(value.toString())
    LiveAudioStream.stop();
    fetch('https://77zrf57v5k.execute-api.us-east-1.amazonaws.com/default/solante-transcribe', {
        method: 'POST', // or 'PUT'
        headers: {
            'x-api-key': 'taGJN51Ylz8PHK6Sfp96J2BUCnCL02rK5IlWvd2N',
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json'
            "Content-Type": "application/octet-stream"
        },
        body: value
    })
        .then(response => { return response.json() })
        .then(data => setResultFetch(data))
        .catch(error => {
            setResultFetch(null)
            console.error(error)
        });
}

const HomeScreen = ({ navigation }) => {

    const [value, setValue] = useState();
    const [resultFetch, setResultFetch] = useState(null);
    const options = {
        sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
        channels: 1,        // 1 or 2, default 1
        bitsPerSample: 16,  // 8 or 16, default 16
        audioSource: 6,     // android only (see below)
    };

    useEffect(() => {
        LiveAudioStream.init(options);
    }, [options])

    useEffect(() => {
        if (resultFetch !== null) {
            //Si resultFetch cambió y tiene algo dentro, hago lo que corresponda.
            console.log(`Resultado del fetch: ${resultFetch}`)
        }

        return () => {
            setResultFetch(null)
        }
    }, [resultFetch])

    return (

        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../images/index.jpg')}
                    style={{ height: "100%", width: "100%", resizeMode: 'contain' }} />
            </View>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>

                <TouchableOpacity
                    onPressIn={() => startRecording(setValue)} onPressOut={() => stopRecording(value, setResultFetch)}>
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