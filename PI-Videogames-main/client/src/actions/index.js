// import axios from 'axios';
// export const Get_Videogames = "Get_Videogames";
//  export const GET_BY_NAME_VIDEOGAMES = "GET_BY_NAME_VIDEOGAMES";
// export const GET_BY_GENRES = "GET_BY_GENRES";
// export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
// export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
// export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";


// export  function getVideogames() {
//     return async function(dispatch) {
//         var json = await axios('http://localhost:3001/videogames')
// return dispatch({
//     type: Get_Videogames,
//     payload: json.data
// })}
// };
// export function getByNameVideogames (name) {
//     return function (dispatch){
//         axios
//         .get(`http://localhost:3001/videogames?name=${name}`)
//         .then((response) => {
//           return response.data;
//         })
//         .then((data) => dispatch({ type: GET_BY_NAME_VIDEOGAMES, payload: data }))
//         .catch((error) => dispatch({ type: GET_BY_NAME_VIDEOGAMES, payload: {error: error.message} }));
//       };
//     };

//     export const createVideogame = (videogame) => {
//         return async (dispatch) => {
//           try {
//             const { data } = await axios.post(
//               `http://localhost:3001/videogame`,
//               videogame
//             );
//             return dispatch({
//               type: "CREATE_VIDEOGAME",
//               payload: data,
//             });
//           } catch (err) {
//             console.error(err);
//           }
//         };
//       };



//     export const getByGenres = () => {
//         return async (dispatch) => {
//           try {
//             const { data } = await axios.get(`http://localhost:3001/genres`);
//             console.log(data);
//             return dispatch({
//               type: "GET_BY_GENRES",
//               payload: data,
//             });
//           } catch (err) {
//             console.error(err);
//           }
          
//         };
//       };
      
      
      
//       export const filterByGenres = (payload) => {
//         return {
//           type: "FILTER_BY_GENRES",
//           payload,
//         };
//       };
//       export const filterBySource = (payload) => {
//         return {
//           type: "FILTER_BY_SOURCE",
//           payload,
//         };
//       };
import axios from "axios";

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
// export const GET_NAMES = "GET_NAMES";
export const GET_BY_NAME_VIDEOGAMES = "GET_BY_NAME_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const GET_BY_GENRES = "GET_BY_GENRES";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const ORDER_BY = "ORDER_BY";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const ORDER_BY_RATING = "ORDER_BY_RATING";


export const getAllVideogames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/videogames");
      return dispatch({
        type: "GET_ALL_VIDEOGAMES",
        payload: data,
      });
    } catch (err) {
      //console.log(err);
    }
  };
};
// export function getByNameVideogames (name) {
//         return function (dispatch){
//             axios
//             .get(`http://localhost:3001/videogames?name=${name}`)
//             .then((response) => {
//               return response.data;
//             })
//             .then((data) => dispatch({ type: GET_BY_NAME_VIDEOGAMES, payload: data }))
//             .catch((error) => dispatch({ type: GET_BY_NAME_VIDEOGAMES, payload: {error: error.message} }));
//           };
//         };
        export const getByNameVideogames = (name) => {
          return async (dispatch) => {
            try {
              const { data } = await axios.get(
                `http://localhost:3001/videogames?name=${name}`
              );
              return dispatch({
                type: GET_BY_NAME_VIDEOGAMES,
                payload: data,
              });
            } catch (err) {
              //console.error(err);
              return dispatch({
                type: GET_BY_NAME_VIDEOGAMES,
                payload: []
              })
            }
          };
        };
// export const getNames = (name) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:3001/videogames?name=${name}`
//       );
//       return dispatch({
//         type: "GET_NAMES",
//         payload: data,
//       });
//     } catch (err) {
//       console.error(err);
//       return dispatch({
//         type: "GET_NAMES",
//         payload: []
//       })
//     }
//   };
// };

export const getVideogame = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/videogame/${id}`);
      return dispatch({
        type: "GET_VIDEOGAME",
        payload: data,
      });
    } catch (err) {
     // console.error(err);
    }
  };
};

export const getByGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/genres`);
      return dispatch({
        type: "GET_BY_GENRES",
        payload: data,
      });
    } catch (err) {
   //   console.error(err);
    }
  };
};

export const createVideogame = (videogame) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/videogame`,
        videogame
      );
    //  console.log(data)
      return dispatch({
        type: "CREATE_VIDEOGAME",
        payload: data,
      });
    } catch (err) {
    //  console.error(err);
    }
  };
};

export const orderBy = (payload) => {
  return {
    type: "ORDER_BY",
    payload,
  };
};

export const filterBySource = (payload) => {
  return {
    type: "FILTER_BY_SOURCE",
    payload,
  };
};

export const filterByGenres = (payload) => {
  return {
    type: "FILTER_BY_GENRES",
    payload,
  };
};
export const orderByRating = (payload)=>{
  return {
    type: "ORDER_BY_RATING",
    payload
}};

    