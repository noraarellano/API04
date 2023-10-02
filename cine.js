const express = require('express');
const app = express();
const puerto = process.env.PORT || 3005;
app.use(express.json())
//Arreglo de objeto de categorias
let peliculas = [
    {id:1, titulo:"La Aventura Comienza", director:"Juan Director", añoLanzamiento:"2020", genero:"Aventura", calificacion:"8.5"},
    {id:2, titulo:"El Misterio del Pasado", director:"Maria Directora", añoLanzamiento:"2018", genero:"Misterio", calificacion:"7.9"},
    {id:3, titulo:"Amor Eterno", director:"Carlos Cineasta", añoLanzamiento:"2019", genero:"Romance", calificacion:"9.0"},
    {id:4, titulo:"Atrapados en el Tiempo", director:"Laura Directora", añoLanzamiento:"2021", genero:"Ciencia Ficción", calificacion:"8.2"},
    {id:5, titulo:"Risas y Más Risas", director:"Pedro Risueño", añoLanzamiento:"2017", genero:"Comedia", calificacion:"7.5"},
    {id:6, titulo:"La Isla Perdida", director:"Ana Exploradora", añoLanzamiento:"2022", genero:"Aventura", calificacion:"9.2"},
    {id:7, titulo:"El Último Baile", director:"Diego Bailarín", añoLanzamiento:"2016", genero:"Drama", calificacion:"8.0"},
    {id:8, titulo:"Viaje al Futuro", director:"Elena Futurista", añoLanzamiento:"2023", genero:"Ciencia Ficción", calificacion:"8.8"},
    {id:9, titulo:"Amistad Inquebrantable", director:"Luis Amigo", añoLanzamiento:"2019", genero:"Drama", calificacion:"8.7"},
    {id:10, titulo:"Aventuras Submarinas", director:"Marta Exploradora", añoLanzamiento:"2020", genero:"Aventura", calificacion:"8.9"},
];


app.get('/socios/v1/peliculas', (req, res)=>{
    //1. Verificar si existen categorías
    if(peliculas.length>0){
        res.status(200).json({
            estado:1,
            mensaje:"Exiten películas",
            peliculas: peliculas
        })
    }else{
        res.status(404).json({
            estado:0,
            mensaje:"No exiten películas",
            peliculas: peliculas
        })
    }
})

app.get('/socios/v1/peliculas/:id', (req, res)=>{
    //Solo una categoria
    const id = req.params.id;
    //Programación Funcional
    const pelicula = peliculas.find(pelicula=>pelicula.id==id)
    //Si se encontró una categoría
    if(pelicula){
        res.status(200).json({
            estado:1,
            mensaje:"Película encontrada",
            pelicula:pelicula
        })
        
    }else{
        //No se encontró una categoría
        res.status(404).json({
            estado:0,
            mensaje:"No se encontró la película",
            pelicula:{}
        })  
    }
    //Programación Estructurada
    for(let i = 0; i < array.length; i++){
        const element = array[i];
    }

    res.send('Mostrar una película por su id');
})

app.post('/socios/v1/peliculas', (req, res)=>{
    //Crear un recurso - categoria
    //Requerimos un id
    //id = Generar un número aleatorio 
    //Nombre y descripción = Body
    const{titulo, director, añoLanzamiento, genero, calificacion} = req.body;
    const id = Math.round(Math.random()*1000);
    //Comprobar que el cliente(navegador) = usuario = programador
    if(titulo==undefined || director==undefined || añoLanzamiento==undefined || genero==undefined || calificacion==undefined){
        //Hay un error en la solicitud por parte del usuario
        res.status(400).json({
            estado:0,
            mensaje:"BAD REQUEST - Favor de llenar los campos correctamente"
        })
    }else{
        //En javascript como agregar un nuevo lemento a un arreglo
        const pelicula = {id:id, titulo:titulo, director:director, añoLanzamiento:añoLanzamiento, genero:genero, calificacion:calificacion};
        const longitudInicial = peliculas.length;
        peliculas.push(pelicula)
        if(peliculas.length > longitudInicial){
            //Si se agregó una categoría todo OK
            res.status(201).json({
                estado:1,
                mensaje:"Película creada",
                pelicula:pelicula
            })
        }else{
            //Error del servidor al no poder crearse la categoria
            res.status(500).json({
                estado:0,
                mensaje:"Película no creada por un error desconocido",
                pelicula:pelicula
            })
        }
    }

    res.send('Crear una pelicula');

})

app.put('/socios/v1/peliculas/:id', (req,res)=>{
    //Actualizar un recurso - Actualizar una categoria
    const {id} = req.params;
    const {titulo, director, añoLanzamiento, genero, calificacion} = req.body;
    if(titulo==undefined || director==undefined || añoLanzamiento==undefined || genero==undefined || calificacion==undefined)
    {
        res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros en la solicitud"
        })
    }
    else
    {
        const posActualizar = peliculas.findIndex(pelicula => pelicula.id==id)
        if(posActualizar!= -1)
        {
            //Si encontro la categoria con el id buscado
            //Actualizar la categoria
            peliculas[posActualizar].titulo=titulo;
            peliculas[posActualizar].director=director;
            peliculas[posActualizar].añoLanzamiento=añoLanzamiento;
            peliculas[posActualizar].genero=genero;
            peliculas[posActualizar].calificacion=calificacion;
            res.status(200).json({
                estado: 1,
                mensaje: "Película actualizada",
                pelicula: peliculas[posActualizar]
            })            
        }
        else
        {
            //No se encontro la categoria del id buscado
            res.status(404).json({
                estado:0,
                mensaje:"Película no encontrada"
            })
        }
    }

     res.send('Actualizar una pelicula por su id');
})

app.delete('/socios/v1/peliculas/:id', (req, res)=>{
    const {id} = req.params;
    const indiceEliminar = peliculas.findIndex(pelicula => pelicula.id==id)
    if(indiceEliminar!=-1){
        //Borrar la categoria
        peliculas.splice(indiceEliminar, 1);
        res.status(201).json({
            estado:1,
            mensaje:"Pelicula eliminada con éxito"
        })
    }else{
        //Categoria no encontrada
        res.status(404).json({
            estado:0,
            mensaje:"Película no encontrada"
        })
    }
})

app.listen(puerto,()=>{
    console.log('Servidor corriendo en el puerto: ', puerto);

})