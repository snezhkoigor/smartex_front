export default {
    isLoggedIn: !!localStorage.getItem('token') && !!localStorage.getItem('role'),
    users: [],
    user: null,
    meta: {},
    profile: null,
    token: null,
    role: null,
    pending: false
}
