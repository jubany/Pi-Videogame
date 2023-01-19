// import {Get_Videogames,GET_BY_NAME_VIDEOGAMES,GET_BY_GENRES,FILTER_BY_GENRES,CREATE_VIDEOGAME,FILTER_BY_SOURCE} from '../actions'
import { GET_ALL_VIDEOGAMES,GET_BY_NAME_VIDEOGAMES,GET_VIDEOGAME,GET_BY_GENRES,CREATE_VIDEOGAME,FILTER_BY_SOURCE,FILTER_BY_GENRES,ORDER_BY_RATING} from '../actions'
const initialState = {
    // videogames : [],
    // all_videogames: [],
    // videogame: [],
    // genres: [],
    allVideogames : [],
    videogames : [],
    videogame: [],
    genres: [],
    

}

//  function rootReducer(state=initialState,action) {
//     switch(action.type){
//         case Get_Videogames:
//             return{
//                 ...state,
//                 videogames: action.payload,
//                 all_videogames: action.payload
//             };
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_VIDEOGAMES: //para mi home
            return {
                ...state,
                allVideogames: action.payload,
                videogames: action.payload //de reserva
            };
        case GET_BY_NAME_VIDEOGAMES:
            return{
                ...state,
                videogames: action.payload
            };
            case GET_VIDEOGAME: //para mi ruta de detalle
            return {
                ...state,
                videogame: action.payload
            };
            case GET_BY_GENRES:
            return {
                ...state,
                genres: action.payload
            };
            case CREATE_VIDEOGAME:
                return{
                    ...state,
                    videogame:action.payload
                };

            // case FILTER_BY_GENRES:
            //     let aux = []
            //     if (action.payload) {
            //         function search(elemento) {
            //             console.log(elemento)
            //             const names = elemento.genres.map(e => e.name)
            //             console.log
            //             return names.includes(action.payload);
            //         }
            //         aux = state.genres.filter(search)
            //     } else {
            //         aux = [...state.genres]
            //     }
            //     return {
            //         ...state,
            //         filterPokemons: aux
            //     }
            case FILTER_BY_GENRES:
            let aux = state.videogames
            let auxGenres = action.payload === 'AllGenres'? aux : aux.filter(e => e.genres.includes(action.payload)) 
                console.log(auxGenres)
            
                return {
                    ...state,
                    allVideogames: auxGenres,
                }

              case FILTER_BY_SOURCE:
                let getVg = state.videogames;
                let filtrado = []
    
                switch(action.payload) {
                    case 'api': filtrado = getVg.filter(el => typeof (el.id) === 'number'); break;
                    case 'created': filtrado = getVg.filter(el => isNaN(el.id)); break;
                    default: filtrado = getVg; break;
                }
                return {
                    ...state,
                    allVideogames: filtrado};

                    
                    case ORDER_BY_RATING:
        
                        let sortedRating = action.payload === "BestRated" ?
                        state.videogames?.sort(function(a,b) {
                              if(a.rating > b.rating){ return 1; }
                              if(a.rating < b.rating){ return -1; }
                              return 0
                            }) : 
                        state.videogames?.sort(function(a,b) {
                              if(a.rating > b.rating){ return -1; }
                              if(a.rating < b.rating){ return 1; }
                              return 0
                            });
                        return {
                          ...state,
                          videogames: sortedRating,
                        };

            default: return state;
            
    }
    

}

export default rootReducer;