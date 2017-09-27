import React from 'react';
import './Track.css';
import MappleToolTip from 'reactjs-mappletooltip';

class Track extends React.Component{
	constructor(props){
		super(props);

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.previewSample = this.previewSample.bind(this);
	}

	previewSample(e){
		this.props.onPreview(this.props.track.id);
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
			<div>
				<MappleToolTip direction={'right'} fadeInAnimation={true} padding={'0'}>
					<div className="Track">
						<div className="Track-information">
							<h3>{this.props.track.name}</h3>
							<p>{this.props.track.artist} | {this.props.track.album}</p>
							<a id="playPreview" onClick={this.previewSample}>Preview</a>
						</div>
						{this.renderAction()}
					</div>
					<div>
						<img src={this.props.track.image} alt={this.props.track.image}/>
					</div>
				</MappleToolTip>
			</div>
		);
	}
}

export default Track;