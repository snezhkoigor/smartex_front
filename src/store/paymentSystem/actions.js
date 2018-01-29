import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'

export const getById = ({ commit }, paymentSystemId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/payment_systems/' + paymentSystemId,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_PAYMENT_SYSTEM_BY_ID_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_PAYMENT_SYSTEM_BY_ID_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_PAYMENT_SYSTEM_BY_ID_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const list = ({commit}, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/payment_systems',
            {
                params: requestParams,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_PAYMENT_SYSTEM_LIST_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_PAYMENT_SYSTEM_LIST_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_PAYMENT_SYSTEM_LIST_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING')
}
