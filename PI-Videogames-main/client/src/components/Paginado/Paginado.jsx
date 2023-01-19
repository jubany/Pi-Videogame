import React from "react";
import s from './Paginado.module.css';

export default function Paginado({videogameForPage, todosJuegos, paginado}){
    const pageNumbers = [];

    //Math.ceil redondea para arriba 
    for(let i = 0; i <= Math.ceil(todosJuegos/videogameForPage) - 1; i++){
        pageNumbers.push(i+1);
    }

    return(
        <nav className={s.paginadoContainer}>
            <ul className={s.pagination_ul}>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li key={number} className={s.paginadoItem} onClick={() => paginado(number)}>
                           <button> {number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
