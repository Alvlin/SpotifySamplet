import React, { Component } from 'react'

class ArtistCard extends Component {
    

    


    render(){
        console.log(this.props.data)
            if(this.props.data.images.length > 0){
                return ( 
                    <div>
                        <div className="track-card">
                    <img src= {this.props.data.images[0].url}/>
                    <p> {this.props.data.name}</p>
                    <p> {this.props.data.followers.total}</p>
                    <p> {this.props.data.popularity}</p>

                        </div> 
                    </div>
                    )
            }
            else {
                return null
            }
    
               
           }
}

export default ArtistCard; 