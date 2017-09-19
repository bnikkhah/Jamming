import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar'
import SearchResults from './Components/SearchResults/SearchResults'
import Playlist from './Components/Playlist/Playlist'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'a',
          artist: 'b',
          album: 'c'
        }
      ],
      playlistName: 'myPlaylist',
      playlistTracks: [
        {
          name: 'a3',
          artist: 'b3',
          album: 'c3'
        },
        {
          name: 'a4',
          artist: 'b4',
          album: 'z4'
        }
      ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  addTrack(track){
    let tracks = this.state.playlistTracks;
    let searchResults = this.state.searchResults;
    searchResults.splice(searchResults.indexOf(track), 1);
    tracks.push(track);
    console.log(tracks);
    this.setState({
      playlistTracks: tracks,
      searchResults: searchResults
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
    /*const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });*/
  }

  search(term){
    console.log("Searching for:", term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack} 
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;