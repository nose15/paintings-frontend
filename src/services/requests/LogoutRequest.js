import { Request } from './Request';

export class LogoutRequest extends Request {
    constructor(token) {
        super("POST", {}, {"Authorization" : `Bearer ${token}`, "Accept":"application/json" });
    }

    async send() {
        const response = await super.send("http://localhost:8000/api/logout")
    
        if (response.ok) {
            return response;
        }
        else {
            // once the errors are consistent, error handling will be added
            throw new Error("Something went wrong");
        } 
    }
}