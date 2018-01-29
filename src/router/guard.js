import store from '../store/index'
import access from '../config/access'

export default (to, from, next) => {
    let jwtToken = localStorage.getItem('token')

    if (jwtToken !== null) {
        let jwtRole = JSON.parse(atob(localStorage.getItem('role')))
        let can = false

        if (to.meta.role === undefined) {
            can = true
        } else {
            Object.values(jwtRole).forEach(function (value, key, arr) {
                if (to.meta.role.indexOf(access.public) !== -1 || to.meta.role.indexOf(value.name) !== -1) {
                    can = true
                }
            })
        }

        if (can) {
            next()
        } else {
            next({path: '/401'})
        }
    } else {
        store.dispatch('user/logout').then(() => {
            next({ path: '/login' })
        })
    }
}
