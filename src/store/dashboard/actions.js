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
