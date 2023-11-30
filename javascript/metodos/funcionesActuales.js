export default async function funcionesActuales(listaFunciones)
{
    let listaActual = [];
    var fechaArgentina = new Date().toISOString();;
    listaFunciones.forEach(element => 
        {
            if (element.fecha > fechaArgentina)
            {
                listaActual.push(element);
            }
        }
    );
    return listaActual;
};