import carta from "../mapeos/carta.js"
import filtrarFunciones from "../metodos/filtrarFunciones.js"
import funciones from "../fetchs/fetchFunciones.js";
import agregarEnlanceDescripcion from "../metodos/agregarEnlace.js";
import sinFunciones from "../mapeos/sinFunciones.js";

window.onload = async function ()  {
    let response = await funciones("","","");
    await mapearFunciones(response);
};

const mapearFunciones = async (response) => {
    if (response.ok === true)
    {
        if (response.status === 200)
        {
            let result = await response.json();
            let contenedor = document.getElementById("contenedor-cartas");
            let div = document.createElement("div");
            if (result.length !== 0)
            {
                result = await filtrarFunciones(result);
                for (let index = 0; index < result.length; index++) {
                    div.innerHTML += await carta(result[index]);
                }
                contenedor.innerHTML = div.innerHTML;
                await agregarEnlanceDescripcion();
            }
            else
            {
                contenedor.innerHTML = await sinFunciones();
            }
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
};



document.getElementById("titulo").addEventListener("input", async() =>
{
    const filtroTitulo = document.getElementById("titulo");
    if (filtroTitulo.value.length >= 3) 
    {
        let genero = document.getElementById("genero").value;
        let fecha = document.getElementById("fecha").value;
        await mapearFunciones(await funciones(filtroTitulo.value, fecha, genero));
    }
});

document.getElementById("genero").addEventListener("change", async() =>
{
    const filtroGenero = document.getElementById("genero");
    let titulo = document.getElementById("titulo").value;
    let fecha = document.getElementById("fecha").value;
    await mapearFunciones(await funciones(titulo, fecha, filtroGenero.value));
});

document.getElementById("fecha").addEventListener("input", async() =>
{
    const filtroFecha = document.getElementById("fecha");
    let titulo = document.getElementById("titulo").value;
    let genero = document.getElementById("genero").value;
    await mapearFunciones(await funciones(titulo, filtroFecha.value, genero));
});


document.getElementById("enviar-formulario").addEventListener("click", async (e) => 
{
    e.preventDefault();
    let titulo = document.getElementById("titulo").value;
    let genero = document.getElementById("genero").value;
    let fecha = document.getElementById("fecha").value;
    await mapearFunciones(await funciones(titulo, fecha, genero));
});


document.getElementById("borrar-filtros").addEventListener("click", async (e) => 
{
    e.preventDefault();
    let titulo = document.getElementById("titulo");
    titulo.value = "";
    let genero = document.getElementById("genero");
    genero.value = "";
    let fecha = document.getElementById("fecha");
    fecha.value = "";
    await mapearFunciones(await funciones(titulo.value, genero.value, fecha.value));
});