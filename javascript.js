window.onload = async function ()  {
    await funciones("","","");
};

const funciones = async (titulo, fecha, generoId) => 
    {
    const config = {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json'
        },
    };
    try 
    {
        const response = await fetch
        (
            `https://localhost:7220/api/v1/Funcion?titulo=${titulo}&fecha=${fecha}&genero=${generoId}`, config
        );
        const result = await response.json();
        console.log(result);
        return result;
    } 
    catch (error) 
    {
      console.log(error);
    }
  };