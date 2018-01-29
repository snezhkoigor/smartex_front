// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router/router'
import store from './store/index'
import VueFroala from 'vue-froala-wysiwyg'
// import VueMoment from 'vue-moment'
// import moment from 'moment-timezone'
import VueTruncate from 'vue-truncate-filter'
import VueCurrencyFilter from 'vue-currency-filter'
import refName from 'vue-ref-name'
import { sync } from 'vuex-router-sync'
import VueResource from 'vue-resource'

Vue.use(Quasar) // Install Quasar Framework

Vue.use(refName)
Vue.use(VueResource)
Vue.use(VueFroala)
Vue.use(VueTruncate)
Vue.use(VueCurrencyFilter, {
    symbol: '$',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: false
})
// Vue.use(VueMoment, {
//     moment
// })

sync(store, router)

Vue.config.productionTip = false

if (__THEME === 'mat') {
    require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'

Quasar.start(() => {
    /* eslint-disable no-new */
    new Vue({
        el: '#q-app',
        router,
        store,
        beforeMount: function () {
            this.$store.dispatch('Commission/resetPending')
            this.$store.dispatch('User/resetPending')
            this.$store.dispatch('PaymentSystem/resetPending')
            this.$store.dispatch('Wallet/resetPending')
            this.$store.dispatch('Course/resetPending')
            this.$store.dispatch('News/resetPending')
            this.$store.dispatch('Dashboard/resetPending')
        },
        render: h => h(require('./App').default)
    })
})
