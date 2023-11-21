export default async function agregarEnlanceDescripcion ()
{
    const listaContenedores = document.querySelectorAll(".contenedor-carta");
    listaContenedores.forEach(element => 
    {
        element.addEventListener("click", () => 
        {
            window.location.href = `./descripcion.html?dato=${element.id}`;
        });
    });
};