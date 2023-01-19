import React from 'react';
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
// import {getVideogames,getByNameVideogames,filterByGenres,getByGenres,filterBySource} from '../actions';
import {filterByGenres, filterBySource, getAllVideogames,getByNameVideogames,getByGenres,orderByRating} from '../actions';
import VideoGameCard from "./VideoGameCard";
import Paginado from './Paginado/Paginado.jsx'
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';


export default function Home() {
    const dispatch = useDispatch();
    const todosJuegos = useSelector((state) => state.allVideogames);
    const generos = useSelector(state => state.genres)
    const [currentPage, setCurrentPage] = useState(1);
    const [videogameForPage, setVideogameForPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogameForPage //15
    const indexOfFirstVideogame = indexOfLastVideogame - videogameForPage //0
    const currentVideogames = todosJuegos.slice(indexOfFirstVideogame,indexOfLastVideogame);
    const [order, setOrder] = useState('')
    const [rating, setRating] = useState("Select order");


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(()=>{
        dispatch(/*getVideogames*/getAllVideogames());
        dispatch(getByGenres())
      },[dispatch]);
    

function handleClick(e) {
    e.preventDefault();
    dispatch(/*getVideogames*/getAllVideogames());
    setCurrentPage(1)
}
function handleFilterByName(e) {
    e.preventDefault();
    dispatch(getByNameVideogames(e.target.value))
    setCurrentPage(1)
}
function handleSortByRating(e){
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setRating(e.target.value)
  }
function handleFilterGenres(e){
    e.preventDefault()
    dispatch(filterByGenres(e.target.value));
    setCurrentPage(1);

    setOrder(e.target.value)
  };
function handleSource(e) {
    e.preventDefault();
    if (e.target.value === '') {
        dispatch(getAllVideogames())
    }else{
        dispatch(filterBySource(e.target.value))
        setCurrentPage(1)
    }
}
    return(
        <div>
<button onClick={e => {handleClick(e)}} >
    Volver a cargar todos los personajes
</button>
<div>
    <select onChange={handleFilterByName}>
        <option value="Select order"> Ordenar por nombre </option>
        <option value='asc'>Ascendente</option>
        <option value='desc'>Descendente</option>
    </select>
    <select onChange={handleSortByRating}>
          <option value="Select order"> Ordenar por rating </option>
          <option value="BestRated"> 0-5 </option>
          <option value="WorstRated"> 5-0 </option>
    </select>
    <select onChange={e => handleSource(e)}>
                        <option value=''>Filtrar por Origen</option>
                        <option value="api">API</option>
                        <option value="created">Created</option>
                    </select>
                    {/* <button className={s.btn}onClick={e => handleRefresh(e)}>Refresh</button> */}
    <div>
        {/* Por género */}
        <select onChange={e => handleFilterGenres(e)}>
                        <option value='AllGenres'>Generos</option>
                        {generos && generos.map(g => {
                            return (
                                <option key={g.id} value={g.name}>{g.name}</option>
                            )
                        })}
                    </select>
          </div>
          <Link to='/videogame'><button>Crea tu personaje</button></Link>

          <SearchBar/>
    <Paginado videogameForPage={videogameForPage} todosJuegos={todosJuegos.length} paginado={paginado} />
    {   
                    currentVideogames.length ?
                    currentVideogames?.map((el) => {
                        return (
                         el.error? <div><h2>Videogame not found</h2></div> :
                        <VideoGameCard key={el.id} name={el.name} image={el.image} rating={el.rating} released={el.released} genres={el.genres} id={el.id}/>
                        );
                    })
                    :
                    <div>
                        <h1>loading</h1>
                    </div>
                }
</div>
        </div>
    )
}
