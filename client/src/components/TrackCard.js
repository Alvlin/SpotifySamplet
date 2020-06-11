import React, { Component } from 'react'
import {Howl} from "howler";

class TrackCard extends Component{
    constructor(){
        super()
        this.state = {
           sort: [],
           sound: null
        }
    }
    handleHover = () => {
      if (this.state.sound != null) {
          if (!this.state.sound.playing()) {
            console.log('1');
             this.state.sound.play();
          }
      }
    }
    handleHoverOut = () => {
      if (this.state.sound != null) {
          if (!this.state.sound.playing()) {}
          else {
            console.log('2');
            this.state.sound.stop();
            this.state.sound.unload();
          }
      }
    }
    render(){
        let audioClip = [{sound: this.props.data.preview_url}];
        console.log(this.props.data.preview_url);

        this.state.sound = new Howl({
            src: [this.props.data.preview_url],
            html5: true,
            onplayerror: ()=> {this.state.sound.once('unlock', ()=> this.state.sound.play())}
          });

        return(
          <div className='track-card' >
            <img src= {this.props.img.images[1].url}  onMouseOver={this.handleHover} onMouseOut={this.handleHoverOut} />
          </div>
        )
    }
}

export default TrackCard;
