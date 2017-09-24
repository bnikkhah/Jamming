import React from 'react';
import './Track.css';
//var MappleToolTip = require('reactjs-mappletooltip');
import MappleToolTip from 'reactjs-mappletooltip';

class Track extends React.Component{
	constructor(props){
		super(props);

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}

	addTrack(e){
		this.props.onAdd(this.props.track);
	}

	removeTrack(e){
		this.props.onRemove(this.props.track);
	}

	renderAction(){
		if (this.props.isRemoval){
			return <a className="Track-action" onClick={this.removeTrack}>&#8722;</a>
		}else{
			return <a className="Track-action" onClick={this.addTrack}>&#43;</a>
		}		
	}

	render(){
		return (
			<MappleToolTip direction={'left'} mappleType={'default'} shadow={false} fadeInAnimation={false} padding={'0'} float={false}>
				<div className="Track">
					<div className="Track-information">
						<h3>{this.props.track.name}</h3>
						<p>{this.props.track.artist} | {this.props.track.album}</p>
					</div>
					{this.renderAction()}
				</div>
				<div>
					<img src={this.props.track.image} alt={`${this.props.track.image}`}/>
				</div>
			</MappleToolTip>
		);
	}
}

export default Track;