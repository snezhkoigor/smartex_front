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

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        course,
        log,
        commission,
        dashboard,
        news,
        wallet
    },
    plugins: [createPersistedState()]
})

export default store
