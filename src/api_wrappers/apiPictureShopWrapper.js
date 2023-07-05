const API_URL = "http://localhost:8000/api/";

async function postData(path="", data={}, headers={}) {
    const requestHeaders = {
        "Access-Control-Allow-Origin": "http://localhost:8000/",
        "Content-Type": "application/json",
        ...headers
    }
    const url = API_URL + path

    const response = await fetch(url, {
        method: "POST",
        mode: "cors", 
        cache: "no-cache", 
        credentials: "omit",
        headers: requestHeaders,
        redirect: "follow",
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data)
    });

    return response;
}

export default { postData, }
