import axios from '../config/axios'

const HTTP = axios.instance

export default {
    login (formData) {
        return HTTP.post('/login', {
            email: formData.email,
            password: formData.password
        })
    },
    logout () {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('logout', {headers: headers})
    },
    getProfile (requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('/me', { params: requestParams, headers: headers })
    },
    updateProfile (profile) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.put('/me', profile, { headers: headers })
    },
    resetPassword (email) {
        return HTTP.post('/user/password/reset', {
            email: email
        })
    },
    checkProfile () {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('/me/status', { headers: headers })
    }
}
