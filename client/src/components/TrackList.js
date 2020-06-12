import React, { Component } from 'react'
import {Howl} from "howler";
import {albumImg} from './AlbumCard'
import "../css/tracklist.css";

class TrackCard extends Component{
  constructor(props){
      super(props)
      this.state = {
         sort: [],
         sound: null,
      }
  }

  static aSongPlaying = false;

  handleHover = () => {
      this.aSongPlaying = false;
      if (!this.aSongPlaying) {
        this.state.sound.play();
        this.aSongPlaying = true;
      }
    }

    handleHoverOut = () => {
      this.aSongPlaying = true;
      if (this.aSongPlaying) {
        this.state.sound.stop();
        this.aSongPlaying = false;
      }
    }

    render(){
      this.state.sound = new Howl({
        src: [this.props.data.preview_url],
        html5: true,
        onplayerror: ()=> {this.state.sound.once('unlock', ()=> this.state.sound.play())}
      });

      return(
        <div className='track-list' >
          <li >
            <img style={{width: '60px', height: '60px', verticalAlign:'middle'}} src={albumImg}  onMouseOver={this.handleHover} onMouseOut={this.handleHoverOut}/>
            &emsp;
            {this.props.data.name}
          </li>
        </div>
      )
    }
}


export default TrackCard;
