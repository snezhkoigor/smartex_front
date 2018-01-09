import axios from 'axios';

let instance = axios.create({
    baseURL: (process.env.NODE_ENV === 'production' ? 'http://smartexapi.vlevels.ru/api' : 'http://api.smartex/api'),
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
    timeout: 5000, // 5 sec
    // `cancelToken` specifies a cancel token that can be used to cancel the request
    // (see Cancellation section below for details)
    // cancelToken: new CancelToken(function (cancel) {
    // })
});

export default {
    instance
}