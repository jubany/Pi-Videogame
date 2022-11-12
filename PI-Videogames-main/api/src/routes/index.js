require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Videogame,Genres} = require('../db');
const { API_KEY } = process.env;
const videogamesRoutes = Router()
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//traigo la info de la api
const getApiInfo = async () => {
const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
const apiInfo = await apiUrl.data.map(el => {
return{
    name: el.name,
    description: el.description,
    platform: el.platform,
    id:el.id,
};
})
return apiInfo;
}
//traigo la info de la base de datos
const getDbInfo = async () => {
    return await Videogame.findAll({
        include:{
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
};

const getAllVideoGames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}
const prueba = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=5c0fdc19569f44248b2f18bf446d456b`);
    const apiInfo = apiUrl.data
    return apiInfo;
}


/*videogamesRoutes.get('/', async (req,res)=> {
    const {name} = req.query.name;
    let infoTotal = await getAllVideoGames();
    if (name) {
    
        let videogameName = await infoTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))

    videogameName.length ? 
    res.status(200).send(videogameName):
    res.status(404).send("No se encontro el nombre");
    }
    else{
        res.status(200).send(infoTotal);
    }
    }
)*/

videogamesRoutes.get('/', async (req,res)=> {
    try {
        const result = await prueba();
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

videogamesRoutes.post('/', async (req, res,next) => {
    let{ name,description,platform,genres} =req.body;
    try {
        
    
    let newGame = await Videogame.create({
        name,
        description,
        platform,
        genres
    })
    let videogameDb = await Genres.findAll({
        where: {name : genres}
    })

    await newGame.addGenres(videogameDb)
    res.send(newGame);
} catch (error) {
        next(error)
};


})


module.exports = videogamesRoutes;
