import courses from '../api/courses';
import router from '../router/index';
import Config from '../config/app';
import ErrorsHelper from "../helpers/errors";
import HttpHelper from "../helpers/http";

const GET_COURSES_LIST = "GET_COURSES_LIST";
const GET_COURSES_LIST_SUCCESS = "GET_COURSES_LIST_SUCCESS";
const GET_COURSES_LIST_FAIL = "GET_COURSES_LIST_FAIL";

const COURSES_EDIT = "COURSES_EDIT";
const COURSES_EDIT_SUCCESS = "COURSES_EDIT_SUCCESS";
const COURSES_EDIT_FAIL = "COURSES_EDIT_FAIL";

const RESET_PENDING = "RESET_PENDING";

const state = {
    courses: null,
    meta: null,
    pending: false
};

const actions = {
    list({ commit, dispatch }, requestParams) {
        return new Promise((resolve, reject) => {
            commit(GET_COURSES_LIST);

            courses.list(requestParams).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_COURSES_LIST_SUCCESS, response.data);
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
        });
    },
    edit({commit}, course) {
        return new Promise((resolve, reject) => {
            commit(COURSES_EDIT);

            courses.edit(course).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(COURSES_EDIT_SUCCESS);
                    resolve(response);
                } else {
                    commit(COURSES_EDIT_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(COURSES_EDIT_FAIL);
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
    GET_COURSES_LIST_SUCCESS (state, responseData) {
        state.pending = false;
        state.courses = responseData.data;
        state.meta = responseData.meta;
    },
    GET_COURSES_LIST_FAIL (state) {
        state.pending = false;
        state.courses = null;
        state.meta = null;
    },

    COURSES_EDIT (state) {
        state.pending = true;
    },
    COURSES_EDIT_SUCCESS (state) {
        state.pending = false;
    },
    COURSES_EDIT_FAIL (state) {
        state.pending = false;
    }
};

const getters = {
    courses (state) {
        return state.courses;
    },
    meta (state) {
        return state.meta;
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