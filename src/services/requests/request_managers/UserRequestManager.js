export class UserRequestManager {
    constructor(httpClient) {
        this.client = httpClient;
    }

    async logInAsync(email, password) {
        const requestData = {
            email: email,
            password: password
        };

        const response = await this.client.postAsync("/login", {}, requestData);

        if (response.ok) {
            const response = await response.json();
            console.log(response);
            return response.token;
        }
        else {
            await response.status.then((status) => { throw new Error(`${status}`)});
            return false;
        }
    }

    async logOutAsync() {
        const response = await this.client.postAsync("/logout", {"Accept":"application/json"}, {});

        if (response.ok) {
            console.log('logged out');
            return true;
        }
        else {
            await response.status.then((status) => { throw new Error(`${status}`)});
            return false;
        }

    }

    async registerAsync(data) {
        const requestData = {
            ...data, 
            phone:"997997997", 
            data:"YoYoYo"
        };

        const response = await this.client.postAsync("/register", {}, requestData);

        if (response.ok) {
            console.log('registered');
            return true;
        }
        else {
            await response.status.then((status) => { throw new Error(`${status}`)});
            return false;
        }
    }

}