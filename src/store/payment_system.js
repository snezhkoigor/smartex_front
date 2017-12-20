import api from '../api/payment_system';
import wallets from '../api/wallet';
import router from '../router/index';
import Config from '../config/app';
import ErrorsHelper from "../helpers/errors";

const GET_PAYMENT_SYSTEM_LIST = "GET_PAYMENT_SYSTEM_LIST";
const GET_PAYMENT_SYSTEM_LIST_SUCCESS = "GET_PAYMENT_SYSTEM_LIST_SUCCESS";
const GET_PAYMENT_SYSTEM_LIST_FAIL = "GET_PAYMENT_SYSTEM_LIST_FAIL";

const WALLET_CHECK = "WALLET_CHECK";
const WALLET_CHECK_SUCCESS = "WALLET_CHECK_SUCCESS";
const WALLET_CHECK_FAIL = "WALLET_CHECK_FAIL";

const WALLETS_ADD = "WALLETS_ADD";
const WALLETS_ADD_SUCCESS = "WALLETS_ADD_SUCCESS";
const WALLETS_ADD_FAIL = "WALLETS_ADD_FAIL";

const WALLETS_EDIT = "WALLETS_EDIT";
const WALLETS_EDIT_SUCCESS = "WALLETS_EDIT_SUCCESS";
const WALLETS_EDIT_FAIL = "WALLETS_EDIT_FAIL";

const WALLETS_DELETE = "WALLETS_DELETE";
const WALLETS_DELETE_SUCCESS = "WALLETS_DELETE_SUCCESS";
const WALLETS_DELETE_FAIL = "WALLETS_DELETE_FAIL";

const RESET_PENDING = "RESET_PENDING";

const state = {
    meta: null,
    payment_systems: null,
    pending: false,
    checkPending: false
};

const actions = {
    list({ commit, dispatch }, requestParams) {
        return new Promise((resolve, reject) => {
            commit(GET_PAYMENT_SYSTEM_LIST);

            api.list(requestParams).then(response => {
                if (response.status === 200) {
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
    walletCheck({commit}, wallet) {
        return new Promise((resolve, reject) => {
            commit(WALLET_CHECK);

            wallets.check(wallet).then(response => {
                if (response.status === 200) {
                    commit(WALLET_CHECK_SUCCESS);
                    resolve(response);
                } else {
                    commit(WALLET_CHECK_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(WALLET_CHECK_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            });
        });
    },
    walletAdd({commit}, wallet) {
        return new Promise((resolve, reject) => {
            commit(WALLETS_ADD);

            wallets.add(wallet).then(response => {
                if (response.status === 200) {
                    commit(WALLETS_ADD_SUCCESS);
                    resolve(response);
                } else {
                    commit(WALLETS_ADD_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(WALLETS_ADD_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            });
        });
    },
    walletEdit({commit}, wallet) {
        return new Promise((resolve, reject) => {
            commit(WALLETS_EDIT);

            wallets.edit(wallet).then(response => {
                if (response.status === 200) {
                    commit(WALLETS_EDIT_SUCCESS);
                    resolve(response);
                } else {
                    commit(WALLETS_EDIT_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(WALLETS_EDIT_FAIL);
                reject(errors);

                ErrorsHelper.goByStatusCode(500, router);
            });
        });
    },
    walletDelete({commit}, wallet) {
        return new Promise((resolve, reject) => {
            commit(WALLETS_DELETE);

            wallets.delete(wallet).then(response => {
                if (response.status === 200) {
                    commit(WALLETS_DELETE_SUCCESS);
                    resolve(response);
                } else {
                    commit(WALLETS_DELETE_FAIL);
                    reject(ErrorsHelper.getMessage(response));

                    ErrorsHelper.goByStatusCode(response.status, router);
                }
            }, errors => {
                commit(WALLETS_DELETE_FAIL);
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

    GET_PAYMENT_SYSTEM_LIST (state) {
        state.pending = true;
    },
    GET_PAYMENT_SYSTEM_LIST_SUCCESS (state, responseData) {
        state.payment_systems = responseData.data;
        state.meta = responseData.meta;
        state.pending = false;
    },
    GET_PAYMENT_SYSTEM_LIST_FAIL (state) {
        state.pending = false;
        state.payment_systems = null;
        state.meta = null;
    },

    WALLET_CHECK (state) {
        state.checkPending = true;
    },
    WALLET_CHECK_SUCCESS (state) {
        state.checkPending = false;
    },
    WALLET_CHECK_FAIL (state) {
        state.checkPending = false;
    },

    WALLETS_ADD (state) {
        state.pending = true;
    },
    WALLETS_ADD_SUCCESS (state) {
        state.pending = false;
    },
    WALLETS_ADD_FAIL (state) {
        state.pending = false;
    },

    WALLETS_EDIT (state) {
        state.pending = true;
    },
    WALLETS_EDIT_SUCCESS (state) {
        state.pending = false;
    },
    WALLETS_EDIT_FAIL (state) {
        state.pending = false;
    },

    WALLETS_DELETE (state) {
        state.pending = true;
    },
    WALLETS_DELETE_SUCCESS (state) {
        state.pending = false;
    },
    WALLETS_DELETE_FAIL (state) {
        state.pending = false;
    }
};

const getters = {
    payment_systems (state) {
        return state.payment_systems;
    },
    meta (state) {
        return state.meta;
    },
    pending (state) {
        return state.pending;
    },
    checkPending (state) {
        return state.checkPending;
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