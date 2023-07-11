export class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "Api Error";
        this.statusCode = statusCode;
    }

    logError() {
        console.error(`${this.statusCode}: ${this.message}`);
    }
}