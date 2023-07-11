export class Request {
    method = "";
    mode = "cors"; 
    cache = "no-cache"; 
    credentials = "omit";
    headers = { 
        "Access-Control-Allow-Origin": "http://localhost:8000/",
        "Content-Type": "application/json" 
    };
    redirect = "follow";
    referrerPolicy = "no-referrer"; 
    body = "";

    constructor(method, data, headers) {
        this.method = method;
        this.body = JSON.stringify(data);
        this.headers = {...this.headers, ...headers};
    }

    async send(url) {
        return await fetch(url, {
            method: this.method,
            mode: this.mode, 
            cache: this.cache, 
            credentials: this.credentials,
            headers: this.headers,
            redirect: this.redirect,
            referrerPolicy: this.referrerPolicy, 
            body: this.body,
        });
    }
}

export default { Request };