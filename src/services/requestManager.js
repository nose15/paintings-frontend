import { LoginRequest } from "./requests/LoginRequest";
import { LogoutRequest } from "./requests/LogoutRequest";
import { RegisterRequest } from "./requests/RegisterRequest";

export default {
    async logIn(email, password) {
        const loginRequest = new LoginRequest({email: email, password: password});

        try {
            const token = await loginRequest.send();
            setToken(token);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }

        // TODO: Better error handling, once its settled in the backend
    },
}