import { Request } from './Request';

export class LoginRequest extends Request {
    constructor(data) {
        super("POST", data, {});
    }

    async send() {
        const response = await super.send("http://localhost:8000/api/login")

        if (response.ok) {
            const token = await response.json();
            return token.token;
        }
        else {
            // once the errors are consistent, error handling will be added
            throw new Error("Something went wrong");
        } 
    }
}
