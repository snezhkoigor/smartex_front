import Vue from 'vue';
import Vuex from 'vuex';
import User from './user';
import News from './news';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        User,
        News
        // Product,
        // Dictionary,
        // Youtube,
        // Meta
    },
    plugins: [createPersistedState()]
})