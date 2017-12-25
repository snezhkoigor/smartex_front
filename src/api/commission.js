import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    list(requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/commissions/', {params: requestParams, headers: headers});
    }
}