import React, { Component } from 'react';
import './video.css';

class Video extends Component {

    constructor(props) {
        super(props);
        console.log("video constructor");
        console.log(props);
        this.state = {};
    }
    componentWillMount() {
        console.log("video componentWillMount")
    }

    componentDidMount() {
        console.log("video componentDidMount")
    }

    render() {
        console.log("video render")
        return (
        <div className = "videobox">
            <video controls autoPlay loop src={this.props.contentLink}></video>
        </div>
        );
    }
}

export default Video;