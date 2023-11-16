export default async function datos(pelicula)
{
    return  `
            <div class="datos-pelicula">     
                <p>${pelicula.titulo}</p>           
                <p>${pelicula.genero.nombre}</p>
            </div>
            `
}