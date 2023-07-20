export default {
    getCookie(key) {
        let cookies = document.cookie;
        let value = undefined; 
        cookies = cookies.split(';');
        
        cookies.forEach(cookie => {
            cookie = cookie.split(":")
            let cookieKey = cookie[0];
    
            if (key == cookieKey) {
                value = cookie[1];
            }
        });
    
        return value;
    },
    setCookie(key, value) {
        let cookies = document.cookie;
        let cookie = `"${key}":"${value}";`;

        cookies += cookie;
        document.cookie = cookies;
    }
}