import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import App from '@/App';
import News from '@/components/News';
import Courses from '@/components/Courses';
import PaymentSystemList from '@/components/PaymentSystems/List';
import PaymentSystemIndex from '@/components/PaymentSystems/Index';
import WalletAdd from '@/components/PaymentSystems/Wallets/Add';
import WalletEdit from '@/components/PaymentSystems/Wallets/Edit';
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
                role: Config.access.admin+'|'+Config.access.operator,
                title: 'Dashboard',
                menuName: 'Dashboard',
                menuIcon: 'mdi-view-dashboard'
            },
            menu: true
        },
        {
            path: '/news',
            name: 'news',
            component: News,
            beforeEnter: AuthGuard,
            meta: {
                role: Config.access.admin+'|'+Config.access.operator,
                title: 'News',
                menuName: 'News',
                menuIcon: 'mdi-newspaper'
            },
            menu: true
        },
        {
            path: '/courses',
            name: 'courses',
            component: Courses,
            beforeEnter: AuthGuard,
            meta: {
                role: Config.access.admin+'|'+Config.access.operator,
                title: 'Courses',
                menuName: 'Courses',
                menuIcon: 'fa-exchange'
            },
            menu: true
        },
        {
            path: '/payment_systems',
            name: 'paymentSystems',
            component: PaymentSystemIndex,
            beforeEnter: AuthGuard,
            meta: {
                role: Config.access.admin+'|'+Config.access.operator,
                title: 'Wallets',
                menuName: 'Wallets',
                menuIcon: 'mdi-wallet'
            },
            menu: true,
            children: [
                {
                    path: ':paymentSystemId/wallets',
                    name: 'walletAdd',
                    component: WalletAdd,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: Config.access.admin+'|'+Config.access.operator,
                        title: 'Add'
                    }
                },
                {
                    path: ':paymentSystemId/wallets/:walletId',
                    name: 'walletEdit',
                    component: WalletEdit,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: Config.access.admin+'|'+Config.access.operator,
                        title: 'Edit'
                    }
                },
                {
                    path: '',
                    name: 'paymentSystemsList',
                    component: PaymentSystemList,
                    beforeEnter: AuthGuard,
                    meta: {
                        role: Config.access.admin+'|'+Config.access.operator,
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
                role: Config.access.public,
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
                role: Config.access.admin+'|'+Config.access.operator,
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
                role: Config.access.public,
                title: 'System Error in Server',
            },
            menu: false
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                role: Config.access.public,
            },
            menu: false
        },
        {
            path: '/password-reset',
            name: 'passwordReset',
            component: PasswordReset,
            meta: {
                role: Config.access.public,
            },
            menu: false
        }
    ],
    can: function (routeMeta) {
        if(routeMeta.role === Config.access.public || routeMeta.role === undefined) {
            return true;
        } else {
            let jwtRole = localStorage.getItem('jwt_role');

            if (routeMeta.role.indexOf(atob(jwtRole)) === -1) {
                return false;
            } else {
                return true;
            }
        }
    }
});