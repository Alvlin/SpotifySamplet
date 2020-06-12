import React, { Component } from 'react'
import {Howl} from "howler";


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
          <div className='track-card' >
            <img src= {this.props.img.images[1].url}  onMouseOver={this.handleHover} onMouseOut={this.handleHoverOut} />
            <p> {this.props.data.name}</p>
          </div>
        )
    }
}


export default TrackCard;
