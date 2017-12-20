import user from '../api/user';
import router from '../router/index';
import Config from '../config/app';
import ErrorsHelper from '../helpers/errors';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";

const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";

const RESET_PASSWORD = "RESET_PASSWORD";
const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";

const RESET_PENDING = "RESET_PENDING";

const state = {
    isLoggedIn: !!localStorage.getItem('jwt_token'),
    profile: null,
    token: null,
    role: null,
    pending: false
};

const actions = {
    login({ commit, dispatch }, formBody) {
        return new Promise((resolve, reject) => {
            commit(LOGIN);

            user.login(formBody).then(response => {
                if (response.status === 200) {
                    commit(LOGIN_SUCCESS, response.data.data.token);
                    commit(GET_PROFILE_SUCCESS, response.data.auth_user_data);
                    resolve(response);
                } else {
                    commit(LOGIN_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, error => {
                commit(LOGIN_FAIL);
                reject(error);

                ErrorsHelper.goByStatusCode(500, router);
            }).then(() => {
                router.push({
                    name: 'dashboard'
                })
            })
        })
    },
    profile({ commit }) {
        return new Promise((resolve, reject) => {
            user.profile().then(response => {
                if (response.data.status) {
                    commit(GET_PROFILE_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(GET_PROFILE_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, error => {
                commit(GET_PROFILE_FAIL);
                commit(LOGOUT);
                reject(error);

                ErrorsHelper.goByStatusCode(500, router);
            })
        })
    },
    checkProfile({ commit }) {
        return new Promise((resolve, reject) => {
            user.checkProfile().then(response => {
                if (response.data.status) {
                    resolve(response);
                } else {
                    commit(LOGOUT);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, error => {
                commit(LOGOUT);
                reject(error);

                ErrorsHelper.goByStatusCode(500, router);
            })
        })
    },
    resetPassword({ commit }, formBody) {
        return new Promise((resolve, reject) => {
            commit(RESET_PASSWORD);

            user.resetPassword(formBody).then(response => {
                if (response.data.status) {
                    commit(RESET_PASSWORD_SUCCESS);
                    resolve(response);
                } else {
                    commit(RESET_PASSWORD_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, error => {
                commit(RESET_PASSWORD_FAIL);
                commit(LOGOUT);
                reject(error);

                ErrorsHelper.goByStatusCode(500, router);
            })
        })
    },
    logout({ commit }) {
        commit(LOGOUT);
        router.push({
            name: 'login'
        })
    },
    resetPending({ commit }) {
        commit(RESET_PENDING);
    }
};

const mutations = {
    RESET_PENDING (state) {
        state.pending = false;
    },

    RESET_PASSWORD (state) {
        state.pending = true;
    },
    RESET_PASSWORD_SUCCESS (state) {
        state.pending = false;
    },
    RESET_PASSWORD_FAIL (state) {
        state.pending = false;
    },

    LOGIN (state) {
        state.pending = true;
    },
    LOGIN_SUCCESS (state, token) {
        localStorage.setItem('jwt_token', token);
        state.isLoggedIn = true;
        state.token = token;
        state.pending = false;
    },
    LOGIN_FAIL (state) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('jwt_role');
        localStorage.removeItem('vuex');
        state.isLoggedIn = false;
        state.token = null;
        state.pending = false;
    },

    GET_PROFILE_SUCCESS (state, user) {
        state.profile = user;
        state.pending = false;

        if (user.roles) {
            let role = [];

            user.roles.forEach(function(item, i, arr) {
                role.push(item.name);
            });

            state.role = role;
            localStorage.setItem('jwt_role', btoa(role));
        }
    },
    GET_PROFILE_FAIL (state) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('jwt_role');
        localStorage.removeItem('vuex');
        state.isLoggedIn = false;
        state.token = null;
        state.pending = false;
    },

    LOGOUT (state) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('jwt_role');
        localStorage.removeItem('vuex');
        state.isLoggedIn = false;
        state.profile = null;
        state.token = null;
        state.pending = false;
    }
};

const getters = {
    profile (state) {
        return state.profile;
    },
    token (state) {
        return state.token;
    },
    isLogin (state) {
        return state.isLoggedIn;
    },
    pending (state) {
        return state.pending;
    },
    role (state) {
        return state.role;
    }
};

const namespaced = true;

export default {
    namespaced,
    state,
    actions,
    mutations,
    getters
};