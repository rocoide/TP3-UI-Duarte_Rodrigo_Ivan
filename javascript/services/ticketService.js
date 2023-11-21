import ticket from "../mapeos/ticket.js";

window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    const response = urlParams.get('response');
    await tarjetaTicket(response);
};

const tarjetaTicket = async (response) => 
{
    let contenedor = document.getElementById("contenedor-principal");
    console.log(response);
    if (response.ok === true)
    {
        if (response.status === 201)
        {
            let result = await response.json();
            for (let index = 0; index < result.tickets.length; index++) {
                contenedor.innerHTML += await ticket(result.tickets[index], result);
            }
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
