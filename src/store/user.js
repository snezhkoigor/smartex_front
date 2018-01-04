import api from '../api/user';
import router from '../router/index';
import Config from '../config/app';
import ErrorsHelper from '../helpers/errors';
import HttpHelper from '../helpers/http';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";

const GET_PROFILE = "GET_PROFILE";
const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";

const LOGOUT = "LOGOUT";

const PROFILE_UPDATE = "PROFILE_UPDATE";
const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS";
const PROFILE_UPDATE_FAIL = "PROFILE_UPDATE_FAIL";

const RESET_PASSWORD = "RESET_PASSWORD";
const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";

const RESET_PENDING = "RESET_PENDING";

const state = {
    isLoggedIn: !!localStorage.getItem('jwt_token') && !!localStorage.getItem('jwt_role'),
    profile: null,
    token: null,
    role: null,
    pending: false
};

const actions = {
    login({ commit, dispatch }, formData) {
        return new Promise((resolve, reject) => {
            commit(LOGIN);

            api.login(formData).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(LOGIN_SUCCESS, response.data);
                    resolve(response);
                } else {
                    commit(LOGIN_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(LOGIN_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            })
        })
    },
    getProfile({ commit }) {
        return new Promise((resolve, reject) => {
            commit(GET_PROFILE);

            api.getProfile().then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_PROFILE_SUCCESS, response.data);
                    resolve(response);
                } else {
                    commit(GET_PROFILE_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(GET_PROFILE_FAIL);
                commit(LOGOUT);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            })
        })
    },
    updateProfile({ commit, dispatch }, profile) {
        return new Promise((resolve, reject) => {
            commit(PROFILE_UPDATE);

            api.updateProfile(profile).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(PROFILE_UPDATE_SUCCESS, response.data);
                    resolve(response);
                } else {
                    commit(PROFILE_UPDATE_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(PROFILE_UPDATE_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            })
        });
    },
    resetPassword({ commit }, email) {
        return new Promise((resolve, reject) => {
            commit(RESET_PASSWORD);

            api.resetPassword(email).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(RESET_PASSWORD_SUCCESS, response.data);
                    resolve(response);
                } else {
                    commit(RESET_PASSWORD_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(RESET_PASSWORD_FAIL);
                commit(LOGOUT);
                reject(errors);

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
    LOGIN_SUCCESS (state, responseData) {
        localStorage.setItem('jwt_token', responseData.data.token);
        state.token = responseData.data.token;
        state.pending = false;
    },
    LOGIN_FAIL (state) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('jwt_role');
        localStorage.removeItem('vuex');
        state.isLoggedIn = false;
        state.token = null;
        state.pending = false;
        state.role = null;
    },

    PROFILE_UPDATE (state) {
        state.pending = true;
    },
    PROFILE_UPDATE_SUCCESS (state, responseData) {
        state.profile = responseData.data;
        state.pending = false;
    },
    PROFILE_UPDATE_FAIL (state) {
        state.pending = false;
    },

    GET_PROFILE (state) {
        state.pending = true;
    },
    GET_PROFILE_SUCCESS (state, responseData) {
        state.profile = responseData.data;
        state.pending = false;
        state.isLoggedIn = true;

        // if (responseData.data.roles.data !== undefined) {
        //     let role = [];
        //
        //     responseData.data.roles.data.forEach(function(item, i, arr) {
        //         role.push({'id': item.id, 'name': item.name, 'displayName': item.display_name});
        //     });
        //
        //     state.role = role;
        //     localStorage.setItem('jwt_role', btoa(JSON.stringify(role)));
        // }

        state.role = '';
        localStorage.setItem('jwt_role', btoa(JSON.stringify('')));
    },
    GET_PROFILE_FAIL (state) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('jwt_role');
        localStorage.removeItem('vuex');
        state.isLoggedIn = false;
        state.token = null;
        state.pending = false;
        state.role = null;
    },

    LOGOUT (state) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('jwt_role');
        localStorage.removeItem('vuex');
        state.isLoggedIn = false;
        state.profile = null;
        state.token = null;
        state.pending = false;
        state.role = null;
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