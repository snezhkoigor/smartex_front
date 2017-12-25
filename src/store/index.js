import Vue from 'vue';
import Vuex from 'vuex';
import User from './user';
import News from './news';
import Course from './course';
import PaymentSystem from './payment_system';
import Wallet from './wallet';
import Commission from './commission';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        User,
        News,
        Course,
        PaymentSystem,
        Wallet,
        Commission
    },
    plugins: [createPersistedState()]
})