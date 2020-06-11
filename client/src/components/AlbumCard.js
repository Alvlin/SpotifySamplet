import React, { Component } from 'react'
import AlbumTrackCard from './AlbumTrackCard'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import {apiTok} from './../App.js'
import ReactDOM from 'react-dom'
import TrackList from './TrackList'
import "../css/albumcard.css";

let albumImg;
class AlbumCard extends Component {
    constructor(){
        super()
        this.state = {
            isPaneOpen: false,
            isPaneOpenLeft: false
        }
    }

    handleClick = () => {
        console.log(apiTok);
        this.setState({ isPaneOpenLeft: true })
        // console.log('ALBUM TRACKS')
        const id = this.props.data.id
        const baseUrl = 'https://api.spotify.com/v1/albums/'
        const auth_token = 'Bearer ' + apiTok
        let fetchUrl = baseUrl + id + '/tracks?limit=24'
        // let albumTracks;
        fetch(fetchUrl, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': auth_token
            }
        })
        .then(resp => resp.json())
        .then(function(data){
          console.log('asdsadsa',data);
          ReactDOM.render(
            <ul>
              {data.items.map((val) =>
              <TrackList  key={val.id}  data={val}/>)}
            </ul>,
            document.getElementById('album-tracks')
          )


        })




    }

    render(){
      albumImg = this.props.data.images[1].url;
        console.log(this.state.isPaneOpenLeft)
        return(
        <div>
            <div className="track-card" >
            <img onClick={this.handleClick} src={this.props.data.images[1].url} alt=''  />
            <p> {this.props.data.name}</p>
            </div>
            <SlidingPane
              // closeIcon={<div>X</div>}
              isOpen={this.state.isPaneOpenLeft}
              from="left"
              width="400px"
              onRequestClose={() => this.setState({ isPaneOpenLeft: false })}
            >
          <div id="album-tracks"><p> STUFF </p></div>
        </SlidingPane>

        </div>
        )
    }
}

export default AlbumCard;
export {albumImg};
