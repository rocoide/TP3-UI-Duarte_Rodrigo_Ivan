export default async function funciones (titulo, fecha, GeneroId){
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
            `https://localhost:7220/api/v1/Funcion?titulo=${titulo}&fecha=${fecha}&GeneroId=${GeneroId}`, config
        );
        return response;
    }
    catch (error) 
    {
      console.log(error);
    }
}