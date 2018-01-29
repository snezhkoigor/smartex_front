import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'

export const getById = ({ commit }, walletId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/wallets/' + walletId,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_WALLET_BY_ID_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_WALLET_BY_ID_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_WALLET_BY_ID_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const list = ({commit}, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/wallets',
            {
                params: requestParams,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_WALLET_LIST_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_WALLET_LIST_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_WALLET_LIST_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const getFormMeta = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/meta/wallets',
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

export const check = ({commit}, wallet) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.post(
            '/wallets/check',
            wallet,
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

export const add = ({commit}, wallet) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.post(
            '/wallets',
            wallet,
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

export const edit = ({commit}, wallet) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.post(
            '/wallets/' + wallet.id,
            wallet,
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

export const remove = ({commit}, walletId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.delete(
            '/wallets/' + walletId,
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

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING')
}
