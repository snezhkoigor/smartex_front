import api from '../api/news';
import router from '../router/index';
import Config from '../config/app';
import ErrorsHelper from "../helpers/errors";

const GET_NEWS_LIST = "GET_NEWS_LIST";
const GET_NEWS_LIST_SUCCESS = "GET_NEWS_LIST_SUCCESS";
const GET_NEWS_LIST_FAIL = "GET_NEWS_LIST_FAIL";

const GET_NEWS_ADD = "GET_NEWS_ADD";
const GET_NEWS_ADD_SUCCESS = "GET_NEWS_ADD_SUCCESS";
const GET_NEWS_ADD_FAIL = "GET_NEWS_ADD_FAIL";

const GET_NEWS_EDIT = "GET_NEWS_EDIT";
const GET_NEWS_EDIT_SUCCESS = "GET_NEWS_EDIT_SUCCESS";
const GET_NEWS_EDIT_FAIL = "GET_NEWS_EDIT_FAIL";

const GET_NEWS_DELETE = "GET_NEWS_DELETE";
const GET_NEWS_DELETE_SUCCESS = "GET_NEWS_DELETE_SUCCESS";
const GET_NEWS_DELETE_FAIL = "GET_NEWS_DELETE_FAIL";

const RESET_PENDING = "RESET_PENDING";

const state = {
    news: null,
    pending: false
};

const actions = {
    list({ commit, dispatch }, requestParams) {
        return new Promise((resolve, reject) => {
            commit(GET_NEWS_LIST);

            api.list(requestParams).then(response => {
                if (response.status === 200) {
                    commit(GET_NEWS_LIST_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(GET_NEWS_LIST_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(GET_NEWS_LIST_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            })
        })
    },
    add({commit}, news) {
        return new Promise((resolve, reject) => {
            commit(GET_NEWS_ADD);

            api.add(news).then(response => {
                if (response.status === 200) {
                    commit(GET_NEWS_ADD_SUCCESS);
                    resolve(response);
                } else {
                    commit(GET_NEWS_ADD_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(GET_NEWS_LIST_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            });
        });
    },
    edit({commit}, news) {
        return new Promise((resolve, reject) => {
            commit(GET_NEWS_EDIT);

            api.edit(news).then(response => {
                if (response.status === 200) {
                    commit(GET_NEWS_EDIT_SUCCESS);
                    resolve(response);
                } else {
                    commit(GET_NEWS_EDIT_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(GET_NEWS_EDIT_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            });
        });
    },
    delete({commit}, news) {
        return new Promise((resolve, reject) => {
            commit(GET_NEWS_DELETE);

            api.delete(news).then(response => {
                if (response.status === 200) {
                    commit(GET_NEWS_DELETE_SUCCESS);
                    resolve(response);
                } else {
                    commit(GET_NEWS_DELETE_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(GET_NEWS_DELETE_FAIL);
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

    GET_NEWS_LIST (state) {
        state.pending = true;
    },
    GET_NEWS_LIST_SUCCESS (state, news) {
        state.pending = false;
        state.news = news;
    },
    GET_NEWS_LIST_FAIL (state) {
        state.pending = false;
    },

    GET_NEWS_ADD (state) {
        state.pending = true;
    },
    GET_NEWS_ADD_SUCCESS (state) {
        state.pending = false;
    },
    GET_NEWS_ADD_FAIL (state) {
        state.pending = false;
    },

    GET_NEWS_EDIT (state) {
        state.pending = true;
    },
    GET_NEWS_EDIT_SUCCESS (state) {
        state.pending = false;
    },
    GET_NEWS_EDIT_FAIL (state) {
        state.pending = false;
    },

    GET_NEWS_DELETE (state) {
        state.pending = true;
    },
    GET_NEWS_DELETE_SUCCESS (state) {
        state.pending = false;
    },
    GET_NEWS_DELETE_FAIL (state) {
        state.pending = false;
    }
};

const getters = {
    news (state) {
        return state.news;
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