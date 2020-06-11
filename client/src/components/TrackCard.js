import React, { Component } from 'react'
import {Howl} from "howler";


class TrackCard extends Component{
    constructor(){
        super()
        this.state = {
           sort: [],
           sound: null,
        }
    }


    handleHover = () => {
        if (this.state.sound != null) {
            if (!this.state.sound.playing()){
              this.state.sound.play();
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
          <div className='track-card' >
            <img src= {this.props.img.images[1].url}  onMouseOver={this.handleHover} onMouseOut={this.handleHoverOut} />
            <p> {this.props.data.name}</p>
          </div>
        )
    }
}


export default TrackCard;
