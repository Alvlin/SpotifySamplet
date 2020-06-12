import React, { Component } from 'react'
import {Howl} from "howler";
import {albumImg} from './AlbumCard'
import "../css/tracklist.css";

class TrackCard extends Component{
    constructor(){
        super()
        this.state = {
           sort: [],
           sound: null
        }
    }


    handleHover = () => {
      console.log(this.props.data.preview_url);
        if (this.state.sound != null) {
            if (!this.state.sound.playing()) {
              this.state.sound.stop();
              this.state.sound.unload();
              this.state.sound.play();
            }
            else{

              this.state.sound.stop();
              this.state.sound.unload();
            }
        }
      }

      handleHoverOut = () => {
        if (this.state.sound != null) {
            if (!this.state.sound.playing()) {}
            else {
              this.state.sound.stop();
              this.state.sound.unload();
            }
        }
      }

      render(){
        this.state.sound = new Howl({
            src: [this.props.data.preview_url],
            html5: true,
            onplayerror: ()=> {this.state.sound.once('unlock', ()=> this.state.sound.play())}
          });

        return(
          <div className='track-list' onMouseOver={this.handleHover} onMouseOut={this.handleHoverOut}>
            <li >
              <img style={{width: '60px', height: '60px', verticalAlign:'middle'}} src={albumImg}  />
              &emsp;
              {this.props.data.name}
            </li>
          </div>
        )
    }
}


export default TrackCard;
