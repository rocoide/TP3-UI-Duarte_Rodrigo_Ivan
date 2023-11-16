import carta from "./components/carta.js"
import filtrarFunciones from "./services/filtrarFunciones.js"

window.onload = async function ()  {
    await funciones("","","");
    agregarEnlanceDescripcion();
};

const funciones = async (titulo, fecha, GeneroId) => 
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
            `https://localhost:7220/api/v1/Funcion?titulo=${titulo}&fecha=${fecha}&GeneroId=${GeneroId}`, config
        );
        if (response.ok === true)
        {
            if (response.status === 200)
            {
                let result = await response.json();
                let contenedor = document.getElementById("contenedor-cartas");
                while (contenedor.firstChild) 
                {
                    contenedor.removeChild(contenedor.firstChild);
                };
                if (result.length !== 0)
                {
                    result = await filtrarFunciones(result);
                    result.forEach(element => {
                        contenedor.innerHTML += carta(element);
                    });
                }
                else
                {
                    contenedor.innerHTML = '<h2 class="h2">No hay funciones actualmente</h2>';
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
    } 
    catch (error) 
    {
      console.log(error);
    }
};




document.getElementById("enviar-formulario").addEventListener("click", (e) => 
{
    e.preventDefault();
    let titulo = document.getElementById("titulo").value;
    let genero = document.getElementById("genero").value;
    let fecha = document.getElementById("fecha").value;
    funciones(titulo, fecha, genero);
});

const agregarEnlanceDescripcion = async () =>
{
    const listaContenedores = document.querySelectorAll(".contenedor-carta");
    listaContenedores.forEach(element => 
    {
        element.addEventListener("click", () => 
        {
            window.location.href = `./descripcion.html?dato=${element.id}`;
        });
    });
};

