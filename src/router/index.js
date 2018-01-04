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
                title: 'Новости',
                menuName: 'Новости',
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
                        title: 'Добавление'
                    }
                },
                {
                    path: ':newsId',
                    name: 'newsEdit',
                    component: NewsEdit,
                    beforeEnter: AuthGuard,
                    meta: {
                        title: 'Редактиврование'
                    }
                },
                {
                    path: '',
                    name: 'newsList',
                    component: NewsList,
                    beforeEnter: AuthGuard,
                    meta: {
                        title: 'Новости'
                    }
                }
            ]
        },
        {
            path: '/profile',
            name: "profile",
            component: Profile,
            meta: {
                title: 'Профиль',
                isErrorPage: false
            },
            menu: false
        },
        {
            path: '*',
            name: '404',
            component: NotFound,
            meta: {
                title: 'Не найдено',
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
                title: 'Доступ закрыт',
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
                title: 'Ошибка на сервере',
                isErrorPage: true
            },
            menu: false
        },
        {
            path: '/login',
            name: 'loginPage',
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
            name: 'passwordResetPage',
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