import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/components/Dashboard';
import NewsIndex from '@/components/News/Index';
import NewsList from '@/components/News/List';
import NewsAdd from '@/components/News/Add';
import NewsEdit from '@/components/News/Edit';
import Courses from '@/components/Courses';
import WalletsList from '@/components/Wallets/List';
import WalletsIndex from '@/components/Wallets/Index';
import WalletAdd from '@/components/Wallets/Add';
import WalletEdit from '@/components/Wallets/Edit';
import CommissionsIndex from '@/components/Commissions/Index';
import CommissionsList from '@/components/Commissions/List';
import CommissionAdd from '@/components/Commissions/Add';
import CommissionEdit from '@/components/Commissions/Edit';
import ActivityLogsIndex from '@/components/ActivityLogs/Index';
import ActivityLogsList from '@/components/ActivityLogs/List';
import ActivityLogShow from '@/components/ActivityLogs/Show';

import NoAuth from '@/components/Layouts/NoAuth';

import Profile from '@/components/User/Profile';

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
            component: NewsIndex,
            beforeEnter: AuthGuard,
            meta: {
                role: [
                    Config.access.admin
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
                            Config.access.admin
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
                            Config.access.admin
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
                            Config.access.admin
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
                    Config.access.admin
                ],
                title: 'Courses',
                menuName: 'Courses',
                menuIcon: 'fa-exchange'
            },
            menu: true
        },
        {
            path: '/wallets',
            component: WalletsIndex,
            beforeEnter: AuthGuard,
            meta: {
                role: [
                    Config.access.admin
                ],
                title: 'Wallets',
                menuName: 'Wallets',
                menuIcon: 'mdi-wallet'
            },
            menu: true,
            children: [
                {
                    path: 'add',
                    name: 'walletAdd',
                    component: WalletAdd,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin
                        ],
                        title: 'Add'
                    }
                },
                {
                    path: ':walletId',
                    name: 'walletEdit',
                    component: WalletEdit,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin
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
                            Config.access.admin
                        ],
                        title: 'Wallets'
                    }
                }
            ]
        },
        {
            path: '/commissions',
            component: CommissionsIndex,
            beforeEnter: AuthGuard,
            meta: {
                role: [
                    Config.access.admin
                ],
                title: 'Commissions',
                menuName: 'Commissions',
                menuIcon: 'mdi-coins'
            },
            menu: true,
            children: [
                {
                    path: 'add',
                    name: 'commissionAdd',
                    component: CommissionAdd,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin
                        ],
                        title: 'Add'
                    }
                },
                {
                    path: ':commissionId',
                    name: 'commissionEdit',
                    component: CommissionEdit,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin
                        ],
                        title: 'Edit'
                    }
                },
                {
                    path: '',
                    name: 'commissionsList',
                    component: CommissionsList,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin
                        ],
                        title: 'Commissions'
                    }
                }
            ]
        },
        {
            path: '/activity-logs',
            component: ActivityLogsIndex,
            beforeEnter: AuthGuard,
            meta: {
                role: [
                    Config.access.admin
                ],
                title: 'Logs',
                menuName: 'Logs',
                menuIcon: 'mdi-archive'
            },
            menu: true,
            children: [
                {
                    path: ':activityLogId',
                    name: 'activityLogShow',
                    component: ActivityLogShow,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin
                        ],
                        title: 'Show'
                    }
                },
                {
                    path: '',
                    name: 'activityLogList',
                    component: ActivityLogsList,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: [
                            Config.access.admin
                        ],
                        title: 'Logs'
                    }
                }
            ]
        },
        {
            path: '/profile',
            name: "profile",
            component: Profile,
            meta: {
                role: [
                    Config.access.admin,
                    Config.access.operator
                ],
                title: 'Profile',
                isErrorPage: false
            },
            menu: false
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
                isErrorPage: true
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
                isErrorPage: true
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
                isErrorPage: true
            },
            menu: false
        },
        {
            path: '/login',
            component: NoAuth,
            meta: {},
            menu: false,
            children: [
                {
                    path: '',
                    name: 'login',
                    component: Login,
                    meta: {}
                }
            ]
        },
        {
            path: '/password-reset',
            component: NoAuth,
            meta: {},
            menu: false,
            children: [
                {
                    path: '',
                    name: 'passwordReset',
                    component: PasswordReset,
                    meta: {}
                }
            ]
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