window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    const dato = urlParams.get('dato');
    console.log("Dato recibido:", dato);
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
                // let contenedor = document.getElementById("contenedor-pelicula");
                // while (contenedor.firstChild) 
                // {
                //     contenedor.removeChild(contenedor.firstChild);
                // };
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