// import Voice
import Voice from '@react-native-community/voice';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	Image,
	Text, TouchableOpacity, View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Sound from 'react-native-sound';
import { PersonalConfig } from '../../PersonalConfig.js';
import { GetGenres } from '../../services/GenreService.js';

const SQLite = require('react-native-sqlite-storage')

const HomeScreen = ({ navigation }) => {

	const [error, setError] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const start_recording = new Sound('start_recording.mp3', Sound.MAIN_BUNDLE);
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
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, [results])

	const getGenreResults = async () => {
		const genreResults = await GetGenres(navigation);

		navigation.navigate('GenreList', {
			genreResults
		});
	};

	const crearTablas = () => {
		var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~sqliteexample.db' });

		const tablaCreada = (nombreTabla) => console.log(`tabla '${nombreTabla}' creada!`);
		const errorCreandoTabla = (error, nombreTabla) => console.log(`ocurrió un error al crear la tabla '${nombreTabla}'`, error);

		db.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS favoritos (url TEXT NOT NULL, title TEXT NOT NULL, primary key(url));',
				[],
				() => tablaCreada('favoritos'),
				(_, error) => errorCreandoTabla(error, 'favoritos')
			);
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS playlist (name TEXT NOT NULL,colour TEXT NOT NULL, PRIMARY KEY(name,colour));',
				[],
				() => tablaCreada('playlist'),
				(_, error) => errorCreandoTabla(error, 'playlist')
			);

			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS song (url text not null,title text,namePlaylist text not null,colour text not null,primary key(url,namePlaylist,colour));',
				[],
				() => tablaCreada('song'),
				(_, error) => errorCreandoTabla(error, 'song')
			);

			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS historial (url text not null,title text,primary key(url));',
				[],
				() => tablaCreada('historial'),
				(_, error) => errorCreandoTabla(error, 'historial')
			);
		});
	};

	const library = () => {
		navigation.navigate('Library');
	};

	useEffect(() => {
		crearTablas();
	}, []);

	return (
		<>
			{!loading ? <>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Image source={require('../../images/logo.png')}
						style={{ height: "84%", width: "100%", resizeMode: 'contain' }} />
				</View>
				<View>
					<TouchableOpacity
						onPress={() => library()}
						style={{
							backgroundColor: "#a646dd",
							paddingHorizontal: 30,
							paddingVertical: 5,
							borderRadius: 10,
							marginLeft: 30,
							marginRight: 30,
							marginBottom: 7,
							marginTop: 7
						}}>

						<Text
							style={{
								fontSize: 30,
								fontWeight: "bold",
								textAlign: 'center',
								color: '#000'
							}}>
							BIBLIOTECA
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={getGenreResults}
						style={{
							backgroundColor: "#1b7701",
							paddingHorizontal: 30,
							paddingVertical: 5,
							borderRadius: 10,
							marginLeft: 30,
							marginRight: 30,
							marginBottom: 7,
							marginTop: 7
						}}>

						<Text
							style={{
								fontSize: 30,
								fontWeight: "bold",
								textAlign: 'center',
								color: '#000'
							}}>
							BUSCAR POR GÉNERO
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
					<TouchableOpacity
						onPressIn={async () => {
							start_recording.play();
							await startRecognizing();
						}}
						onPressOut={async () => await stopRecognizing()}>
						<Icon
							name="microphone"
							type='font-awesome'
							color='#a646dd'
							size={130}
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