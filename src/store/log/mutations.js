export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_ACTIVITY_LOGS_LIST_SUCCESS = (state, responseData) => {
    state.activityLogsList = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_ACTIVITY_LOGS_LIST_FAIL = (state) => {
    state.activityLogsList = []
    state.meta = {}

    state.pending = false
}

export const ACTIVITY_LOG_SHOW_SUCCESS = (state, responseData) => {
    state.activityLog = responseData.data
    state.activityLogsList = []

    state.pending = false
}

export const ACTIVITY_LOG_SHOW_FAIL = (state) => {
    state.activityLog = null
    state.activityLogsList = []

    state.pending = false
}
