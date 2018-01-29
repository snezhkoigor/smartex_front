export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_WALLET_LIST_SUCCESS = (state, responseData) => {
    state.wallets = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_WALLET_LIST_FAIL = (state) => {
    state.wallets = []
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

export const GET_WALLET_BY_ID_SUCCESS = (state, responseData) => {
    state.wallet = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_WALLET_BY_ID_FAIL = (state) => {
    state.wallet = null
    state.meta = {}

    state.pending = false
}
