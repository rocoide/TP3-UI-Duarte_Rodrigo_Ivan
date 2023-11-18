import poster from "./javascript/mapeos/poster.js";
import datos from "./javascript/mapeos/datos.js";
import trailer from "./javascript/mapeos/trailer.js";
import sinopsis from "./javascript/mapeos/sinopsis.js";
import botonFuncion from "./javascript/mapeos/botonFuncion.js";

window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    const dato = urlParams.get('dato');
    await obtenerPelicula(dato);
    await botonesFunciones();
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
                contenedor.innerHTML += await poster(result.poster);
                contenedor.innerHTML += await datos(result);
                contenedor2.innerHTML += await trailer(result.trailer);
                contenedor2.innerHTML += await sinopsis(result.sinopsis);
                let contenedor3 = document.getElementById("section-div");
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


const botonesFunciones = async () => 
{
    const botones = document.querySelectorAll(".boton-funcion");
    botones.forEach(element => {
        element.addEventListener("click", async () =>
        {
            let idBoton = element.id;
            let numeroOculto = document.getElementById("oculto");
            let usuario = document.getElementById("usuario");
            let cantidad = document.getElementById("cantidad");
            usuario.value = "";
            cantidad.value = "";
            numeroOculto.value = idBoton;
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
                `https://localhost:7220/api/v1/Funcion/${numeroOculto.value}/tickets`, config
            );
            if (response.ok === true)
            {
                if (response.status === 200)
                {
                    let result = await response.json();
                    let leyendaModal = document.getElementById("modal-leyenda");
                    leyendaModal.innerHTML = `Hay ${result.cantidad} tickets disponibles para esta funcion`;
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
        });
    });
};







document.getElementById("boton-reserva").addEventListener("click", (e) => 
{
    e.preventDefault();
    let usuario = document.getElementById("usuario").value;
    let cantidad = document.getElementById("cantidad").value;
    let numOculto = document.getElementById("oculto").value;
    if (usuario === "" || cantidad === "")
    {
        let formulario = document.getElementById("formulario");
        formulario.reportValidity();
    }
    else
    {
        window.location.href = `./ticket.html?funcion=${numOculto}&usuario=${usuario}&cantidad=${cantidad}`;
    }
});
