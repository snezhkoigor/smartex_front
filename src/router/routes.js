import access from '../config/access'
import authGuard from '../router/guard'

export default [
    {
        path: '/',
        name: 'root',
        component: () => import('layouts/desktop'),
        redirect: '/dashboard',
        children: [
            {
                name: 'profile',
                path: '/profile',
                component: () => import('pages/user/profile'),
                beforeEnter: authGuard,
                meta: {
                    role: [
                        access.admin,
                        access.operator
                    ],
                    label: 'Profile',
                    labelDescription: '',
                    title: 'Profile',
                    subtitle: 'Set up your data',
                    menu: false
                }
            },
            {
                name: 'dashboard',
                path: '/dashboard',
                component: () => import('pages/dashboard/index'),
                beforeEnter: authGuard,
                meta: {
                    role: [
                        access.admin,
                        access.operator
                    ],
                    label: 'Dashboard',
                    labelDescription: '',
                    title: 'Dashboard',
                    subtitle: 'All main information in graph view',
                    menu: true
                }
            },
            {
                name: 'courses',
                path: '/courses',
                component: () => import('pages/course/index'),
                beforeEnter: authGuard,
                meta: {
                    role: [
                        access.admin
                    ],
                    label: 'Courses',
                    labelDescription: '',
                    title: 'Courses',
                    subtitle: 'Setup all courses by today',
                    menu: true
                }
            },
            {
                path: '/wallets',
                component: () => import('pages/wallet/index'),
                meta: {
                    role: [
                        access.admin
                    ],
                    title: 'Wallets',
                    menuName: 'Wallets'
                },
                menu: true,
                children: [
                    {
                        path: 'add',
                        name: 'walletAdd',
                        component: () => import('pages/wallet/add'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'Add'
                        }
                    },
                    {
                        path: ':walletId',
                        name: 'walletEdit',
                        component: () => import('pages/wallet/edit'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'Edit'
                        }
                    },
                    {
                        path: '',
                        name: 'walletsList',
                        component: () => import('pages/wallet/list'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'Wallets'
                        }
                    }
                ]
            },
            {
                path: '/commissions',
                component: () => import('pages/commission/index'),
                meta: {
                    role: [
                        access.admin
                    ],
                    title: 'Commissions'
                },
                menu: true,
                children: [
                    {
                        path: 'add',
                        name: 'commissionAdd',
                        component: () => import('pages/commission/add'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'Add'
                        }
                    },
                    {
                        path: ':commissionId',
                        name: 'commissionEdit',
                        component: () => import('pages/commission/edit'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'Edit'
                        }
                    },
                    {
                        path: '',
                        name: 'commissionsList',
                        component: () => import('pages/commission/list'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'Commissions'
                        }
                    }
                ]
            },
            {
                path: '/news',
                component: () => import('pages/news/index'),
                meta: {
                    role: [
                        access.admin
                    ],
                    title: 'News'
                },
                menu: true,
                children: [
                    {
                        path: 'add',
                        name: 'newsAdd',
                        component: () => import('pages/news/add'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'Add'
                        }
                    },
                    {
                        path: ':newsId',
                        name: 'newsEdit',
                        component: () => import('pages/news/edit'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'Edit'
                        }
                    },
                    {
                        path: '',
                        name: 'newsList',
                        component: () => import('pages/news/list'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'News'
                        }
                    }
                ]
            },
            {
                path: '/activity-logs',
                component: () => import('pages/log/index'),
                meta: {
                    role: [
                        access.admin
                    ],
                    title: 'Logs'
                },
                menu: true,
                children: [
                    {
                        path: ':activityLogId',
                        name: 'activityLogShow',
                        component: () => import('pages/log/show'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'Edit'
                        }
                    },
                    {
                        path: '',
                        name: 'activityLogList',
                        component: () => import('pages/log/list'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin
                            ],
                            title: 'Logs',
                            subtitle: 'List of all users activities by main models (commissions, news etc ...)'
                        }
                    }
                ]
            },
            {
                path: '/users',
                component: () => import('pages/user/index'),
                meta: {
                    role: [
                        access.admin,
                        access.operator
                    ],
                    title: 'Users',
                    menuName: 'Users'
                },
                menu: true,
                children: [
                    // {
                    //     path: 'add',
                    //     name: 'walletAdd',
                    //     component: () => import('pages/user/add'),
                    //     beforeEnter: authGuard,
                    //     meta: {
                    //         role: [
                    //             access.admin
                    //         ],
                    //         title: 'Add'
                    //     }
                    // },
                    // {
                    //     path: ':walletId',
                    //     name: 'walletEdit',
                    //     component: () => import('pages/wallet/edit'),
                    //     beforeEnter: authGuard,
                    //     meta: {
                    //         role: [
                    //             access.admin
                    //         ],
                    //         title: 'Edit'
                    //     }
                    // },
                    {
                        path: '',
                        name: 'usersList',
                        component: () => import('pages/user/list'),
                        beforeEnter: authGuard,
                        meta: {
                            role: [
                                access.admin,
                                access.operator
                            ],
                            title: 'Users'
                        }
                    }
                ]
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('pages/user/login'),
        meta: {
            role: [
                access.public
            ],
            label: '',
            labelDescription: '',
            title: 'Sing In',
            subtitle: '',
            menu: false
        }
    },
    {
        name: 'reset',
        path: '/password-reset',
        component: () => import('pages/user/reset'),
        meta: {
            role: [
                access.public
            ],
            label: '',
            labelDescription: '',
            title: 'Reset password',
            subtitle: '',
            menu: false
        }
    },

    // error without layout
    {
        path: '/401',
        name: '401',
        component: () => import('pages/error/401'),
        meta: {
            role: [
                access.public
            ],
            title: 'Access Denied',
            isErrorPage: true,
            menu: false
        }
    },
    {
        path: '/500',
        name: '500',
        component: () => import('pages/error/500'),
        meta: {
            role: [
                access.public
            ],
            title: 'System Error in Server',
            isErrorPage: true,
            menu: false
        }
    },
    {
        path: '*',
        name: '404',
        component: () => import('pages/error/404'),
        meta: {
            role: [
                access.public
            ],
            title: 'Not Found',
            isErrorPage: true,
            menu: false
        }
    }
]
