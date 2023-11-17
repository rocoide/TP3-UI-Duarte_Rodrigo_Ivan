import poster from "./javascript/mapeos/poster.js";
import datos from "./javascript/mapeos/datos.js";
import trailer from "./javascript/mapeos/trailer.js";
import sinopsis from "./javascript/mapeos/sinopsis.js";
import botonFuncion from "./javascript/mapeos/botonFuncion.js";

window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    const dato = urlParams.get('dato');
    obtenerPelicula(dato);
};

const obtenerPelicula = async (dato) => 
    {
    const config = {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json'
        },
    };
    try 
    {
        const response = await fetch
        (
            `https://localhost:7220/api/v1/Peliculas/${dato}`, config
        );
        if (response.ok === true)
        {
            if (response.status === 200)
            {
                let result = await response.json();
                let contenedor = document.getElementById("contenedor-izquierdo");
                let contenedor2 = document.getElementById("contenedor-derecho");
                while (contenedor.firstChild) 
                {
                    contenedor.removeChild(contenedor.firstChild);
                };
                contenedor.innerHTML += await poster(result.poster);
                contenedor.innerHTML += await datos(result);
                contenedor2.innerHTML += await trailer(result.trailer);
                contenedor2.innerHTML += await sinopsis(result.sinopsis);
                let contenedor3 = document.getElementById("section-div");
                console.log(result.funciones);
                result.funciones.forEach(element => {
                    contenedor3.innerHTML += botonFuncion(element);
                });
            }
            else
            {
                console.log(`El servidor contesto con un ${response.status}`);
            }
        }
        else
        {
            console.log("Error de conexion");
        }  
    } 
    catch (error) 
    {
      console.log(error);
    }
};