import api from '../api/payment_system';
import router from '../router/index';
import Config from '../config/app';
import ErrorsHelper from "../helpers/errors";
import HttpHelper from "../helpers/http";

const GET_PAYMENT_SYSTEM_LIST = "GET_PAYMENT_SYSTEM_LIST";
const GET_PAYMENT_SYSTEM_LIST_SUCCESS = "GET_PAYMENT_SYSTEM_LIST_SUCCESS";
const GET_PAYMENT_SYSTEM_LIST_FAIL = "GET_PAYMENT_SYSTEM_LIST_FAIL";

const GET_PAYMENT_SYSTEM_BY_ID = "GET_PAYMENT_SYSTEM_BY_ID";
const GET_PAYMENT_SYSTEM_BY_ID_SUCCESS = "GET_PAYMENT_SYSTEM_BY_ID_SUCCESS";
const GET_PAYMENT_SYSTEM_BY_ID_FAIL = "GET_PAYMENT_SYSTEM_BY_ID_FAIL";

const RESET_PENDING = "RESET_PENDING";

const state = {
    meta: null,
    paymentSystems: [],
    paymentSystem: null,
    pending: false
};

const actions = {
    getPaymentSystemById({ commit, dispatch }, paymentSystemId) {
        return new Promise((resolve, reject) => {
            commit(GET_PAYMENT_SYSTEM_BY_ID);

            api.getById(paymentSystemId).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_PAYMENT_SYSTEM_BY_ID_SUCCESS, response.data);
                    resolve(response);
                } else {
                    commit(GET_PAYMENT_SYSTEM_BY_ID_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(GET_PAYMENT_SYSTEM_BY_ID_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            })
        })
    },
    list({ commit, dispatch }, requestParams) {
        return new Promise((resolve, reject) => {
            commit(GET_PAYMENT_SYSTEM_LIST);

            api.list(requestParams).then(response => {
                if (HttpHelper.checkIsOkAnswerStatus(response.status)) {
                    commit(GET_PAYMENT_SYSTEM_LIST_SUCCESS, response.data);
                    resolve(response);
                } else {
                    commit(GET_PAYMENT_SYSTEM_LIST_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(GET_PAYMENT_SYSTEM_LIST_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            })
        })
    },
    resetPending({ commit }) {
        commit(RESET_PENDING);
    }
};

const mutations = {
    RESET_PENDING (state) {
        state.pending = false;
        state.paymentSystems = [];
        state.paymentSystem = null;
        state.meta = null;
    },

    GET_PAYMENT_SYSTEM_LIST (state) {
        state.pending = true;
    },
    GET_PAYMENT_SYSTEM_LIST_SUCCESS (state, responseData) {
        state.paymentSystems = responseData.data;
        state.paymentSystem = null;
        state.meta = responseData.meta;
        state.pending = false;
    },
    GET_PAYMENT_SYSTEM_LIST_FAIL (state) {
        state.paymentSystems = [];
        state.paymentSystem = null;
        state.pending = false;
        state.meta = null;
    },

    GET_PAYMENT_SYSTEM_BY_ID (state) {
        state.pending = true;
    },
    GET_PAYMENT_SYSTEM_BY_ID_SUCCESS (state, responseData) {
        state.paymentSystem = responseData.data;
        state.paymentSystems = [];
        state.meta = responseData.meta;
        state.pending = false;
    },
    GET_PAYMENT_SYSTEM_BY_ID_FAIL (state) {
        state.pending = false;
        state.paymentSystems = [];
        state.paymentSystem = null;
        state.meta = null;
    }
};

const getters = {
    paymentSystems (state) {
        return state.paymentSystems;
    },
    paymentSystem (state) {
        return state.paymentSystem;
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