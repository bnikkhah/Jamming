import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';
import { RingLoader } from 'react-spinners';

class Playlist extends React.Component{
	constructor(props){
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
	}

	handleNameChange(e){
		this.props.onNameChange(e.target.value);
	}

	handleEnterKey(e){
		if (e.keyCode === 13){
			document.getElementById('save-playlist').click();
		}
	}

	render(){
		return (
			<div className="Playlist">
				<input id="playlistName" onChange={this.handleNameChange} defaultValue={'New Playlist'} onKeyDown={this.handleEnterKey}/>
	            <RingLoader
	              color={'#123abc'} 
	              loading={this.props.loader} 
	            />
				<TrackList tracks={this.props.playlistTracks} 
				isRemoval={true} 
				onRemove={this.props.onRemove} 
				onPreview={this.props.onPreview}/>
				<a id="save-playlist" className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
		);
	}
}

export default Playlist;