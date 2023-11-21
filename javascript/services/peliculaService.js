import poster from "../mapeos/poster.js";
import datos from "../mapeos/datos.js";
import trailer from "../mapeos/trailer.js";
import sinopsis from "../mapeos/sinopsis.js";
import botonFuncion from "../mapeos/botonFuncion.js";
import peliculaById from "../fetchs/fecthPeliculaById.js";
import ticketsDisponibles from "../fetchs/fetchTicketsDisponibles.js";
import postTickets from "../fetchs/fetchPostTickets.js";

window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    const dato = urlParams.get('dato');
    let peli = await peliculaById(dato);
    await obtenerPelicula(peli);
    await botonesFunciones();
};

const obtenerPelicula = async (peli) => 
    {
    if (peli.ok === true)
    {
        if (peli.status === 200)
        {
            let result = await peli.json();

            let contenedor = document.getElementById("contenedor-izquierdo");
            let div = document.createElement("div");
            div.innerHTML += await poster(result.poster);
            div.innerHTML += await datos(result);
            contenedor.innerHTML += div.innerHTML;

            let contenedor2 = document.getElementById("contenedor-derecho");
            let div2 = document.createElement("div");
            div2.innerHTML += await trailer(result.trailer);
            div2.innerHTML += await sinopsis(result.sinopsis);
            contenedor2.innerHTML += div2.innerHTML;
            
            let contenedor3 = document.getElementById("section-div");
            let div3 = document.createElement("div");
            result.funciones.forEach(element => {
                div3.innerHTML += botonFuncion(element);
            });
            contenedor3.innerHTML += div3.innerHTML;
        }
    }
    else
    {
        if(peli.status === 404)
        {
            console.log(`No se encontre la pelicula seleccionada`);
        }
        else
        {
            console.log("Error de conexion");
        }
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
            let response = await ticketsDisponibles(element.id);
            if (response.ok === true)
            {
                if (response.status === 200)
                {
                    let result = await response.json();
                    let leyendaModal = document.getElementById("modal-leyenda");
                    leyendaModal.innerHTML = `Hay ${result.cantidad} tickets disponibles para esta funcion`;
                    let limiteMaximo = document.getElementById("limite-maximo");
                    limiteMaximo.value = `${result.cantidad}`;
                }
            }
            else
            {
                console.log(`El servidor contesto con un ${response.status}`);
            }  
        });
    });
};



document.getElementById("boton-reserva").addEventListener("click", async (e) => 
{
    e.preventDefault();
    let usuario = await document.getElementById("usuario").value;
    let cantidad = await document.getElementById("cantidad").value;
    let numOculto = await document.getElementById("oculto").value;
    let limiteMaximo = parseInt(await document.getElementById("limite-maximo").value);
    if (usuario === "" || cantidad === "" || cantidad < 1 || limiteMaximo < cantidad)
    {
        let formulario = document.getElementById("formulario");
        if (cantidad < 1)
        {
            document.getElementById("cantidad").setCustomValidity('debe ingresar valores positivos'); 
        };
        if(limiteMaximo < cantidad)
        {
            document.getElementById("cantidad").setCustomValidity('Se excede del límite de entradas disponibles');
        };
        if(usuario === "" || cantidad === "")
        {
            document.getElementById("cantidad").setCustomValidity('Debe completar este campo'); 
        };  
        formulario.reportValidity(); 
    }
    else
    {
        let response = await postTickets(numOculto, usuario, cantidad);
        
        window.location.href = `./ticket.html?response=${response}`;
    };
});
