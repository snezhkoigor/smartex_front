import { Platform } from 'quasar'
import access from '../config/access'
import authGuard from '../router/guard'

export default [
    {
        path: '/',
        name: 'root',
        component: () => Platform.is.mobile ? import('layouts/mobile') : import('layouts/desktop'),
        redirect: '/dashboard',
        children: [
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
