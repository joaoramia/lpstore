import React from 'react';

const Video = React.createClass({

	render: function() {
		let videofound;

		if(this.props.videourl){
			videofound = <div>
				<h5>Selected song:</h5>
				<video id='video' controls>
					<source src={this.props.videourl} type="video/mp4">
					</source>
				</video>
			</div>
		}
		else {
			videofound = <p id='no-video'>No video available</p>
		}
		return (
			<div id='video'>
				{videofound}
			</div>
		)
	}
});

export default Video;