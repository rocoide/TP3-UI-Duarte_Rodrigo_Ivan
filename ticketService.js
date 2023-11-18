window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    const funcion = urlParams.get('funcion');
    const usuario = urlParams.get('usuario');
    const cantidad = urlParams.get('cantidad');
    console.log(funcion);
    console.log(usuario);
    console.log(cantidad);
};