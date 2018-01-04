import axios from 'axios';

let instance = axios.create({
    baseURL: (process.env.NODE_ENV === 'production' ? 'http://api.goloption.com/api' : 'http://api.golopt/api'),
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
    },
    validateStatus: function (status) {
        return status >= 200 && status < 500; // default
    },
    // `transformResponse` allows changes to the response data to be made before
    // it is passed to then/catch
    // transformResponse: [function (data) {
    //     // Do whatever you want to transform the data
    //
    //     return data;
    // }],
    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    // timeout: 1000,
});

export default {
    instance
}