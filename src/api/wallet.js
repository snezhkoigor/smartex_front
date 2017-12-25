import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    getById(wallet) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/wallets/' + wallet.id, {headers: headers});
    },
    getFormMeta() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/meta/wallets/', {headers: headers});
    },
    list(requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/wallets/', {params: requestParams, headers: headers});
    },
    add(wallet) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/wallets', wallet, {headers: headers});
    },
    edit(wallet) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/wallets/' + wallet.id, wallet, {headers: headers});
    },
    check(wallet) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/wallets/check', wallet, {headers: headers});
    },
    delete(wallet) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.delete('/wallets/' + wallet.id, {headers: headers});
    }
}