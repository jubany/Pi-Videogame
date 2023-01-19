const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const { Router } = require('express');
const {Genres} = require('../db.js')

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const respuesta = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const genresApi = await respuesta.data.results.map(g => g.name)
        //console.log('estos son los generos: ', genresApi)

        genresApi.map(e => Genres.findOrCreate({ //lo uso para guardar los generos que me traje de la API en la base de datos
            where: {name: e} //
        }))

        const allGenres = await Genres.findAll() //me traigo todos los generos que guarde en mi db
        res.json(allGenres)

    }catch(e) {
        next(e)
    }

})

module.exports = router;


// require('dotenv').config();
// const { Router } = require('express');
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');
// const axios = require('axios');
// const { API_KEY } = process.env;
// const {Genres} = require('../db');

// const router = Router();
// router.get('/', async (req, res, next) => {
//     try {
//         const respuesta = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
//         const genresApi = await respuesta.data.results.map(g => g.name)
//         //console.log('estos son los generos: ', genresApi)

//         genresApi.map(e => Genres.findOrCreate({ //lo uso para guardar los generos que me traje de la API en la base de datos
//             where: {name: e} //
//         }))

//         const allGenres = await Genres.findAll() //me traigo todos los generos que guarde en mi db
//         res.json(allGenres)

//     }catch(e) {
//         next(e)
//     }

// })



// module.exports = router;