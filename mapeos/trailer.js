export default async function trailer(trailer)
{
    return  `
            <div class="contenedor-trailer">
                <iframe class="trailer" src=${trailer} title="YouTube video player"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            `
}