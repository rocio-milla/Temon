import { PersonalConfig } from '../PersonalConfig.js';

export async function GetArtistByGenre(genreName, navigation) {
	let artistResult = [];

	await fetch(`${PersonalConfig.url}/musica/genero?genre=${genreName}`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		},
	})
		.then(response => { return response.json() })
		.then(artistsResponse => {
			artistsResponse.map(artist => {
				artistResult.push({
					Name: artist,
					onTouchAction: async () => {
						const bodyToSend = {
							cancion: artist
						}

						await fetch(`${PersonalConfig.url}/musica/buscar`, {
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
								console.log("Hubo un error en obtener el audio desde el backend", error)
							});
					}
				})
			});
		})
		.catch((error) => {
			console.log("Hubo un error en GetArtistByGenre", error)
		});


	return artistResult;
}

export async function GetGenres(navigation) {
	let genresResult = [];
	await fetch(`${PersonalConfig.url}/musica/explorar`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	})
		.then(response => { return response.json() })
		.then(genresResponse => {
			genresResponse.map(genre => {
				genresResult.push({
					Name: genre,
					onTouchAction: async () => {
						const artists = await GetArtistByGenre(genre, navigation);
						navigation.navigate('GenreListSongs', {
							genreListSongs: artists,
						});
					}
				})
			});
		})
		.catch((error) => {
			console.log("Hubo un error en GetGenres", error)
		});

	return genresResult;
}