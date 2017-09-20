import React from 'react';
import './SearchBar.css';
import Spotify from '../../util/Spotify';

class SearchBar extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			term: ''
		};

		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.login = this.login.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
	}

	search(){
		this.props.onSearch(this.state.term);
	}

	handleTermChange(e){
		this.setState({
			term: e.target.value
		});
	}

	login(e){
		Spotify.getAccessToken();
	}

	handleEnterKey(e){
		if (e.keyCode === 13){
			document.getElementById('search').click();
		}
	}

	render(){
		return (
			<div className="SearchBar">
				<input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onClick={this.login} onKeyDown={this.handleEnterKey} autoFocus/>
				<a id="search" onClick={this.search}>SEARCH</a>
			</div>
		);
	}
}

export default SearchBar;