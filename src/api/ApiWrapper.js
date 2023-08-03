import { ApiError } from './utils/ApiError.js'

const config = {
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:8000/api/",
        "Content-Type": "application/json",
    }
}

function configure(options) {
    Object.assign(config, options);
}

async function request(url="", method, headers, data=null) {
    const requestHeaders = {
        ...config.headers,
        ...headers
    }

    const requestUrl = config.baseURL + url
    const requestData = {
        method: method,
        mode: "cors", 
        cache: "no-cache", 
        credentials: "omit",
        headers: requestHeaders,
        redirect: "follow",
        referrerPolicy: "no-referrer", 
    };

    if (data != null) {
        requestData.body = JSON.stringify(data);
    }

    const response = await fetch(requestUrl, requestData);

    if (response.ok) {
        const responseJson = await response.json();
        return responseJson;
    }
    else {
        throw new ApiError(response.status, response.statusText);
    }
}

export const ApiWrapper = { 
    configure,
    get: (url, headers) => request(url, 'GET', headers),
    post: (url, headers, data) => request(url, 'POST', headers, data),
    delete: (url, headers) => request(url, 'DELETE', headers)
}
