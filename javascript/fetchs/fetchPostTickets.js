export default async function postTickets(funcion, usuario, cantidad)
{
    let config = {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "cantidad": cantidad,
            "usuario": usuario
        }),
    }
    try 
    { 
        const response = await fetch
        (
            `https://localhost:7220/api/v1/Funcion/${funcion}/tickets`, config
        );
        let result = await response.json();
        return result;
    }
    catch (error) 
    {
        console.log(error);
    }
}