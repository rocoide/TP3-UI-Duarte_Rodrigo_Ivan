export default async function ticket(id, datos)
{
    let fecha = new Date(datos.funcion.fecha);
    let fechaEspanish = fecha.toLocaleDateString('es-ES');
    let diaEspanish = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
    return  `
            <div class="contenedor-ticket">
                <div class="title centrado">
                    <p class="centrado bold gold">${datos.usuario}</p>
                </div>
                <p><span class="bold">Ticket</span>: ${id.ticketId}</p>
                <div class="title centrado">
                    <p>Pelicula</p>
                </div>
                <p><span class="bold">Pelicula</span>: ${datos.funcion.pelicula.titulo}</p>
                <p><span class="bold">Genero</span>: ${datos.funcion.pelicula.genero.nombre}</p>
                <div class="title centrado">
                    <p>Sala</p>
                </div>
                <p><span class="bold">Sala</span>: ${datos.funcion.sala.nombre}</p>
                <p><span class="bold">Capacidad</span>: ${datos.funcion.sala.capacidad}</p>
                <div class="title centrado">
                    <p>Fecha y horario</p>
                </div>
                <p><span class="bold">Fecha</span>: ${diaEspanish} ${fechaEspanish}</p>
                <p class="margen-inferior"><span class="bold">horario</span>: ${datos.funcion.horario}</p>
            </div>
            `
}