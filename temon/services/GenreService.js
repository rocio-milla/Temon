import { PersonalConfig } from '../PersonalConfig.js';

export function GetArtistByGenre(genreName, navigation) {
	let artists = [{ Name: "La 25" }, { Name: "Soda Stereo" }];

	// fetch(`${PersonalConfig.url}/generos/${Name}`, {
	// 	method: 'POST',
	// 	headers: {
	// 		"Content-Type": "application/json; charset=utf-8"
	// 	},
	// })
	// 	.then(response => { artists = response.json() })
	// 	.catch((error) => {
	// 		console.log("Hubo un error ", error)
	// 	});

	artists.forEach(artist => artist.onTouchAction = () => {
		const bodyToSend = {
			cancion: artist.Name
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
			});
	});

	return artists;
}

export function GetGenres(navigation) {
	let genres = [{ Name: "Rock" }, { Name: "Jazz" }];
	// fetch(`${PersonalConfig.url}/generos`, {
	// 	method: 'POST',
	// 	headers: {
	// 		"Content-Type": "application/json; charset=utf-8"
	// 	}
	// })
	// 	.then(response => { genres = response.json() })
	// 	.catch((error) => {
	// 		console.log("Hubo un error ", error)
	// 	});

	genres.forEach(genre => genre.onTouchAction = () => {
		const artists = GetArtistByGenre(genre.Name, navigation);
		navigation.navigate('GenreListSongs', {
			genreListSongs: artists,
		});
	});

	return genres;
}