import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    login(formBody) {
        let data = {
            email: formBody.email,
            password: formBody.password
        };

        return HTTP.post('/login', data);
    },
    logout() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('logout', {headers: headers});
    },
    profile() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/me', { headers: headers });
    },
    resetPassword(formBody) {
        return HTTP.post('/new/password', {
            email: formBody.email
        });
    },
    checkProfile() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/me/status', { headers: headers });
    },
}