import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'

export const getById = ({ commit }, paymentId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/payments/' + paymentId,
            {
                params: {
                    include: 'user,paymentSystem'
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_PAYMENT_BY_ID_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_PAYMENT_BY_ID_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_PAYMENT_BY_ID_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const confirm = ({commit}, paymentId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.put(
            '/payments/' + paymentId + '/confirm',
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING')
                resolve(response)
            } else {
                commit('RESET_PENDING')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('RESET_PENDING')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const resetPayment = ({ commit }) => {
    commit('RESET_PAYMENT')
}

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING')
}
