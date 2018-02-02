import axios from '../config/axios'

const HTTP = axios.instance

export default {
    getById (commission) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('/commissions/' + commission.id, {headers: headers})
    },
    list (requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('/commissions/', {params: requestParams, headers: headers})
    },
    getFormMeta () {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('/meta/commissions/', {headers: headers})
    },
    add (commission) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.post('/commissions', commission, {headers: headers})
    },
    edit (commission) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.put('/commissions/' + commission.id, commission, {headers: headers})
    },
    delete (commission) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.delete('/commissions/' + commission.id, {headers: headers})
    }
}
