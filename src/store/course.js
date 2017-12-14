import api from '../api/courses';
import router from '../router/index';
import Config from '../config/app';
import ErrorsHelper from "../helpers/errors";

const GET_COURSES_LIST = "GET_COURSES_LIST";
const GET_COURSES_LIST_SUCCESS = "GET_COURSES_LIST_SUCCESS";
const GET_COURSES_LIST_FAIL = "GET_COURSES_LIST_FAIL";

const GET_COURSES_EDIT = "GET_COURSES_EDIT";
const GET_COURSES_EDIT_SUCCESS = "GET_COURSES_EDIT_SUCCESS";
const GET_COURSES_EDIT_FAIL = "GET_COURSES_EDIT_FAIL";

const RESET_PENDING = "RESET_PENDING";

const state = {
    courses: null,
    pending: false
};

const actions = {
    list({ commit, dispatch }, requestParams) {
        return new Promise((resolve, reject) => {
            commit(GET_COURSES_LIST);

            api.list(requestParams).then(response => {
                if (response.status === 200) {
                    commit(GET_COURSES_LIST_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(GET_COURSES_LIST_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(GET_COURSES_LIST_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            })
        })
    },
    edit({commit}, course) {
        return new Promise((resolve, reject) => {
            commit(GET_COURSES_EDIT);

            api.edit(course).then(response => {
                if (response.status === 200) {
                    commit(GET_COURSES_EDIT_SUCCESS);
                    resolve(response);
                } else {
                    commit(GET_COURSES_EDIT_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(GET_COURSES_EDIT_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            });
        });
    },
    resetPending({ commit }) {
        commit(RESET_PENDING);
    }
};

const mutations = {
    RESET_PENDING (state) {
        state.pending = false;
    },

    GET_COURSES_LIST (state) {
        state.pending = true;
    },
    GET_COURSES_LIST_SUCCESS (state, news) {
        state.pending = false;
        state.news = news;
    },
    GET_COURSES_LIST_FAIL (state) {
        state.pending = false;
    },

    GET_COURSES_EDIT (state) {
        state.pending = true;
    },
    GET_COURSES_EDIT_SUCCESS (state) {
        state.pending = false;
    },
    GET_COURSES_EDIT_FAIL (state) {
        state.pending = false;
    }
};

const getters = {
    courses (state) {
        return state.courses;
    },
    pending (state) {
        return state.pending;
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