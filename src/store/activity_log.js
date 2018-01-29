import api from '../api/activity_log'
import router from '../router/router'
import ErrorsHelper from '../helpers/errors'
import HttpHelper from '../helpers/http'

const GET_ACTIVITY_LOGS_LIST = 'GET_ACTIVITY_LOGS_LIST'
const GET_ACTIVITY_LOGS_LIST_SUCCESS = 'GET_ACTIVITY_LOGS_LIST_SUCCESS'
const GET_ACTIVITY_LOGS_LIST_FAIL = 'GET_ACTIVITY_LOGS_LIST_FAIL'

const ACTIVITY_LOG_SHOW = 'ACTIVITY_LOG_SHOW'
const ACTIVITY_LOG_SHOW_SUCCESS = 'ACTIVITY_LOG_SHOW_SUCCESS'
const ACTIVITY_LOG_SHOW_FAIL = 'ACTIVITY_LOG_SHOW_FAIL'

const RESET_PENDING = 'RESET_PENDING'

const state = {
    activityLogsList: [],
    activityLog: null,
    meta: null,
    pending: false
}

const actions = {
    list ({ commit, dispatch }, requestParams) {
        return new Promise((resolve, reject) => {
            commit(GET_ACTIVITY_LOGS_LIST)

            api.list(requestParams).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_ACTIVITY_LOGS_LIST_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(GET_ACTIVITY_LOGS_LIST_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(GET_ACTIVITY_LOGS_LIST_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    showLog ({commit}, activityLogId) {
        return new Promise((resolve, reject) => {
            commit(ACTIVITY_LOG_SHOW)

            api.showLog(activityLogId).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(ACTIVITY_LOG_SHOW_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(ACTIVITY_LOG_SHOW_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(ACTIVITY_LOG_SHOW_FAIL)
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
        state.pending = false
    },

    GET_ACTIVITY_LOGS_LIST (state) {
        state.pending = true
    },
    GET_ACTIVITY_LOGS_LIST_SUCCESS (state, responseData) {
        state.pending = false
        state.activityLogsList = responseData.data
        state.activityLog = null
        state.meta = responseData.meta
    },
    GET_ACTIVITY_LOGS_LIST_FAIL (state) {
        state.pending = false
        state.activityLogsList = []
        state.activityLog = null
        state.meta = null
    },

    ACTIVITY_LOG_SHOW (state) {
        state.pending = true
    },
    ACTIVITY_LOG_SHOW_SUCCESS (state, responseData) {
        state.activityLog = responseData.data
        state.activityLogsList = []
        state.pending = false
    },
    ACTIVITY_LOG_SHOW_FAIL (state) {
        state.pending = false
        state.activityLogsList = []
        state.activityLog = null
    }
}

const getters = {
    activityLogsList (state) {
        return state.activityLogsList
    },
    activityLog (state) {
        return state.activityLog
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
