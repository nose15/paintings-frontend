const API_URL = "http://localhost:8000/api/";

async function postData(path="", data={}) {
    const response = await fetch(API_URL + path, {
        method: "POST",
        mode: "cors", 
        cache: "no-cache", 
        credentials: "omit",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8000/",
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data)
    });

    return response;
}

export default { postData, }
