export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_COURSES_LIST_SUCCESS = (state, responseData) => {
    state.courses = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_COURSES_LIST_FAIL = (state) => {
    state.courses = null
    state.meta = null

    state.pending = false
}
