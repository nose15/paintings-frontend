export class HttpClient {
    bearerToken = null;

    constructor(apiURL) {
        this.baseURL = apiURL;
    }

    setBaseURL(newURL) {
        this.baseURL = newURL;
    }

    setBearerToken(token) {
        this.bearerToken = token;
    }

    deleteBearerToken() {
        this.bearerToken = null;
    }

    getBaseURL() {
        return this.baseURL;
    }

    getBearerToken() {
        return this.bearerToken;
    }


    async getAsync(subURL, headers) {
        const url = this.baseURL + subURL;
        var requestHeaders = { 
            "Content-Type": "application/json",
            ...headers
        };

        if (this.bearerToken != null) {
            requestHeaders = {
                "Authentication": `Bearer ${this.bearerToken}`,
                ...requestHeaders
            };
        }

        return await fetch(url, {
            method: "GET",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "omit",
            headers: requestHeaders,
            redirect: "follow",
            referrerPolicy: "no-referrer", 
            body: "",
        });
    }

    async postAsync(subURL, headers, data) {
        const url = this.baseURL + subURL;
        const requestHeaders = { 
            "Authentication": `Bearer ${this.bearerToken}`,
            "Content-Type": "application/json",
            ...headers
        };
        const requestBody = JSON.stringify(data);

        return await fetch(url, {
            method: "GET",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "omit",
            headers: requestHeaders,
            redirect: "follow",
            referrerPolicy: "no-referrer", 
            body: requestBody,
        });

    }

}