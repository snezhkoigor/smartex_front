export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_NEWS_LIST_SUCCESS = (state, responseData) => {
    state.newsList = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_NEWS_LIST_FAIL = (state) => {
    state.newsList = []
    state.meta = {}

    state.pending = false
}

export const GET_NEWS_BY_ID_SUCCESS = (state, responseData) => {
    state.news = responseData.data

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

export const GET_NEWS_BY_ID_FAIL = (state) => {
    state.news = {}

    state.pending = false
}
