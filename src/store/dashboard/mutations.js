export const RESET_PENDING_TOTAL_REGISTRATIONS = (state) => {
    state.totalRegistrationPending = false
}

export const SET_PENDING_TOTAL_REGISTRATIONS = (state) => {
    state.totalRegistrationPending = true
}

export const RESET_PENDING_TOTAL_REGISTRATIONS_AND_ACTIVATIONS = (state) => {
    state.totalRegistrationsAndActivationsPending = false
}

export const SET_PENDING_TOTAL_REGISTRATIONS_AND_ACTIVATIONS = (state) => {
    state.totalRegistrationsAndActivationsPending = true
}

export const GET_TOTAL_REGISTRATIONS_SUCCESS = (state, responseData) => {
    state.totalRegistrationsItems = responseData.data
    state.totalRegistrationPending = false
    state.pending = false
}

export const GET_TOTAL_REGISTRATIONS_FAIL = (state) => {
    state.totalRegistrationsItems = null
    state.meta = {}
    state.totalRegistrationPending = false
    state.pending = false
}

export const GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_SUCCESS = (state, responseData) => {
    state.totalRegistrationsAndActivationsItems = responseData.data
    state.totalRegistrationsAndActivationsPending = false
    state.pending = false
}

export const GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_FAIL = (state) => {
    state.totalRegistrationsAndActivationsItems = null
    state.totalRegistrationsAndActivationsPending = false
    state.pending = false
}

export const SET_PENDING_TOTAL_FINISHED_EXCHANGES = (state) => {
    state.totalFinishedExchangesPending = true
}

export const GET_TOTAL_FINISHED_EXCHANGES_FAIL = (state) => {
    state.totalFinishedExchangesPending = false
}

export const GET_TOTAL_FINISHED_EXCHANGES_SUCCESS = (state, responseData) => {
    state.totalFinishedExchangesItems = responseData.data
    state.totalFinishedExchangesPending = false
    state.pending = false
}

export const SET_PENDING_NEW_EXCHANGES = (state) => {
    state.totalNewExchangesPending = true
}

export const GET_TOTAL_NEW_EXCHANGES_FAIL = (state) => {
    state.totalNewExchangesPending = false
}

export const GET_TOTAL_NEW_EXCHANGES_SUCCESS = (state, responseData) => {
    state.totalNewExchangesItems = responseData.data
    state.totalNewExchangesPending = false
    state.pending = false
}

export const SET_PENDING_TOTAL_FINISHED_IN_PAYMENTS = (state) => {
    state.totalFinishedInPaymentsPending = true
}

export const GET_TOTAL_FINISHED_IN_PAYMENTS_FAIL = (state) => {
    state.totalFinishedInPaymentsPending = false
}

export const GET_TOTAL_FINISHED_IN_PAYMENTS_SUCCESS = (state, responseData) => {
    state.totalFinishedInPaymentsItems = responseData.data
    state.totalFinishedInPaymentsPending = false
    state.pending = false
}

export const SET_PENDING_CURRENCIES_IN_PAYMENTS = (state) => {
    state.currenciesInPaymentsPending = true
}

export const GET_CURRENCIES_IN_PAYMENTS_FAIL = (state) => {
    state.currenciesInPaymentsPending = false
}

export const GET_CURRENCIES_IN_PAYMENTS_SUCCESS = (state, responseData) => {
    state.currenciesInPaymentsItems = responseData.data
    state.currenciesInPaymentsPending = false
    state.pending = false
}

export const SET_PENDING_CURRENCIES_OUT_PAYMENTS = (state) => {
    state.currenciesOutPaymentsPending = true
}

export const GET_CURRENCIES_OUT_PAYMENTS_FAIL = (state) => {
    state.currenciesOutPaymentsPending = false
}

export const GET_CURRENCIES_OUT_PAYMENTS_SUCCESS = (state, responseData) => {
    state.currenciesOutPaymentsItems = responseData.data
    state.currenciesOutPaymentsPending = false
    state.pending = false
}

export const SET_PENDING_FAVORITES_PAYMENT_SYSTEMS = (state) => {
    state.favoritesPaymentSystemsPending = true
}

export const GET_FAVORITES_PAYMENT_SYSTEMS_FAIL = (state) => {
    state.favoritesPaymentSystemsPending = false
}

export const GET_FAVORITES_PAYMENT_SYSTEMS_SUCCESS = (state, responseData) => {
    state.favoritesPaymentSystemsItems = responseData.data
    state.favoritesPaymentSystemsPending = false
    state.pending = false
}

export const SET_PENDING_EXCHANGES_DYNAMIC = (state) => {
    state.dynamicExchangesPending = true
}

export const GET_EXCHANGES_DYNAMIC_FAIL = (state) => {
    state.dynamicExchangesPending = false
}

export const GET_EXCHANGES_DYNAMIC_SUCCESS = (state, responseData) => {
    state.dynamicExchangesItems = responseData.data
    state.dynamicExchangesPending = false
    state.pending = false
}
