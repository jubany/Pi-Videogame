import React from "react";
import { NavLink } from "react-router-dom";

class VideoGameCard extends React.Component {

    render() {
        return (
            <div>
                <img src={this.props.image} width="400px" height="250px" alt=""/>
                <div>
                    <h3>{this.props.name}</h3>
                    <p>{this.props.genres}</p>
                    <p>⭐ {this.props.rating}</p>
                 <  NavLink to={`/detail/${this.props.id}`}><span>Leer más</span></NavLink>
             </div>
            </div>
        )
    }

}


export default VideoGameCard

