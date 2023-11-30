export default async function funcionById (funcionId)
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
            `https://localhost:7220/api/v1/Funcion/${funcionId}`, config
        );
        return response;
    }
    catch (error) 
    {
      console.log(error);
    }
}