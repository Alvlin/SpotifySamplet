import React, { Component } from 'react'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import {apiTok} from './../App.js'
import TrackList from './TrackList'
import "../css/albumcard.css";

let albumImg;
class AlbumCard extends Component {
    constructor(){
        super()
        this.state = {
            isPaneOpen: false,
            isPaneOpenLeft: false,
            albumTracks: null,
        }
    }
    handleClick = () => {
        console.log(apiTok);
        this.setState({ isPaneOpenLeft: true })
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
        .then(data => this.setState({albumTracks: data.items.map((val) =>
                      val.preview_url ? (<TrackList key={val.id} data={val} />) : null)}))
    }

    render(){
        albumImg = this.props.data.images[1].url;
        return(
          <div>
            <div className="track-card" >
              <img onClick={this.handleClick} src={this.props.data.images[1].url} alt='AlbumImg'  />
              <p> {this.props.data.name}</p>
            </div>
            <SlidingPane isOpen={this.state.isPaneOpenLeft} from="left" width="400px" onRequestClose={() => this.setState({ isPaneOpenLeft: false })}>
              <div id="album-tracks">
                {this.state.albumTracks}
              </div>
            </SlidingPane>

          </div>
        )
    }
}

export default AlbumCard;
export {albumImg};
