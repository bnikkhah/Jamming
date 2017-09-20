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
		this.test = this.test.bind(this);
	}

	search(){
		this.props.onSearch(this.state.term);
	}

	handleTermChange(e){
		this.setState({
			term: e.target.value
		});
	}

	test(e){
		Spotify.getAccessToken();
	}

	render(){
		return (
			<div className="SearchBar">
				<input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onClick={this.test} autoFocus/>
				<a onClick={this.search}>SEARCH</a>
			</div>
		);
	}
}

export default SearchBar;