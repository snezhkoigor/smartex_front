import axios from '../config/axios'

const HTTP = axios.instance

export default {
    totalRegistrations () {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('/widgets/clients/totalRegistrations', {headers: headers})
    },
    totalRegistrationsAndActivations (period) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('/widgets/clients/totalRegistrationsAndActivations/' + period, {headers: headers})
    }
}
