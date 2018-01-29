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

    state.pending = false
}

export const GET_TOTAL_REGISTRATIONS_FAIL = (state) => {
    state.totalRegistrationsItems = null
    state.meta = {}

    state.pending = false
}

export const GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_SUCCESS = (state, responseData) => {
    state.totalRegistrationsAndActivationsItems = responseData.data

    state.pending = false
}

export const GET_TOTAL_REGISTRATIONS_AND_ACTIVATIONS_FAIL = (state) => {
    state.totalRegistrationsAndActivationsItems = null

    state.pending = false
}
