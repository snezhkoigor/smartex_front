import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'

export const login = ({ commit }, formData) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.post(
            '/login',
            {
                email: formData.email,
                password: formData.password
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('LOGIN_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('LOGIN_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('LOGIN_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const getProfile = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/me',
            {
                params: requestParams,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_PROFILE_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_PROFILE_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_PROFILE_FAIL')
            commit('LOGOUT')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const updateProfile = ({ commit }, profile) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.put(
            '/me',
            profile,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('PROFILE_UPDATE_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('PROFILE_UPDATE_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('PROFILE_UPDATE_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const resetPassword = ({ commit }, email) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.post(
            '/user/password/reset',
            {
                email: email
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PASSWORD_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('RESET_PENDING')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('RESET_PENDING')
            commit('LOGOUT')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const logout = ({ commit }) => {
    console.log('1')
    commit('LOGOUT')
}

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING')
}
