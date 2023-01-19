import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import imagen from '../imagenes/videogame.png'
import { getAllVideogames } from '../actions'
import { useDispatch } from "react-redux";

export default function NavBar() {

    const dispatch = useDispatch()

    const handleRefresh = (e) => {
        e.preventDefault()
        dispatch(getAllVideogames())
    }

    return (
        // <div className={s.box}>
            <nav>
                <div>
                    <SearchBar />
                </div>
                <div>
                    <img src={imagen} alt="mario.gif"/>
                </div>
                <div>
                    <button onClick={e => handleRefresh(e)}>Refresh</button>
                    <span><NavLink to={'/create'}> Create Videogame</NavLink></span>
                </div>
            </nav>
        //</div>
    )
}