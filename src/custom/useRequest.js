import { useState } from 'react';

export default function useRequest( token ) {

    const url = 'http://localhost:8000/api/';

    const [ responseArray, setResponseArray ] = useState([]);
    
    const handleRequest = async (route, petition, data) => {
        setResponseArray({ route, petition, data });
        return responseArray
        // const response = await fetch(`${url}${route}`,{
        //     method: petition,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: JSON.stringify(data)
        // })
        // setResponseArray(await (response).json());
        // return (responseArray, await(response).status);
    }

    
    // return fetch(`http://127.0.0.1:8000/api/${route}`, {
    //     method: petition,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(data => data.json())
    return {
        responseArray,
        handleRequest
    }
}