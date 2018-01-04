import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    totalRegistrations() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/widgets/clients/totalRegistrations', {headers: headers});
    },
    totalRegistrationsAndActivations(period) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/widgets/clients/totalRegistrationsAndActivations/' + period, {headers: headers});
    },
}