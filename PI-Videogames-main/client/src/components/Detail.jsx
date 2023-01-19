import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getVideogame } from '../actions/index'
import img from '../imagenes/joistick.jpg';
import Loading from './Loading'

function Detail() {

    const [carga, setCarga] = useState(true);
    const {id} = useParams() //rutas dinamicas, Podemos acceder a cualquier parámetro de ruta de una ruta declarada con su componente asociado usando el hook useParams.
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getVideogame(id)).then(() => setCarga(false))
    }, [dispatch, id])

    const details = useSelector(state => state.videogame)
    //console.log(details)

    if (carga) {
        return <Loading />;
      }

    var regex = /(<([^>]+)>)/gi;


    return(
        <div>
            <div>
                <div>
                    <div>
                    <h1>{details.name}</h1>
                    <div>
                        <p>⭐ {details.rating}</p>
                        <p>{details.genres?.map(g => (g.name ? g.name : g)).join('| ')}</p>
                        <p> 📅{details.released}</p>
                    </div>
                        <div>📌{details.description?.replace(regex, '').replace('&#39', '')}</div>
                        <div>🎮: {details.platforms?.join(', ')}</div>
                    </div>
                </div>
                <div>
                    <img src={details.image ? details.image : img } alt={`${details.name}'s`} width="300px" height="150px"/>
                </div>
            </div>
            <div>
                <NavLink to={'/home'}>
                    <span>↵ Back Home</span>
                </NavLink>
            </div>

        </div>
    )
}

export default Detail