import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import access from '../config/access'

Vue.use(VueRouter)

const Router = new VueRouter({
    /*
     * NOTE! Change Vue Router mode from quasar.conf.js -> build.env.VUE_ROUTER_MODE
     *
     * If you decide to go with "history" mode, please also set "build.publicPath"
     * to something other than an empty string.
     * Example: '/' instead of ''
     */

    // Leave as is and change from quasar.conf.js instead!
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    scrollBehavior: () => ({ y: 0 }),
    can: function (routeMeta) {
        let storageRole = localStorage.getItem('role')
        let can = false
        if (storageRole) {
            let jwtRole = JSON.parse(atob(localStorage.getItem('role')))

            if (routeMeta.role === undefined) {
                can = true
            } else {
                Object.values(jwtRole).forEach(function (value, key, arr) {
                    if (routeMeta.role.indexOf(access.public) !== -1 || routeMeta.role.indexOf(value.name) !== -1) {
                        can = true
                    }
                })
            }
        }

        return can
    },
    routes
})

// Inform Google Analytics
Router.beforeEach((to, from, next) => {
    // if (typeof ga !== 'undefined') {
    //     ga('set', 'page', to.path)
    //     ga('send', 'pageview')
    // }
    document.title = to.meta.title
    next()
})

export default Router
