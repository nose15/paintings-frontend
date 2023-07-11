import { Request } from './Request';

export class RegisterRequest extends Request {
    constructor(data) {
        const requestData = {...data, phone:"997997997", data:"YoYoYo"} // its here because the api requires it but we decided to change it so until the backend changes it, it has to be like this 
        super("POST", requestData, {});
    }

    async send() {
        const response = await super.send("http://localhost:8000/api/register")
        
        if (response.ok) {
            return await response.json();
        }
        else {
            // once the errors are consistent, error handling will be added
            throw new Error("Something went wrong");
        } 
    }
}