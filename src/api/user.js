import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    login(formData) {
        return HTTP.post('/login', {
            email: formData.email,
            password: formData.password
        });
    },
    logout() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('logout', {headers: headers});
    },
    getProfile() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/me', { headers: headers });
    },
    updateProfile(profile) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/me', profile, { headers: headers });
    },
    resetPassword(email) {
        return HTTP.post('/user/password/reset', {
            email: email
        });
    },
    checkProfile() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/me/status', { headers: headers });
    },
}