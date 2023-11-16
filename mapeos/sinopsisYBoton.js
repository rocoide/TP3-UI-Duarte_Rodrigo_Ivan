export default async function sinopsisYBoton(sinopsis)
{
    return  `
            <div class="sinopsis-pelicula">
                <p>${sinopsis}</p>
            </div>
            <button class="boton-funciones">Funciones</button>
            `
}