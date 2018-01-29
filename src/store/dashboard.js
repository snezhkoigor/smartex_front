import api from '../api/dashboard'
import router from '../router/router'
import ErrorsHelper from '../helpers/errors'
import HttpHelper from '../helpers/http'

const GET_TOTAL_REGISTRATIONS = 'GET_TOTAL_REGISTRATIONS'
const GET_TOTAL_REGISTRATIONS_SUCCESS = 'GET_TOTAL_REGISTRATIONS_SUCCESS'
const GET_TOTAL_REGISTRATIONS_FAIL = 'GET_TOTAL_REGISTRATIONS_FAIL'

const GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS = 'GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS'
const GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_SUCCESS = 'GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_SUCCESS'
const GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_FAIL = 'GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_FAIL'

const RESET_PENDING = 'RESET_PENDING'

const state = {
    totalRegistrationsItems: null,
    totalRegistrationPending: false,
    totalRegistrationsAndActivationsItems: null,
    totalRegistrationsAndActivationsPending: false
}

const actions = {
    totalRegistrations ({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            commit(GET_TOTAL_REGISTRATIONS)

            api.totalRegistrations().then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_TOTAL_REGISTRATIONS_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(GET_TOTAL_REGISTRATIONS_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(GET_TOTAL_REGISTRATIONS_FAIL)
                reject(errors)

                ErrorsHelper.goByStatusCode(500, router)
            })
        })
    },
    totalRegistrationsAndActivations ({ commit, dispatch }, period) {
        return new Promise((resolve, reject) => {
            commit(GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS)

            api.totalRegistrationsAndActivations(period).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_SUCCESS, response.data)
                    resolve(response)
                }
                else {
                    commit(GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_FAIL)
                    reject(ErrorsHelper.getMessage(response))

                    ErrorsHelper.goByStatusCode(response.status, router)
                }
            }, errors => {
                commit(GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_FAIL)
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
        state.totalRegistrationPending = false
    },

    GET_TOTAL_REGISTRATIONS (state) {
        state.totalRegistrationPending = true
    },
    GET_TOTAL_REGISTRATIONS_SUCCESS (state, responseData) {
        state.totalRegistrationPending = false
        state.totalRegistrationsItems = responseData.data
    },
    GET_TOTAL_REGISTRATIONS_FAIL (state) {
        state.totalRegistrationPending = false
        state.totalRegistrationsItems = null
    },

    GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS (state) {
        state.totalRegistrationsAndActivationsPending = true
    },
    GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_SUCCESS (state, responseData) {
        state.totalRegistrationsAndActivationsPending = false
        state.totalRegistrationsAndActivationsItems = responseData.data
    },
    GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_FAIL (state) {
        state.totalRegistrationsAndActivationsPending = false
        state.totalRegistrationsAndActivationsItems = null
    }
}

const getters = {
    totalRegistrationsItems (state) {
        return state.totalRegistrationsItems
    },
    totalRegistrationPending (state) {
        return state.totalRegistrationPending
    },
    totalRegistrationsAndActivationsItems (state) {
        return state.totalRegistrationsAndActivationsItems
    },
    totalRegistrationsAndActivationsPending (state) {
        return state.totalRegistrationsAndActivationsPending
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
