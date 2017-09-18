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
        },
        {
          name: 'a2',
          artist: 'b2',
          album: 'c2'
        },
        {
          name: 'a3',
          artist: 'b3',
          album: 'c3'
        }
      ],
      playlistName: 'myPlaylist',
      playlistTracks: [
        {
          name: 'a',
          artist: 'b',
          album: 'c'
        },
        {
          name: 'a2',
          artist: 'b2',
          album: 'c2'
        },
        {
          name: 'a3',
          artist: 'b3',
          album: 'c3'
        }
      ]
    }
  };

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlist} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
