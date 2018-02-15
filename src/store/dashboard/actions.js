import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'

export const totalRegistrations = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING_TOTAL_REGISTRATIONS')

        axios.get(
            '/widgets/clients/totalRegistrations',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_TOTAL_REGISTRATIONS_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_TOTAL_REGISTRATIONS_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_TOTAL_REGISTRATIONS_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const totalFinishedExchanges = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING_TOTAL_FINISHED_EXCHANGES')

        axios.get(
            '/widgets/exchanges/totalFinishedExchanges',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_TOTAL_FINISHED_EXCHANGES_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_TOTAL_FINISHED_EXCHANGES_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_TOTAL_FINISHED_EXCHANGES_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const totalNewExchanges = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING_NEW_EXCHANGES')

        axios.get(
            '/widgets/exchanges/totalNewExchanges',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_TOTAL_NEW_EXCHANGES_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_TOTAL_NEW_EXCHANGES_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_TOTAL_NEW_EXCHANGES_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const exchangesDynamic = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING_EXCHANGES_DYNAMIC')

        axios.get(
            '/widgets/exchanges/dynamicByLastMonth',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_EXCHANGES_DYNAMIC_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_EXCHANGES_DYNAMIC_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_EXCHANGES_DYNAMIC_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const totalFinishedInPayments = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING_TOTAL_FINISHED_IN_PAYMENTS')

        axios.get(
            '/widgets/payments/totalFinishedInPayments',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_TOTAL_FINISHED_IN_PAYMENTS_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_TOTAL_FINISHED_IN_PAYMENTS_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_TOTAL_FINISHED_IN_PAYMENTS_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const currenciesInPayments = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING_CURRENCIES_IN_PAYMENTS')

        axios.get(
            '/widgets/payments/currenciesInPaymentsByLastMonth',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_CURRENCIES_IN_PAYMENTS_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_CURRENCIES_IN_PAYMENTS_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_CURRENCIES_IN_PAYMENTS_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const currenciesOutPayments = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING_CURRENCIES_OUT_PAYMENTS')

        axios.get(
            '/widgets/payments/currenciesOutPaymentsByLastMonth',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_CURRENCIES_OUT_PAYMENTS_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_CURRENCIES_OUT_PAYMENTS_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_CURRENCIES_OUT_PAYMENTS_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const favoritesPaymentSystemsByLastMonth = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING_FAVORITES_PAYMENT_SYSTEMS')

        axios.get(
            '/widgets/payment_systems/paymentSystemsPaymentsByLastMonth',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_FAVORITES_PAYMENT_SYSTEMS_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_FAVORITES_PAYMENT_SYSTEMS_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_FAVORITES_PAYMENT_SYSTEMS_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const totalRegistrationsAndActivations = ({ commit }, period) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING_TOTAL_REGISTRATIONS_AND_ACTIVATIONS')

        axios.get(
            '/widgets/clients/totalRegistrationsAndActivations/' + period,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING_TOTAL_REGISTRATIONS')
    commit('RESET_PENDING_TOTAL_REGISTRATIONS_AND_ACTIVATIONS')
}
