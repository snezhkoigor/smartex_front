import api from '../api/commission';
import router from '../router/index';
import Config from '../config/app';
import ErrorsHelper from "../helpers/errors";
import HttpHelper from "../helpers/http";

const GET_COMMISSION_LIST = "GET_COMMISSION_LIST";
const GET_COMMISSION_LIST_SUCCESS = "GET_COMMISSION_LIST_SUCCESS";
const GET_COMMISSION_LIST_FAIL = "GET_COMMISSION_LIST_FAIL";

const COMMISSION_DELETE = "COMMISSION_DELETE";
const COMMISSION_DELETE_SUCCESS = "COMMISSION_DELETE_SUCCESS";
const COMMISSION_DELETE_FAIL = "COMMISSION_DELETE_FAIL";

const RESET_PENDING = "RESET_PENDING";

const state = {
    meta: {},
    commissions: [],
    commission: null,
    pending: false
};

const actions = {
    list({ commit, dispatch }, requestParams) {
        return new Promise((resolve, reject) => {
            commit(GET_COMMISSION_LIST);

            api.list(requestParams).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_COMMISSION_LIST_SUCCESS, response.data);
                    resolve(response);
                } else {
                    commit(GET_COMMISSION_LIST_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(GET_COMMISSION_LIST_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            })
        })
    },
    delete({commit}, wallet) {
        return new Promise((resolve, reject) => {
            commit(COMMISSION_DELETE);

            api.delete(wallet).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(COMMISSION_DELETE_SUCCESS);
                    resolve(response);
                } else {
                    commit(COMMISSION_DELETE_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(COMMISSION_DELETE_FAIL);
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
        state.commissions = [];
        state.commission = null;
        state.pending = false;
        state.checkPending = false;
    },

    GET_COMMISSION_LIST (state) {
        state.pending = true;
    },
    GET_COMMISSION_LIST_SUCCESS (state, responseData) {
        state.commissions = responseData.data;
        state.commission = null;
        state.meta = responseData.meta;
        state.pending = false;
    },
    GET_COMMISSION_LIST_FAIL (state) {
        state.commissions = [];
        state.commission = null;
        state.pending = false;
        state.meta = null;
    },

    COMMISSION_DELETE (state) {
        state.pending = true;
    },
    COMMISSION_DELETE_SUCCESS (state) {
        state.pending = false;
    },
    COMMISSION_DELETE_FAIL (state) {
        state.pending = false;
    }
};

const getters = {
    commissions (state) {
        return state.commissions;
    },
    commission (state) {
        return state.commission;
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