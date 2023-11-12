import carta from "./components/carta.js"

window.onload = async function ()  {
    await funciones("","","");
};

const funciones = async (titulo, fecha, generoId) => 
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
            `https://localhost:7220/api/v1/Funcion?titulo=${titulo}&fecha=${fecha}&genero=${generoId}`, config
        );
        if (response.ok === true)
        {
            if (response.status === 200)
            {
                const result = await response.json();
                console.log(result);
                let contenedor = document.getElementById("contenedor-cartas");
                if (result.length !== 0)
                {
                    contenedor.innerHTML = carta();
                }
                else
                {
                    contenedor.innerHTML = '<h2>No hay funciones actualmente</h2>';
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