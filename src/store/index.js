import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './user'
import course from './course'
import log from './log'
import commission from './commission'
import dashboard from './dashboard'
import news from './news'
import wallet from './wallet'
import exchange from './exchange'
import payment from './payment'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        course,
        log,
        commission,
        dashboard,
        news,
        wallet,
        exchange,
        payment
    },
    plugins: [createPersistedState()]
})

export default store
