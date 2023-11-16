export default async function poster(link)
{
    return  `
            <div class="contenedor-imagen">
                <img src="${link}" class="imagen-poster" alt="Poster de la pelicula">
            </div>
            `
}