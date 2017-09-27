import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar'
import SearchResults from './Components/SearchResults/SearchResults'
import Playlist from './Components/Playlist/Playlist'
import Spotify from './util/Spotify'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      loading: false,
      audio: null,
      id: ''
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.previewSample = this.previewSample.bind(this);
  };

  previewSample(trackID){
    if (trackID === this.state.id && !this.state.audio.paused){
      this.state.audio.pause();
      return;
    }else{
      if (this.state.audio != null && trackID !== this.state.id){
        this.state.audio.pause();
      }else{
        if (this.state.audio != null){
          this.state.audio.play();
          return;
        }
      }
    }
    Spotify.previewSample(trackID).then(previewURL => {
      if (previewURL === null){
        alert("Sorry, but there is no preview for this track.");
        return;
      }else{
        let audio = new Audio(previewURL);
        audio.play();

        this.setState({
          audio: audio,
          id: trackID
        })
      }
    });
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (!tracks.includes(track)){
      tracks.push(track);
    }
    this.setState({
      playlistTracks: tracks
    });
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks.splice(tracks.indexOf(track), 1);
    this.setState({
      playlistTracks: tracks
    });
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    });
  }

  savePlaylist(){
    if (this.state.playlistTracks.length === 0){
      return;
    }

    this.setState({
      loading: true
    });

    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistTracks: [],
        loading: false
      });
      document.getElementById('playlistName').value = "New Playlist";
    });
  }

  search(term){
    if (!term){
      return;
    }
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onPreview={this.previewSample}/>
            <Playlist playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack} 
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
                      loader={this.state.loading}
                      onPreview={this.previewSample}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;