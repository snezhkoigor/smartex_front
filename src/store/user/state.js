export default {
    isLoggedIn: !!localStorage.getItem('token') && !!localStorage.getItem('role'),
    profile: null,
    token: null,
    role: null,
    pending: false
}
