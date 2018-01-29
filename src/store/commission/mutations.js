export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_COMMISSION_LIST_SUCCESS = (state, responseData) => {
    state.commissions = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_COMMISSION_LIST_FAIL = (state) => {
    state.commissions = []
    state.meta = {}

    state.pending = false
}

export const GET_META_SUCCESS = (state, responseData) => {
    state.meta = responseData.meta

    state.pending = false
}

export const GET_META_FAIL = (state) => {
    state.meta = {}

    state.pending = false
}

export const GET_COMMISSION_BY_ID_SUCCESS = (state, responseData) => {
    state.commission = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_COMMISSION_BY_ID_FAIL = (state) => {
    state.commission = null
    state.meta = {}

    state.pending = false
}
