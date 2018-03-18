import axios from 'axios'

axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? 'http://api.cryptocoinoficina.com/api' : 'http://api.smartex/api')
axios.defaults.validateStatus = (status) => {
    return status >= 200 && status < 500
}
// axios.defaults.timeout = 10000

export default ({ Vue }) => {
    Vue.prototype.$axios = axios
}
