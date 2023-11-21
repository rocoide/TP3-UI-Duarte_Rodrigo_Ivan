export default async function carta(element){
    return  `
                <div class="contenedor-carta" id=${element.pelicula.peliculaId}>
                    <div class="poster-carta">   
                        <img class="header-img_fondo" src=${element.pelicula.poster} alt="imagen-sala-cine">
                    </div>
                    <div class="descripcion-carta">
                        <h2 class="h2">${element.pelicula.titulo}</h2>
                    </div>
                </div>
            `
}