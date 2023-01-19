import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {createVideogame, getByGenres} from '../actions/index';
import { useDispatch, useSelector} from 'react-redux';

function validate(input) {
    let errors = {};
    if (!input.name ) {
        errors.name = "Se requiere un nombre";
    } else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
        errors.name = 'Solo se aceptan letras, numeros, guiones medios y parentesis'
      }
    
      if(input.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)){
        errors.image='invalid URL'
      }
        if(!input.description) {
            errors.description = 'La descripcion es requerida'
          } else if (input.description.length > 100) {
            errors.description = 'La descripcion es muy larga. (Max = 100 caracteres)'
          }
        
          if(!input.released) {
            errors.released = 'La fecha de lanzamiento es requerida'
          }
        
          if(!input.rating) {
            errors.rating = 'El rating es requerido'
          } else if(input.rating > 5) {
            errors.rating = 'El rating no debe ser mayor a 5'
          } else if(input.rating < 0) {
            errors.rating = 'El rating no puede ser un numero negativo'
          }
        
          return errors //la funcion validate devuelve el objeto errors, ya sea vacio o con alguna propiedad si es q encuentra un error
        }



export default function VideogameCreate() {
    const dispatch =useDispatch();
    const history = useHistory()
    const genres = useSelector((state) => state.genres);
    const [errors,setErrors] = useState({}); //me creo un estado local, en donde errors = {}
const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: []
})

const handleChange = (e) => {
    setInput({
        ...input,
    [e.target.name] : e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
    }));
    console.log(input)
}
const handleSelect = (e) => {
    setInput({
        ...input,
        genres: [...input.genres,e.target.value]
    })
}
function handleSubmit(e) {
    e.preventDefault()
    console.log(input);
    dispatch(createVideogame(input))
    alert("Personaje Creado")
    setInput({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: []
  })
  history.push('/home')
}


useEffect(() => {
dispatch(getByGenres());
},[dispatch]);


return(
    <div>
<Link to='/home'><button>Volver</button></Link>
<h1>Crea tu personaje</h1>
<form onSubmit={handleSubmit}>
<div>
   <label>Nombre:</label>
<input
type="text"
value= {input.name}
name= "name"
onChange={handleChange}/>
{errors.name &&(
   <p> {errors.name}</p>
)}
</div>
<div>
    
<div>
    <label>descripcion:</label>
<input type="text"
value={input.description}
name="description"
onChange={handleChange}/>
{errors.description &&(
    <p>{errors.description}</p>
)}
</div>
<div>
    <label>Fecha de lanzamiento:</label>
<input type="text"
value={input.released}
name="released"
onChange={handleChange}/>
{errors.released &&(
    <p>{errors.released}</p>
)}
</div>
<div>
    <label>Rating:</label>
<input type="text"
value={input.rating}
name="rating"
onChange={handleChange}/>
{errors.rating &&(
    <p>{errors.rating}</p>
)}
</div>
<select onChange={(e) =>handleSelect(e)}>
    {genres.map((gen) =>(
        <option value={gen.name}>{gen.name}</option>
    ))}
</select>
<button type="submit">Crear Personaje</button>

</div>
</form>
    </div>





)

}
