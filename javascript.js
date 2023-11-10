window.onload = function ()  {
    console.log("Ejecutando funciones iniciales");
    GetFunciones("","","");
};
  
async function GetFunciones(titulo, fecha, genero) {
    console.log("Titulo: ", titulo);
    console.log("Fecha: ", fecha);
    console.log("Genero: ", genero);
    const config = {
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        }
    };
    try{
        let url2 = `https://localhost:7220/api/v1/Funcion?=Titulo$(titulo)`
        let UrlBase = 'https://localhost:7220/api/v1/Funcion'
        if (titulo !== "" || fecha !== "" || genero !== ""){
            UrlBase = UrlBase + "?"
            if (titulo !== "")
            {
                UrlBase = UrlBase + "Titulo=" + titulo; 
            };
            if (fecha !== ""  && titulo !== "")
            {
                UrlBase = UrlBase + "&" + "Fecha=" + fecha;
            }
            else
            {
                if (fecha !== "")
                {
                    UrlBase = UrlBase + "Fecha=$" + fecha;
                }
            }
            if (genero != "" && (fecha !== ""  && titulo !== ""))
            {
                UrlBase = UrlBase + "&" + "GeneroId=" + genero;
            }
            else
            {
                if (genero != "")
                {
                    UrlBase = UrlBase + "GeneroId=" + genero;
                }
            }
        }
        const response = await fetch (UrlBase, config);
        const result = await response.json();
        console.log(result);
    }catch(error){
        console.log(error);
        console.log("hola");
    }
}

document.getElementById("formulario-filtros").addEventListener("submit", function(event) {
    event.preventDefault(); // Previene el envío del formulario por defecto
    let titulo = document.getElementById("titulo").value; // Obtén los valores de los campos de entrada
    let fecha = document.getElementById("fecha").value;
    let genero = document.getElementById("genero").value;
    console.log(titulo);
    GetFunciones(titulo, fecha, genero); // Llama a tu función JavaScript con los datos
    }
);
