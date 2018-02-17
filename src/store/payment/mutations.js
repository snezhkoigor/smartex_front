export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_PAYMENT_BY_ID_SUCCESS = (state, responseData) => {
    state.payment = responseData.data

    state.pending = false
}

export const GET_PAYMENT_BY_ID_FAIL = (state) => {
    state.payment = {}

    state.pending = false
}

export const RESET_PAYMENT = (state) => {
    state.payment = {}
}
