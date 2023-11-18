export default function botonFuncion(funcion)
{
    let fecha = new Date(funcion.fecha);
    let fechaEspanish = fecha.toLocaleDateString('es-ES');
    let diaEspanish = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
    return  `
            <div class="boton-funcion btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${funcion.funcionId}">
                <p>${diaEspanish} ${fechaEspanish}</p>
                <p>${funcion.horario}</p>
            </div>
            `
}          