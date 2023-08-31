export class PaymentError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "Payment Error";
        this.statusCode = statusCode;
    }

    logError() {
        console.error(`${this.statusCode}: ${this.message}`);
    }
}