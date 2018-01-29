import api from '../api/wallet'
import router from '../router/router'
import ErrorsHelper from '../helpers/errors'
import HttpHelper from '../helpers/http'

const GET_WALLET_LIST = 'GET_WALLET_LIST'
const GET_WALLET_LIST_SUCCESS = 'GET_WALLET_LIST_SUCCESS'
const GET_WALLET_LIST_FAIL = 'GET_WALLET_LIST_FAIL'

const GET_META = 'GET_META'
const GET_META_SUCCESS = 'GET_META_SUCCESS'
const GET_META_FAIL = 'GET_META_FAIL'

const GET_WALLET_BY_ID = 'GET_WALLET_BY_ID'
const GET_WALLET_BY_ID_SUCCESS = 'GET_WALLET_BY_ID_SUCCESS'
const GET_WALLET_BY_ID_FAIL = 'GET_WALLET_BY_ID_FAIL'

const WALLET_CHECK = 'WALLET_CHECK'
const WALLET_CHECK_SUCCESS = 'WALLET_CHECK_SUCCESS'
const WALLET_CHECK_FAIL = 'WALLET_CHECK_FAIL'

const WALLETS_ADD = 'WALLETS_ADD'
const WALLETS_ADD_SUCCESS = 'WALLETS_ADD_SUCCESS'
const WALLETS_ADD_FAIL = 'WALLETS_ADD_FAIL'

const WALLETS_EDIT = 'WALLETS_EDIT'
const WALLETS_EDIT_SUCCESS = 'WALLETS_EDIT_SUCCESS'
const WALLETS_EDIT_FAIL = 'WALLETS_EDIT_FAIL'

const WALLETS_DELETE = 'WALLETS_DELETE'
const WALLETS_DELETE_SUCCESS = 'WALLETS_DELETE_SUCCESS'
const WALLETS_DELETE_FAIL = 'WALLETS_DELETE_FAIL'

const RESET_PENDING = 'RESET_PENDING'

const state = {
    meta: {},
    wallets: [],
    wallet: null,
    pending: false,
    checkPending: false
}

const actions = {
    getById ({ commit, dispatch }, wallet) {
        return new Promise((resolve, reject) => {
            commit(GET_WALLET_BY_ID)

            api.getById(wallet).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_WALLET_BY_ID_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(GET_WALLET_BY_ID_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(GET_WALLET_BY_ID_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    getFormMeta ({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            commit(GET_META)

            api.getFormMeta().then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_META_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(GET_META_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(GET_META_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    list ({ commit, dispatch }, requestParams) {
        return new Promise((resolve, reject) => {
            commit(GET_WALLET_LIST)

            api.list(requestParams).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_WALLET_LIST_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(GET_WALLET_LIST_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(GET_WALLET_LIST_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    check ({commit}, wallet) {
        return new Promise((resolve, reject) => {
            commit(WALLET_CHECK)

            api.check(wallet).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(WALLET_CHECK_SUCCESS)
                    resolve(response)
                }
                else {
                    commit(WALLET_CHECK_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(WALLET_CHECK_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    add ({commit}, wallet) {
        return new Promise((resolve, reject) => {
            commit(WALLETS_ADD)

            api.add(wallet).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(WALLETS_ADD_SUCCESS)
                    resolve(response)
                }
                else {
                    commit(WALLETS_ADD_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(WALLETS_ADD_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    edit ({commit}, wallet) {
        return new Promise((resolve, reject) => {
            commit(WALLETS_EDIT)

            api.edit(wallet).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(WALLETS_EDIT_SUCCESS)
                    resolve(response)
                }
                else {
                    commit(WALLETS_EDIT_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(WALLETS_EDIT_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    delete ({commit}, wallet) {
        return new Promise((resolve, reject) => {
            commit(WALLETS_DELETE)

            api.delete(wallet).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(WALLETS_DELETE_SUCCESS)
                    resolve(response)
                }
                else {
                    commit(WALLETS_DELETE_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(WALLETS_DELETE_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    resetPending ({ commit }) {
        commit(RESET_PENDING)
    }
}

const mutations = {
    RESET_PENDING (state) {
        state.wallets = []
        state.wallet = null
        state.pending = false
        state.checkPending = false
    },

    GET_WALLET_LIST (state) {
        state.pending = true
    },
    GET_WALLET_LIST_SUCCESS (state, responseData) {
        state.wallets = responseData.data
        state.wallet = null
        state.meta = responseData.meta
        state.pending = false
    },
    GET_WALLET_LIST_FAIL (state) {
        state.wallets = []
        state.wallet = null
        state.pending = false
        state.meta = null
    },

    GET_META (state) {
        state.pending = true
    },
    GET_META_SUCCESS (state, responseData) {
        state.meta = responseData.meta
        state.pending = false
    },
    GET_META_FAIL (state) {
        state.pending = false
        state.meta = null
    },

    GET_WALLET_BY_ID (state) {
        state.pending = true
    },
    GET_WALLET_BY_ID_SUCCESS (state, responseData) {
        state.wallets = []
        state.wallet = responseData.data
        state.meta = responseData.meta
        state.pending = false
    },
    GET_WALLET_BY_ID_FAIL (state) {
        state.wallets = []
        state.wallet = null
        state.pending = false
        state.meta = null
    },

    WALLET_CHECK (state) {
        state.checkPending = true
    },
    WALLET_CHECK_SUCCESS (state) {
        state.checkPending = false
    },
    WALLET_CHECK_FAIL (state) {
        state.checkPending = false
    },

    WALLETS_ADD (state) {
        state.pending = true
    },
    WALLETS_ADD_SUCCESS (state) {
        state.pending = false
    },
    WALLETS_ADD_FAIL (state) {
        state.pending = false
    },

    WALLETS_EDIT (state) {
        state.pending = true
    },
    WALLETS_EDIT_SUCCESS (state) {
        state.pending = false
    },
    WALLETS_EDIT_FAIL (state) {
        state.pending = false
    },

    WALLETS_DELETE (state) {
        state.pending = true
    },
    WALLETS_DELETE_SUCCESS (state) {
        state.pending = false
    },
    WALLETS_DELETE_FAIL (state) {
        state.pending = false
    }
}

const getters = {
    wallets (state) {
        return state.wallets
    },
    wallet (state) {
        return state.wallet
    },
    meta (state) {
        return state.meta
    },
    pending (state) {
        return state.pending
    },
    checkPending (state) {
        return state.checkPending
    }
}

const namespaced = true

export default {
    namespaced,
    state,
    actions,
    mutations,
    getters
}
