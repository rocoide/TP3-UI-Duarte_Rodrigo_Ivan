export default async function peliculaById (dato){
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
            `https://localhost:7220/api/v1/Peliculas/${dato}`, config
        );
        return response;
    }
    catch (error) 
    {
      console.log(error);
    }
}