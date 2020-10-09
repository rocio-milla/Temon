import React from 'react';
import {
    Text, View,TouchableOpacity
} from 'react-native';

const ResultsScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={()=>navigation.navigate('MusicPlayer')}>
            <Text>Results</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ResultsScreen;