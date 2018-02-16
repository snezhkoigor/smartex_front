export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_EXCHANGES_LIST_SUCCESS = (state, responseData) => {
    state.exchangesList = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_EXCHANGES_LIST_FAIL = (state) => {
    state.exchangesList = []
    state.meta = {}

    state.pending = false
}
