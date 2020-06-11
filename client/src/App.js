import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import TracksContainer from './components/TracksContainer'
import TrackCard from './components/TrackCard'



class App extends Component {

  callAPI() {
    fetch("http://localhost:9000/getToken")
        .then(res => res.text())
        .then(res => this.state.svrResponse = res);
        // .then(res => this.setState({ svrResponse: res }));
  }

  constructor(props) {
    super(props);
    this.state = {
    tracks: [],
    search: '',
    artist: null,
    searchType: 'album',};
    this.callAPI();
  }



  changeType = (e) => {
    this.setState({searchType:e.target.value})
  };

  handleClick = (event) => {
    event.preventDefault()
    this.callAPI()
    console.log(this.state.svrResponse);
    const baseUrl = 'https://api.spotify.com/v1/search?'
    const auth_token = 'Bearer ' + this.state.svrResponse
    let fetchUrl;
    let cards;
    let searching = this.state.searchType;
    if(this.state.search){
      fetchUrl= baseUrl + "query=" + this.state.search + '&type=' + this.state.searchType
      fetch(fetchUrl, {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
          'Authorization': auth_token
        },
      })
      .then(resp => resp.json())
      .then( function(data){
        console.log(data);
        switch(searching){
          case 'album':
            cards = data.albums.items.map((val) => <TrackCard  key={val.id}  data={val} img={val} />);
            ReactDOM.render(cards,
              document.getElementById('container')
            )
            break;
          case 'artist':
            cards = data.artists.items.map((val) => <TrackCard  key={val.id}  data={val} img={val} />);
              ReactDOM.render(cards,
                document.getElementById('container')
            )
            break;
          case 'track':
            cards = data.tracks.items.map((val) => <TrackCard  key={val.id}  data={val} img={val.album}/>);
              ReactDOM.render(cards,
                document.getElementById('container')
            )
            break;
          case "album,artist,track":
            break;
        }
      })
    }
  }


  render() {
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
        <select >
           <option >Sort by Release Date</option>
            <option >Sort Alphabetically </option>
            <option >Sort by Popularity </option>
           <option>Sort by Song Length(Short to Long)</option>
         </select>
        <TracksContainer> <p className="App-intro">{this.state.svrResponse}</p> </TracksContainer>

      </div>
    );
  }
}

export default App;

// getHashParams = () => {
//   var hashParams = {};
//   var e, r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//   while ( e = r.exec(q)) {
//      hashParams[e[1]] = decodeURIComponent(e[2]);
//   }
//   console.log(hashParams);
//   return hashParams;
// }
