import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    add(wallet) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/payment_systems/' + wallet.payment_system_id + '/wallets', wallet, {headers: headers});
    },
    edit(wallet) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/payment_systems/' + wallet.payment_system_id + '/wallets/' + wallet.id, wallet, {headers: headers});
    },
    check(wallet) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/payment_systems/' + wallet.payment_system_id + '/wallets/check', wallet, {headers: headers});
    },
    delete(wallet) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.delete('/payment_systems/' + wallet.payment_system_id + '/wallets/' + wallet.id, {headers: headers});
    }
}