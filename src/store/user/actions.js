import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'

export const getById = ({ commit }, userId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/users/' + userId,
            {
                params: {include: 'roles'},
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_USER_BY_ID_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_USER_BY_ID_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_USER_BY_ID_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const list = ({commit}, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/users',
            {
                params: requestParams,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_USERS_LIST_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_USERS_LIST_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_USERS_LIST_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const getFormMeta = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/meta/users',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_META_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_META_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_META_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const add = ({commit}, user) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.post(
            '/users',
            user,
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

export const edit = ({commit}, user) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.put(
            '/users/' + user.id,
            user,
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
                commit('RESET_PENDING', response.data)
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

export const remove = ({commit}, userId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.delete(
            '/users/' + userId,
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

export const logout = ({ commit }) => {
    commit('LOGOUT')
}

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING')
}
