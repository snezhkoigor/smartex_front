import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '../config/app'
import authGuard from '../router/guard'

Vue.use(VueRouter)

function load (component) {
    // '@' is aliased to src/components
    return () => import(`@/${component}.vue`)
}

export default new VueRouter({
    /*
    * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
    * it is only to be used only for websites.
    *
    * If you decide to go with "history" mode, please also open /config/index.js
    * and set "build.publicPath" to something other than an empty string.
    * Example: '/' instead of current ''
    *
    * If switching back to default "hash" mode, don't forget to set the
    * build publicPath back to '' so Cordova builds work again.
    */

    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),

    can: function (routeMeta) {
        let jwtRole = JSON.parse(atob(localStorage.getItem('role')))
        let can = false

        if (routeMeta.role === undefined) {
            can = true
        }
        else {
            Object.values(jwtRole).forEach(function (value, key, arr) {
                if (routeMeta.role.indexOf(config.access.public) !== -1 || routeMeta.role.indexOf(value.name) !== -1) {
                    can = true
                }
            })
        }

        return can
    },

    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            meta: {
                isErrorPage: false
            }
        },
        {
            name: 'dashboard',
            path: '/dashboard',
            icon: 'apps',
            component: load('dashboard/index'),
            beforeEnter: authGuard,
            meta: {
                role: [
                    config.access.admin,
                    config.access.operator
                ],
                label: 'Dashboard',
                labelDescription: '',
                title: 'Dashboard',
                subtitle: 'All main information in graph view',
                isErrorPage: false,
                menu: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            icon: 'assignment_ind',
            component: load('users/profile'),
            beforeEnter: authGuard,
            meta: {
                role: [
                    config.access.admin,
                    config.access.operator
                ],
                label: 'Profile',
                labelDescription: 'Setup all your main account fields',
                title: 'Profile',
                subtitle: 'Setup all your main account fields',
                isErrorPage: false,
                menu: false
            }
        },
        {
            path: '/courses',
            name: 'courses',
            icon: 'compare_arrows',
            component: load('courses/list'),
            beforeEnter: authGuard,
            meta: {
                role: [
                    config.access.admin
                ],
                label: 'Courses',
                labelDescription: '',
                title: 'Courses',
                subtitle: 'Setup all courses by today',
                isErrorPage: false,
                menu: true
            }
        },
        {
            path: '/wallets',
            icon: 'account_balance_wallet',
            component: load('wallets/index'),
            beforeEnter: authGuard,
            meta: {
                role: [
                    config.access.admin
                ],
                label: 'Wallets',
                labelDescription: '',
                title: 'Wallets',
                subtitle: 'Setup all your payment systems wallets',
                isErrorPage: false,
                menu: true
            },
            children: [
                {
                    path: 'add',
                    name: 'walletAdd',
                    component: load('wallets/add'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'Add',
                        subtitle: 'Adding new payment system wallet'
                    }
                },
                {
                    path: ':walletId',
                    name: 'walletEdit',
                    component: load('wallets/edit'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'Edit',
                        subtitle: 'Editing payment system wallet'
                    }
                },
                {
                    path: '',
                    name: 'walletsList',
                    component: load('wallets/list'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'List',
                        subtitle: 'All payment systems wallets'
                    }
                }
            ]
        },
        {
            path: '/commissions',
            icon: 'monetization_on',
            component: load('commissions/index'),
            meta: {
                role: [
                    config.access.admin
                ],
                label: 'Commissions',
                labelDescription: '',
                title: 'Commissions',
                subtitle: 'Setup all commissions by saved payment systems',
                isErrorPage: false,
                menu: true
            },
            children: [
                {
                    path: 'add',
                    name: 'commissionAdd',
                    component: load('commissions/add'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'Add',
                        subtitle: 'Adding new commission to payment system'
                    }
                },
                {
                    path: ':commissionId',
                    name: 'commissionEdit',
                    component: load('commissions/edit'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'Edit',
                        subtitle: 'Editing commission of payment system'
                    }
                },
                {
                    path: '',
                    name: 'commissionsList',
                    component: load('commissions/list'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'List',
                        subtitle: 'All commissions of saved payment systems'
                    }
                }
            ]
        },
        {
            path: '/news',
            icon: 'chrome_reader_mode',
            component: load('news/index'),
            beforeEnter: authGuard,
            meta: {
                role: [
                    config.access.admin
                ],
                label: 'News',
                labelDescription: '',
                title: 'News',
                subtitle: 'Setup all news in your system',
                isErrorPage: false,
                menu: true
            },
            children: [
                {
                    path: 'add',
                    name: 'newsAdd',
                    component: load('news/add'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'Add',
                        subtitle: 'Adding new news'
                    }
                },
                {
                    path: ':newsId',
                    name: 'newsEdit',
                    component: load('news/edit'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'Edit',
                        subtitle: 'Editing news'
                    }
                },
                {
                    path: '',
                    name: 'newsList',
                    component: load('news/list'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'List',
                        subtitle: 'List of all news'
                    }
                }
            ]
        },
        {
            path: '/activity-logs',
            icon: 'event',
            component: load('logs/index'),
            beforeEnter: authGuard,
            meta: {
                role: [
                    config.access.admin
                ],
                label: 'Logs',
                labelDescription: '',
                title: 'Logs',
                subtitle: 'All users activities by main models (commissions, news etc ...)',
                isErrorPage: false,
                menu: true
            },
            children: [
                {
                    path: ':activityLogId',
                    name: 'activityLogShow',
                    component: load('logs/show'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'Activity',
                        subtitle: 'Activity details'
                    }
                },
                {
                    path: '',
                    name: 'activityLogList',
                    component: load('logs/list'),
                    beforeEnter: authGuard,
                    meta: {
                        role: [
                            config.access.admin
                        ],
                        title: 'List',
                        subtitle: 'List of all users activities by main models (commissions, news etc ...)'
                    }
                }
            ]
        },
        {
            name: 'login',
            path: '/login',
            component: load('users/login'),
            meta: {
                role: [
                    config.access.public
                ],
                label: '',
                labelDescription: '',
                title: 'Sing In',
                subtitle: '',
                isErrorPage: false,
                menu: false
            }
        },
        {
            name: 'reset',
            path: '/password-reset',
            component: load('users/reset'),
            meta: {
                role: [
                    config.access.public
                ],
                label: '',
                labelDescription: '',
                title: 'Reset password',
                subtitle: '',
                isErrorPage: false,
                menu: false
            }
        },
        {
            path: '*',
            name: '404',
            component: load('errors/404'),
            meta: {
                role: [
                    config.access.public
                ],
                title: 'Not Found',
                isErrorPage: true,
                menu: false
            }
        },
        {
            path: '/401',
            name: '401',
            component: load('errors/401'),
            meta: {
                role: [
                    config.access.public
                ],
                title: 'Access Denied',
                isErrorPage: true,
                menu: false
            }
        },
        {
            path: '/500',
            name: '500',
            component: load('errors/500'),
            meta: {
                role: [
                    config.access.public
                ],
                title: 'System Error in Server',
                isErrorPage: true,
                menu: false
            }
        }
    ]
})
