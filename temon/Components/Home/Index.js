import React from 'react';
import {
    Image,
    Text, View
} from 'react-native';
import { Button, Icon, } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
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
                    size={150}
                    reverse
                    onPress={() => navigation.navigate('Results')}
                />
            </View>
        </>
    );
}

export default HomeScreen;