import React, { Component } from 'react';
import './App.css';
import TracksContainer from './components/TracksContainer'
import ReactDOM from 'react-dom'
import TrackCard from './components/TrackCard'
import AlbumCard from './components/AlbumCard'
import ArtistCard from './components/ArtistCard'

var apiTok;
const lookup = {
      "album": [
      { id: '1', text: 'Sort Alphabetically' },
      { id: '2', text: 'Sort by Release Date' },
      { id: '3', text: 'Sort by Tracks' }],
      "track": [
      { id: '1', text: 'Sort Alphabetically' },
      { id: '2', text: 'Sort by Popularity'},
      { id: '3', text: 'Sort by Release Date' },
      { id: '4', text: 'Sort by Song Length(Short to Long)'}],
      "artist": [
      {id: '1', text: 'Sort Alphabetically'},
      {id: '2', text: 'Sort by Popularity'},
      {id: '3', text: 'Sort by Followers'}]
}

class App extends Component {
  callAPI() {
    fetch("http://localhost:9000/getToken")
      .then(res => res.text())
      .then(res => {this.state.svrResponse = res});
    apiTok = this.state.svrResponse;
  }
  constructor(props){
    super(props)
    this.state = {
    tracks: [],
    search: '',
    artist: null,
    searchType: 'track',
    sortType: 'Sort Alphabetically',
    cardlings: null
    };
    this.callAPI();
  }


  changeType= ({ target: { value } }) => {
    this.setState({ searchType: value });
    this.setState({ sortType: 'Sort Alphabetically'})
  }

  changeSortType = (e) => {
    this.setState({sortType: e.target.value})
  };

  sortCards(value, items){
    if(value === 'Sort by Release Date'){
      items.sort((a,b) => a.album.release_date - b.album.release_date);
    }
    else if(value === 'Sort Alphabetically'){
      items.sort((a,b) => a.name.localeCompare(b.name))
    }
    else if(value === 'Sort by Popularity'){
      items.sort((a,b) => a.popularity - b.popularity);
    }
    else if(value === 'Sort by Song Length(Short to Long)')
      items.sort((a,b) => a.duration_ms - b.duration_ms);
  };



  handleClick = (event) => {
    event.preventDefault()
    this.callAPI()
    const baseUrl = 'https://api.spotify.com/v1/search?'
    const auth_token = 'Bearer ' + this.state.svrResponse
    let fetchUrl,cards;
    let sortType = this.state.sortType
    let searching = this.state.searchType;
    if(this.state.search){
    fetchUrl= baseUrl + "query=" + this.state.search + '&type=' + this.state.searchType + '&offset=0&limit=24'
    fetch(fetchUrl, {
      method: "GET",
      headers: {
      'Content-type': 'application/json',
      'Authorization': auth_token
      },
    })
    .then(resp => resp.json())
    .then( function(data){
      switch(searching){
        case 'album':
          const j = data.albums.items
          if(sortType === 'Sort by Release Date'){
            j.sort((a,b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
          }
          else if(sortType === 'Sort Alphabetically'){
            j.sort((a,b) => a.name.localeCompare(b.name))
          }
          else if(sortType === 'Sort by Tracks'){
            j.sort((a,b) => b.total_tracks - a.total_tracks);
          }
          else if(sortType === 'Sort by Song Length(Short to Long)'){
            j.sort((a,b) => a.duration_ms - b.duration_ms);
          }
          cards = data.albums.items.map((val) => <AlbumCard  key={val.id}  data={val} img={val} />);
          console.log('cards',cards);
          ReactDOM.render(cards,document.getElementById('container'))
          break;
        case 'artist':
          const i = data.artists.items
          if(sortType === 'Sort by Followers'){
            i.sort((a,b) =>b.followers.total - a.followers.total);
          }
          else if(sortType === 'Sort Alphabetically'){
            i.sort((a,b) => a.name.localeCompare(b.name))
          }
          else if(sortType === 'Sort by Popularity'){
            i.sort((a,b) => b.popularity - a.popularity);
          }
          cards = data.artists.items.map((val) => <ArtistCard  key={val.id}  data={val} img={val} />);
          ReactDOM.render(cards,document.getElementById('container'))
          break;
        case 'track' :
          let y = data.tracks.items
          if(sortType === 'Sort by Release Date'){
            y.sort((a,b) => new Date(b.album.release_date).getTime() - new Date(a.album.release_date).getTime());
          }
          else if(sortType === 'Sort Alphabetically'){
            y.sort((a,b) => a.name.localeCompare(b.name))
          }
          else if(sortType === 'Sort by Popularity'){
            y.sort((a,b) => b.popularity - a.popularity);
          }
          else if(sortType === 'Sort by Song Length(Short to Long)'){
            y.sort((a,b) => a.duration_ms - b.duration_ms);
          }
          cards = y.map((val) => val.preview_url ? (<TrackCard key={val.id} data={val} img={val.album}/>) : null);
          ReactDOM.render(cards,document.getElementById('container'))
          break;
        case "album,artist,track":
        break;
      }
    })
    }
  }


  render() {
    const options = lookup[this.state.searchType];
    return (
      <div className="App">
        <form>
          <input onChange={event => {this.setState({search: event.target.value})}} value={this.state.search} type="text" placeholder="Search..." name="search"/>
          <button type="submit" onClick={this.handleClick} > <i className="fa fa-search"></i>Search</button>
        </form>
        <label>Choose a Genre:</label>

        <select defaultValue={this.state.searchType} onChange={this.changeType}>
          <option value="album">Album</option>
          <option value="artist">Artist</option>
          <option value="track">Track</option>
          <option value="album,artist,track">All</option>
        </select>
        <select id='tracks' defaultValue={this.state.sortType} onChange={this.changeSortType} >
          {options.map(o => <option key={o.id} value={o.text}>{o.text}</option>)}
        </select>
        <TracksContainer tracks={this.state}/>
      </div>
    );
  }
}

export default App;
export {apiTok};
