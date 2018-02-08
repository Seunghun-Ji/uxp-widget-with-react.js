/**
 * App.js
 * 
 * [설명] index.html의 root div 안에 출력될 내용.
 *        address widget의 요청을 MessageBroker로 받아
 *        video.js의 video들을 변경한다.
 * 
 * @author : Seung-hun Ji
 * @since : 2018-02-08
 */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Video from './component/video';
import MessageBroker from './lib/messageBroker';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { //초기 state는 비어있는 상태
      videos : []
    };
  }
  
  _initialRender = () => { 
    this.setState({ //시작 시, 4개의 비디오 태그를 생성하기 위해 사용
      videos : [null, null, null, null]
    })

    //MessageBroker 객체 생성, 명령 수신 대기
    let msgBroker = new MessageBroker();
    msgBroker.addCommandHandler('From_addr_To_video_Content_address', this._setVideo);
  }

  //widget으로부터 받은 데이터 중 videosrc를 받아 처리
  _setVideo = (_data) => {
    this.setState({
      videos: _data.videosrc
    })
  }
  
  //시작 시, 또는 변화가 있을 때마다 mapping을 통해 video 태그 변경
  _renderViedoList = () => { 
    let result = this.state.videos.map( (_video, _index) => {

      return <Video key={_index} contentLink = {_video}/>
    })
    return result;
  }

  //render 전에 setState로 태그 생성 준비
  componentWillMount() {
    this._initialRender();
  }

  render() {
    return (
      <div className = "App">
      {
        this._renderViedoList()
      }
      </div>
    );
  }
}

export default App;
