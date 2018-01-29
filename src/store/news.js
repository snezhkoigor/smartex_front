import api from '../api/news'
import router from '../router/router'
import ErrorsHelper from '../helpers/errors'
import HttpHelper from '../helpers/http'

const GET_NEWS_LIST = 'GET_NEWS_LIST'
const GET_NEWS_LIST_SUCCESS = 'GET_NEWS_LIST_SUCCESS'
const GET_NEWS_LIST_FAIL = 'GET_NEWS_LIST_FAIL'

const GET_NEWS_BY_ID = 'GET_NEWS_BY_ID'
const GET_NEWS_BY_ID_SUCCESS = 'GET_NEWS_BY_ID_SUCCESS'
const GET_NEWS_BY_ID_FAIL = 'GET_NEWS_BY_ID_FAIL'

const NEWS_ADD = 'NEWS_ADD'
const NEWS_ADD_SUCCESS = 'NEWS_ADD_SUCCESS'
const NEWS_ADD_FAIL = 'NEWS_ADD_FAIL'

const NEWS_EDIT = 'NEWS_EDIT'
const NEWS_EDIT_SUCCESS = 'NEWS_EDIT_SUCCESS'
const NEWS_EDIT_FAIL = 'NEWS_EDIT_FAIL'

const NEWS_DELETE = 'NEWS_DELETE'
const NEWS_DELETE_SUCCESS = 'NEWS_DELETE_SUCCESS'
const NEWS_DELETE_FAIL = 'NEWS_DELETE_FAIL'

const RESET_PENDING = 'RESET_PENDING'

const state = {
    newsList: [],
    news: [],
    meta: null,
    pending: false
}

const actions = {
    getById ({ commit, dispatch }, newsId) {
        return new Promise((resolve, reject) => {
            commit(GET_NEWS_BY_ID)

            api.getById(newsId).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_NEWS_BY_ID_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(GET_NEWS_BY_ID_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(GET_NEWS_BY_ID_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    list ({ commit, dispatch }, requestParams) {
        return new Promise((resolve, reject) => {
            commit(GET_NEWS_LIST)

            api.list(requestParams).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_NEWS_LIST_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(GET_NEWS_LIST_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(GET_NEWS_LIST_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    add ({commit}, news) {
        return new Promise((resolve, reject) => {
            commit(NEWS_ADD)

            api.add(news).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(NEWS_ADD_SUCCESS)
                    resolve(response)
                }
                else {
                    commit(NEWS_ADD_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(NEWS_ADD_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    edit ({commit}, news) {
        return new Promise((resolve, reject) => {
            commit(NEWS_EDIT)

            api.edit(news).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(NEWS_EDIT_SUCCESS)
                    resolve(response)
                }
                else {
                    commit(NEWS_EDIT_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(NEWS_EDIT_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    delete ({commit}, news) {
        return new Promise((resolve, reject) => {
            commit(NEWS_DELETE)

            api.delete(news).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(NEWS_DELETE_SUCCESS)
                    resolve(response)
                }
                else {
                    commit(NEWS_DELETE_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(NEWS_DELETE_FAIL)
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

    GET_NEWS_LIST (state) {
        state.pending = true
    },
    GET_NEWS_LIST_SUCCESS (state, responseData) {
        state.pending = false
        state.newsList = responseData.data
        state.news = null
        state.meta = responseData.meta
    },
    GET_NEWS_LIST_FAIL (state) {
        state.pending = false
        state.newsList = []
        state.news = null
        state.meta = null
    },

    GET_NEWS_BY_ID (state) {
        state.pending = true
    },
    GET_NEWS_BY_ID_SUCCESS (state, responseData) {
        state.pending = false
        state.newsList = []
        state.news = responseData.data
    },
    GET_NEWS_BY_ID_FAIL (state) {
        state.pending = false
        state.newsList = []
        state.news = null
    },

    NEWS_ADD (state) {
        state.pending = true
    },
    NEWS_ADD_SUCCESS (state) {
        state.pending = false
    },
    NEWS_ADD_FAIL (state) {
        state.pending = false
    },

    NEWS_EDIT (state) {
        state.pending = true
    },
    NEWS_EDIT_SUCCESS (state) {
        state.pending = false
    },
    NEWS_EDIT_FAIL (state) {
        state.pending = false
    },

    NEWS_DELETE (state) {
        state.pending = true
    },
    NEWS_DELETE_SUCCESS (state) {
        state.pending = false
    },
    NEWS_DELETE_FAIL (state) {
        state.pending = false
    }
}

const getters = {
    newsList (state) {
        return state.newsList
    },
    news (state) {
        return state.news
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
