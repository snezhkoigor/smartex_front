import api from '../api/commission'
import router from '../router/router'
import ErrorsHelper from '../helpers/errors'
import HttpHelper from '../helpers/http'

const GET_COMMISSION_LIST = 'GET_COMMISSION_LIST'
const GET_COMMISSION_LIST_SUCCESS = 'GET_COMMISSION_LIST_SUCCESS'
const GET_COMMISSION_LIST_FAIL = 'GET_COMMISSION_LIST_FAIL'

const GET_META = 'GET_META'
const GET_META_SUCCESS = 'GET_META_SUCCESS'
const GET_META_FAIL = 'GET_META_FAIL'

const GET_COMMISSION_BY_ID = 'GET_COMMISSION_BY_ID'
const GET_COMMISSION_BY_ID_SUCCESS = 'GET_COMMISSION_BY_ID_SUCCESS'
const GET_COMMISSION_BY_ID_FAIL = 'GET_COMMISSION_BY_ID_FAIL'

const COMMISSION_ADD = 'COMMISSION_ADD'
const COMMISSION_ADD_SUCCESS = 'COMMISSION_ADD_SUCCESS'
const COMMISSION_ADD_FAIL = 'COMMISSION_ADD_FAIL'

const COMMISSION_EDIT = 'COMMISSION_EDIT'
const COMMISSION_EDIT_SUCCESS = 'COMMISSION_EDIT_SUCCESS'
const COMMISSION_EDIT_FAIL = 'COMMISSION_EDIT_FAIL'

const COMMISSION_DELETE = 'COMMISSION_DELETE'
const COMMISSION_DELETE_SUCCESS = 'COMMISSION_DELETE_SUCCESS'
const COMMISSION_DELETE_FAIL = 'COMMISSION_DELETE_FAIL'

const RESET_PENDING = 'RESET_PENDING'

const state = {
    meta: {},
    commissions: [],
    commission: null,
    pending: false
}

const actions = {
    getById ({ commit, dispatch }, commission) {
        return new Promise((resolve, reject) => {
            commit(GET_COMMISSION_BY_ID)

            api.getById(commission).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_COMMISSION_BY_ID_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(GET_COMMISSION_BY_ID_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(GET_COMMISSION_BY_ID_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    list ({ commit, dispatch }, requestParams) {
        return new Promise((resolve, reject) => {
            commit(GET_COMMISSION_LIST)

            api.list(requestParams).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_COMMISSION_LIST_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(GET_COMMISSION_LIST_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(GET_COMMISSION_LIST_FAIL)
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
    add ({commit}, commission) {
        return new Promise((resolve, reject) => {
            commit(COMMISSION_ADD)

            api.add(commission).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(COMMISSION_ADD_SUCCESS)
                    resolve(response)
                }
                else {
                    commit(COMMISSION_ADD_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(COMMISSION_ADD_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    edit ({commit}, commission) {
        return new Promise((resolve, reject) => {
            commit(COMMISSION_EDIT)

            api.edit(commission).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(COMMISSION_EDIT_SUCCESS)
                    resolve(response)
                }
                else {
                    commit(COMMISSION_EDIT_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(COMMISSION_EDIT_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    delete ({commit}, commission) {
        return new Promise((resolve, reject) => {
            commit(COMMISSION_DELETE)

            api.delete(commission).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(COMMISSION_DELETE_SUCCESS)
                    resolve(response)
                }
                else {
                    commit(COMMISSION_DELETE_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(COMMISSION_DELETE_FAIL)
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
        state.commissions = []
        state.commission = null
        state.pending = false
        state.checkPending = false
    },

    GET_COMMISSION_LIST (state) {
        state.pending = true
    },
    GET_COMMISSION_LIST_SUCCESS (state, responseData) {
        state.commissions = responseData.data
        state.commission = null
        state.meta = responseData.meta
        state.pending = false
    },
    GET_COMMISSION_LIST_FAIL (state) {
        state.commissions = []
        state.commission = null
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

    GET_COMMISSION_BY_ID (state) {
        state.pending = true
    },
    GET_COMMISSION_BY_ID_SUCCESS (state, responseData) {
        state.commissions = []
        state.commission = responseData.data
        state.meta = responseData.meta
        state.pending = false
    },
    GET_COMMISSION_BY_ID_FAIL (state) {
        state.commissions = []
        state.commission = null
        state.pending = false
        state.meta = null
    },

    COMMISSION_ADD (state) {
        state.pending = true
    },
    COMMISSION_ADD_SUCCESS (state) {
        state.pending = false
    },
    COMMISSION_ADD_FAIL (state) {
        state.pending = false
    },

    COMMISSION_EDIT (state) {
        state.pending = true
    },
    COMMISSION_EDIT_SUCCESS (state) {
        state.pending = false
    },
    COMMISSION_EDIT_FAIL (state) {
        state.pending = false
    },

    COMMISSION_DELETE (state) {
        state.pending = true
    },
    COMMISSION_DELETE_SUCCESS (state) {
        state.pending = false
    },
    COMMISSION_DELETE_FAIL (state) {
        state.pending = false
    }
}

const getters = {
    commissions (state) {
        return state.commissions
    },
    commission (state) {
        return state.commission
    },
    meta (state) {
        return state.meta
    },
    pending (state) {
        return state.pending
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
