import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Video from './component/video';
import MessageBroker from './lib/messageBroker';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      videos : []
    };
  }

  _test = (_data) => {
    console.log(this.state);
    console.log(_data.videosrc);
    
    this.setState({
      videos : _data.videosrc
    })
  }

  _initialRender = () => {
    this.setState({
      videos : [null, null, null, null]
    })

    let msgBroker = new MessageBroker();
    msgBroker.addCommandHandler('From_addr_To_video_Content_address', this._test);
  }

  _getViedoSrc = () => {
      console.log("App Set State")
      let bgArray = [];
      let bgVideo = [];
      let bgNum;

      for( let i = 1 ; i <= 10 ; i++ ) {
        bgArray.push(i);
      }

      for( let i = 0 ; i < 4 ; i++ ) {
				bgNum = Math.floor(Math.random() * bgArray.length); //배열의 개수만큼의 범위에서 난수 생성
				let rdm = bgArray.splice(bgNum, 1); //배열 요소를 빼고 빠진 값을 가져온다.
				rdm = rdm.toString(); //해당 숫자를 문자로 변경
				let str = "./video/sample" + rdm + ".mp4"; //sample 동영상 결정
				bgVideo.push({src : str}); //영상 링크 삽입
      }

      console.log("bgVideo List")
      console.log(bgVideo)
      
      this.setState({ //render할 때 변경됨
        videos : bgVideo
      });
      
  }

  _renderViedoList = () => {
    let result = this.state.videos.map( (_video, _index) => {
      console.log("Move to video.js")
      console.log(_video, _index);

      return <Video key={_index} contentLink = {_video}/>
    })
    return result;
  }

  componentWillMount() {
    this._initialRender();
  }

  componentDidMount() {
    // let msgBroker = new MessageBroker();
    // msgBroker.addCommandHandler('From_addr_To_video_Content_address', function(data) {
      
    //   console.log("Got a signal", data);
    //});
  }

  componentDidUpdate() {
    console.log("componentDidUpdate")
  }
  
  render() {
    return (
      <div className = "App" ref="mainDiv" >
      {
        this._renderViedoList()
      }
      </div>
    );
  }
}

export default App;
