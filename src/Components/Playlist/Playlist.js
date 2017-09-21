import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component{
	constructor(props){
		super(props);

		/*setTimeout(() => {
			console.log(this.refs.playlistTitle.value);
			this.refs.playlistTitle.value = 'Hello Ben! ♥';
		}, 2000);
		ref="playlistTitle"*/

		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(e){
		this.props.onNameChange(e.target.value);
	}

	render(){
		return (
			<div className="Playlist">
				<input id="playlistName" onChange={this.handleNameChange} defaultValue={'New Playlist'} />
				<TrackList tracks={this.props.playlistTracks} 
				isRemoval={true} 
				onRemove={this.props.onRemove} />
				<a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
		);
	}
}

export default Playlist;