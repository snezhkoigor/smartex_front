import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'

export const list = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/logs',
            {
                params: requestParams,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_ACTIVITY_LOGS_LIST_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_ACTIVITY_LOGS_LIST_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_ACTIVITY_LOGS_LIST_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const show = ({commit}, logId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/logs/' + logId,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('ACTIVITY_LOG_SHOW_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('ACTIVITY_LOG_SHOW_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('ACTIVITY_LOG_SHOW_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING')
}
