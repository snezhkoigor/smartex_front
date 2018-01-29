import axios from '../config/axios'

const HTTP = axios.instance

export default {
    getById (paymentSystemId) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        }

        return HTTP.get('/payment_systems/' + paymentSystemId, {headers: headers})
    },
    list (requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        }

        return HTTP.get('/payment_systems', {params: requestParams, headers: headers})
    }
}
