import axios from '../config/axios'

const HTTP = axios.instance

export default {
    list (requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.get('/courses', {params: requestParams, headers: headers})
    },
    edit (course) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

        return HTTP.put('/courses/' + course.id, course, {headers: headers})
    }
}
