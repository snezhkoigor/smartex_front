// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $ from 'jquery'
import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import Acl from 'vue-acl';
import App from './App.vue';
import router from './router';
import store from './store/index';
import VueFroala from 'vue-froala-wysiwyg';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import VueTruncate from 'vue-truncate-filter';
import VueCurrencyFilter from 'vue-currency-filter';
import VueRouter from 'vue-router'

require('../node_modules/vuetify/dist/vuetify.min.css');
require('../node_modules/font-awesome/css/font-awesome.min.css');
require('../node_modules/froala-editor/css/froala_editor.pkgd.min.css');
require('../node_modules/froala-editor/css/froala_style.min.css');

sync(store, router);

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(VueFroala);
Vue.use(VueTruncate);
Vue.use(VueCurrencyFilter, {
    symbol : '$',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: false
})

Vue.config.productionTip = false;

Vue.use(VueMoment, {
    moment,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeMount: function () {
      this.$store.dispatch('User/resetPending');
  },
  render: h => h(App)
});