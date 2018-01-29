export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_PAYMENT_SYSTEM_LIST_SUCCESS = (state, responseData) => {
    state.paymentSystems = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_PAYMENT_SYSTEM_LIST_FAIL = (state) => {
    state.paymentSystems = []
    state.meta = {}

    state.pending = false
}

export const GET_PAYMENT_SYSTEM_BY_ID_SUCCESS = (state, responseData) => {
    state.paymentSystem = responseData.data

    state.pending = false
}

export const GET_PAYMENT_SYSTEM_BY_ID_FAIL = (state) => {
    state.paymentSystem = null

    state.pending = false
}
