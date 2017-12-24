import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import App from '@/App';
import NewsIndex from '@/components/News/Index';
import NewsList from '@/components/News/List';
import NewsAdd from '@/components/News/Add';
import NewsEdit from '@/components/News/Edit';
import Courses from '@/components/Courses';
import WalletsList from '@/components/Wallets/List';
import WalletsIndex from '@/components/Wallets/Index';
import WalletAdd from '@/components/Wallets/Add';
import WalletEdit from '@/components/Wallets/Edit';
import Config from '../config/app';
import AccessDenied from '@/components/Error/401';
import SystemError from '@/components/Error/500';
import NotFound from '@/components/Error/404';
import Login from '@/components/Login';
import PasswordReset from '@/components/PasswordReset';

import AuthGuard from '../router/guard';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            beforeEnter: AuthGuard,
            meta: {
                role: [
                    Config.access.admin,
                    Config.access.operator
                ],
                title: 'Dashboard',
                menuName: 'Dashboard',
                menuIcon: 'mdi-view-dashboard'
            },
            menu: true
        },
        {
            path: '/news',
            name: 'news',
            component: NewsIndex,
            beforeEnter: AuthGuard,
            meta: {
                role: [
                    Config.access.admin,
                    Config.access.operator
                ],
                title: 'News',
                menuName: 'News',
                menuIcon: 'mdi-newspaper'
            },
            menu: true,
            children: [
                {
                    path: 'add',
                    name: 'newsAdd',
                    component: NewsAdd,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin,
                            Config.access.operator
                        ],
                        title: 'Add'
                    }
                },
                {
                    path: ':newsId',
                    name: 'newsEdit',
                    component: NewsEdit,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin,
                            Config.access.operator
                        ],
                        title: 'Edit'
                    }
                },
                {
                    path: '',
                    name: 'newsList',
                    component: NewsList,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin,
                            Config.access.operator
                        ],
                        title: 'News'
                    }
                }
            ]
        },
        {
            path: '/courses',
            name: 'courses',
            component: Courses,
            beforeEnter: AuthGuard,
            meta: {
                role: [
                    Config.access.admin,
                    Config.access.operator
                ],
                title: 'Courses',
                menuName: 'Courses',
                menuIcon: 'fa-exchange'
            },
            menu: true
        },
        {
            path: '/wallets',
            name: 'wallets',
            component: WalletsIndex,
            beforeEnter: AuthGuard,
            meta: {
                role: [
                    Config.access.admin,
                    Config.access.operator
                ],
                title: 'Wallets',
                menuName: 'Wallets',
                menuIcon: 'mdi-wallet'
            },
            menu: true,
            children: [
                {
                    path: 'wallets/add',
                    name: 'walletAdd',
                    component: WalletAdd,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin,
                            Config.access.operator
                        ],
                        title: 'Add'
                    }
                },
                {
                    path: 'wallets/:walletId',
                    name: 'walletEdit',
                    component: WalletEdit,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin,
                            Config.access.operator
                        ],
                        title: 'Edit'
                    }
                },
                {
                    path: '',
                    name: 'walletsList',
                    component: WalletsList,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin,
                            Config.access.operator
                        ],
                        title: 'Wallets'
                    }
                }
            ]
        },
        {
            path: '*',
            name: '404',
            component: NotFound,
            meta: {
                role: [
                    Config.access.admin,
                    Config.access.operator
                ],
                title: 'Not Found',
            },
            menu: false
        },
        {
            path: '/401',
            name: '401',
            template: null,
            component: AccessDenied,
            meta: {
                role: [
                    Config.access.admin,
                    Config.access.operator
                ],
                title: 'Access Denied',
            },
            menu: false
        },
        {
            path: '/500',
            name: '500',
            template: null,
            component: SystemError,
            meta: {
                title: 'System Error in Server',
            },
            menu: false
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {},
            menu: false
        },
        {
            path: '/password-reset',
            name: 'passwordReset',
            component: PasswordReset,
            meta: {},
            menu: false
        }
    ],
    can: function (routeMeta) {
        let jwtRole = JSON.parse(atob(localStorage.getItem('jwt_role')));
        let can = false;

        if (routeMeta.role === undefined) {
            can = true;
        } else {
            Object.values(jwtRole).forEach(function(value, key, arr) {
                if (routeMeta.role.indexOf(Config.access.public) !== -1 || routeMeta.role.indexOf(value.name) !== -1) {
                    can = true;
                }
            });
        }

        if (can) {
            return true;
        } else {
            return false;
        }
    }
});