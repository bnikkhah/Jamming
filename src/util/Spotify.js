const client_id = '30f47d55a704412885d6969608b9c0dd';
const redirect_uri = 'https://bnikkhah.github.io/Jamming/';
let accessToken;

const Spotify = {
	getAccessToken(){
		if (accessToken){
			return accessToken;
		}

	    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
	    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
	    if (accessTokenMatch && expiresInMatch) {
	      accessToken = accessTokenMatch[1];
	      const expiresIn = Number(expiresInMatch[1]);
	      window.setTimeout(() => accessToken = '', expiresIn * 1000);
	      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
	      return accessToken;
	    } else {
	      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
	      window.location = accessUrl;
	    }
	},
	search(term){
		const accessToken = Spotify.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			return jsonResponse.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}));
		})
	},
	savePlaylist(playlistName, trackURIs){
		if (!playlistName || !trackURIs.length){
			return;
		}

		const accessToken = Spotify.getAccessToken();
		const headers = {
			Authorization: `Bearer ${accessToken}`
		}
		let userID;
		return fetch('https://api.spotify.com/v1/me', { headers: headers }
		).then(response => {
			return response.json();
		}).then(jsonResponse => {
			userID = jsonResponse.id;
			return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({
					name: playlistName
				})
			})
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			const playlistID = jsonResponse.id;
			return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({
					uris: trackURIs
				})
			});
		});
	}
};

export default Spotify;