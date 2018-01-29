import axios from '../config/axios'

const HTTP = axios.instance

export default {
    list (requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('/logs', { params: requestParams, headers: headers })
    },
    showLog (activityLogId) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('/logs/' + activityLogId, {headers: headers})
    }
}
