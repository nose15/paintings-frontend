export class AuthError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "Auth Error";
        this.statusCode = statusCode;
    }

    logError() {
        console.error(`${this.statusCode}: ${this.message}`);
    }
}