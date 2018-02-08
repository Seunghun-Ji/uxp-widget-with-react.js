/**
 * video.js
 * 
 * [설명] App.js의 App div 안에 출력될 내용.
 *       props로 넘어온 contentLink array 수만큼
 *       video 태그를 반환한다.
 * 
 * @author : Seung-hun Ji
 * @since : 2018-02-08
 */

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

    //props 안의 contentLink가 변화할 때마다 새로 render해준다.
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