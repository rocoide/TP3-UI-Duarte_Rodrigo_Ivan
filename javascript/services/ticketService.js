import ticket from "../mapeos/ticket.js";

window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    const funcion = urlParams.get('funcion');
    const usuario = urlParams.get('usuario');
    const cantidad = urlParams.get('cantidad');
    await tarjetaTicket(funcion, usuario, cantidad);
};

const tarjetaTicket = async (funcion, usuario, cantidad) => 
{
    const config = {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "cantidad": cantidad,
            "usuario": usuario
        }),
    };
    try 
    {
        let contenedor = document.getElementById("contenedor-principal");
        const response = await fetch
        (
            `https://localhost:7220/api/v1/Funcion/${funcion}/tickets`, config
        );
        if (response.ok === true)
        {
            if (response.status === 201)
            {
                let result = await response.json();
                for (let index = 0; index < result.tickets.length; index++) {
                    contenedor.innerHTML += await ticket(result.tickets[index], result);
                }
            }
            else
            {
            }
        }
        else
        {
            if(response.status === 400)
            {
                contenedor.innerHTML += '<h2>No hay suficientes tickets para completar la operacion</h2>';
            }
            else
            {
                contenedor.innerHTML += '<h2>No se ha encontrado la funcion solicitada</h2>';
            }
        }  
    } 
    catch (error) 
    {
      console.log(error);
    }
}
