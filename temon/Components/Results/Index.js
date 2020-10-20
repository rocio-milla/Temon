import React from 'react';
import {
    Text, View, TouchableOpacity
} from 'react-native';

const ResultsScreen = ({ route, navigation }) => {
    const { resultados } = route.params;
    console.log(resultados)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('MusicPlayer')}>
                <Text>Results</Text>
                {
                    resultados.map((resultado, i) => {
                        return (<Text index={i}>{resultado.video}</Text>)
                    })
                }
            </TouchableOpacity>
        </View>
    );
}

export default ResultsScreen;