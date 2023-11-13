export default async function filtrarFunciones(listaFunciones)
{
    let listaFiltrada = [];
    let sinRepetir;
    listaFunciones.forEach(element1 => {
        sinRepetir = true;
        listaFiltrada.forEach(element2 => {
            if(element1.pelicula.titulo === element2.pelicula.titulo)
            {
                sinRepetir = false;
            };  
        });
        if (sinRepetir)
        {
            listaFiltrada.push(element1);
        };
    });
    return listaFiltrada;
}