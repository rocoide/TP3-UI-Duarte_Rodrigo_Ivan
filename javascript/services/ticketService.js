import ticket from "../mapeos/ticket.js";

window.onload = async function ()  {
    const urlParams = (new URLSearchParams(window.location.search));
    const objetoTicket = await JSON.parse(decodeURIComponent(urlParams.get('response')));
    await tarjetaTicket(objetoTicket);
};

const tarjetaTicket = async (objetoTicket) => 
{
    let contenedor = document.getElementById("contenedor-principal");
    let div = document.createElement("div");
    for (let index = 0; index < objetoTicket.tickets.length; index++) {
        div.innerHTML += await ticket(objetoTicket.tickets[index], objetoTicket);
    }
    contenedor.innerHTML = div.innerHTML;
}
