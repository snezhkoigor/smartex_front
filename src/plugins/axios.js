import axios from 'axios'
import _envLocal from '../../env'

axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? _envLocal.APP_API_URL : 'http://api.smartex/api')
axios.defaults.validateStatus = (status) => {
    return status >= 200 && status < 500
}
// axios.defaults.timeout = 10000

export default ({ Vue }) => {
    Vue.prototype.$axios = axios
}
