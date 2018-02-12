export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_USERS_LIST_SUCCESS = (state, responseData) => {
    state.users = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_USERS_LIST_FAIL = (state) => {
    state.users = []
    state.meta = {}

    state.pending = false
}

export const LOGIN_SUCCESS = (state, responseData) => {
    localStorage.setItem('token', responseData.data.access_token)
    state.token = responseData.data.access_token

    state.pending = false
}

export const LOGIN_FAIL = (state) => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('vuex')
    state.isLoggedIn = false
    state.token = null
    state.role = null

    state.pending = false
}

export const PROFILE_UPDATE_SUCCESS = (state, responseData) => {
    state.profile = responseData.data
    state.pending = false
}

export const GET_PROFILE_SUCCESS = (state, responseData) => {
    state.profile = responseData.data
    state.isLoggedIn = true

    if (responseData.data.roles.data !== undefined) {
        let role = []

        responseData.data.roles.data.forEach(function (item, i, arr) {
            role.push({'id': item.id, 'name': item.name, 'displayName': item.display_name})
        })

        state.role = role
        localStorage.setItem('role', btoa(JSON.stringify(role)))
    }

    state.pending = false
}

export const GET_PROFILE_FAIL = (state) => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('vuex')
    state.isLoggedIn = false
    state.token = null
    state.role = null

    state.pending = false
}

export const LOGOUT = (state) => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('vuex')
    state.isLoggedIn = false
    state.profile = null
    state.token = null
    state.role = null

    state.pending = false
}
