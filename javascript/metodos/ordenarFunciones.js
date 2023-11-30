export default async function ordenarFunciones(pelicula)
{
    let aux;
    let listaOrdenada = [pelicula.funciones[0]];
    let funcionActual;
    for (let index = 1; index < pelicula.funciones.length; index++) 
    {
        funcionActual = pelicula.funciones[index];
        for (let index2 = 0; index2 < listaOrdenada.length; index2++) 
        {
            if(listaOrdenada[index2].fecha >  funcionActual.fecha)
            {
                aux = listaOrdenada[index2];
                listaOrdenada[index2] = funcionActual;
                funcionActual = aux; 
            }
            else if (listaOrdenada[index2].fecha === funcionActual.fecha)
            {
                if(listaOrdenada[index2].horario > funcionActual.horario)
                {
                    aux = listaOrdenada[index2];
                    listaOrdenada[index2] = funcionActual;
                    funcionActual = aux;
                }
            };
        }; 
        listaOrdenada.push(funcionActual); 
    };
    return listaOrdenada;
}