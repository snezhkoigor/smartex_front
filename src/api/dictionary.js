import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    list() {
        return HTTP.get('/dictionary')
    }
}