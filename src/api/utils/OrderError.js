export class OrderError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "Order Error";
        this.statusCode = statusCode;
    }

    logError() {
        console.error(`${this.statusCode}: ${this.message}`);
    }
}