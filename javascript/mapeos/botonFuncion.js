export default async function botonFuncion(funcion, cantidadDisponible)
{
    let fecha = new Date(funcion.fecha);
    let fechaEspanish = fecha.toLocaleDateString('es-ES');
    let diaEspanish = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
    let claseBoton;
    if ( 0 < cantidadDisponible  && cantidadDisponible < 6 )
    {
        claseBoton = "btn-warning";
    }
    else if (cantidadDisponible == 0)
    {
        claseBoton = "btn-danger";
    }
    else
    {
        claseBoton = "btn-primary";
    }
    return  `
            <div class="boton-funcion btn ${claseBoton}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${funcion.funcionId}">
                <p>${diaEspanish} ${fechaEspanish}</p>
                <p>${funcion.horario}</p>
            </div>
            `
}          