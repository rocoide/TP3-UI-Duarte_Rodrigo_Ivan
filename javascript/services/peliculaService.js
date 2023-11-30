import poster from "../mapeos/poster.js";
import datos from "../mapeos/datos.js";
import trailer from "../mapeos/trailer.js";
import sinopsis from "../mapeos/sinopsis.js";
import botonFuncion from "../mapeos/botonFuncion.js";
import peliculaById from "../fetchs/fecthPeliculaById.js";
import ticketsDisponibles from "../fetchs/fetchTicketsDisponibles.js";
import postTickets from "../fetchs/fetchPostTickets.js";
import ordenarFunciones from "../metodos/ordenarFunciones.js";
import funcionesActuales from "../metodos/funcionesActuales.js";
import funcionById from "../fetchs/fetchFuncionById.js";

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

            // let funciones = await funcionesActuales(result.funciones);
            // result.funciones = funciones;

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

            let funcionesOrdenadas = await ordenarFunciones(result);

            let contenedor3 = document.getElementById("section-div");
            let div3 = document.createElement("div");
            
            let cantResponse;
            let cantResult;
            for (let index = 0; index < funcionesOrdenadas.length; index++) 
            {
                const element = funcionesOrdenadas[index];
                cantResponse = await ticketsDisponibles(element.funcionId);
                cantResult = await cantResponse.json();
                div3.innerHTML += await botonFuncion(element, cantResult.cantidad);
            }

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
            document.getElementById("oculto-id").value = element.id;
            let usuario = document.getElementById("usuario");
            let cantidad = document.getElementById("cantidad");
            usuario.value = "";
            cantidad.value = "";
            let responseCantidad = await ticketsDisponibles(element.id);
            let responseFuncion = await funcionById(element.id);
            if (responseCantidad.ok === true)
            {
                if (responseCantidad.status === 200)
                {
                    let resultCantidad = await responseCantidad.json();
                    let resultFuncion = await responseFuncion.json();

                    document.getElementById("modal-leyenda").innerHTML = `Hay ${resultCantidad.cantidad} tickets disponibles para esta funcion`;
                    document.getElementById("modal-leyenda-sala").innerHTML = `Sala: ${resultFuncion.sala.nombre}`;
                    document.getElementById("modal-leyenda-capacidad").innerHTML = `Capacidad: ${resultFuncion.sala.capacidad}`;
                    
                    document.getElementById("limite-maximo").value = `${resultCantidad.cantidad}`;
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
    let cantidadSolicitada = await document.getElementById("cantidad").value;
    let numOcultoId = await document.getElementById("oculto-id").value;
    let limiteMaximo = parseInt(await document.getElementById("limite-maximo").value);
    if (usuario === "" || cantidadSolicitada === "" || cantidadSolicitada < 1 || limiteMaximo < cantidadSolicitada)
    {
        let formulario = document.getElementById("formulario");
        if (cantidadSolicitada < 1)
        {
            document.getElementById("cantidad").setCustomValidity('debe ingresar valores positivos'); 
        };
        if(limiteMaximo < cantidadSolicitada)
        {
            document.getElementById("cantidad").setCustomValidity('Se excede del límite de entradas disponibles');
        };
        if(usuario === "" || cantidadSolicitada === "")
        {
            document.getElementById("cantidad").setCustomValidity('Debe completar este campo'); 
        };
        formulario.reportValidity(); 
    }
    else
    {
        let cantResponse = await ticketsDisponibles(numOcultoId);
        let cantDisponibleResult = await cantResponse.json();
        if (parseInt(cantDisponibleResult.cantidad) < cantidadSolicitada)
        {
            document.getElementById("cantidad").value = "";
            document.getElementById("cantidad").setCustomValidity('Ya no quedan suficientes tickets disponibles.');  
            formulario.reportValidity();  
        }
        else
        {
            let response = await postTickets(numOcultoId, usuario, cantidadSolicitada);
            let responseJson = JSON.stringify(response);
            window.location.href = `./ticket.html?response=${encodeURIComponent(responseJson)}`;
        }
    };
});
