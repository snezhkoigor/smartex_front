import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    getById(newsId) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/news/' + newsId, {headers: headers});
    },
    list(requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/news', {params: requestParams, headers: headers});
    },
    add(news) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/news', news, {headers: headers});
    },
    edit(news) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.put('/news/' + news.id, news, {headers: headers});
    },
    delete(news) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.delete('/news/' + news.id, {headers: headers});
    }
}