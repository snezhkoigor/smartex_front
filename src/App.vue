<template>
    <!-- Don't drop "q-app" class -->
    <div id="q-app">
        <q-ajax-bar ref="ajaxBar" :delay="delay" color="blue-7" size="5px"/>
        <q-layout
            ref="layout"
            view="hHh lpr fFf"
            :left-class="{'bg-grey-2': true}"
        >
            <div v-if="isErrorPage">
                <errors-layout :rootRefs="this.$refs" />
            </div>
            <div v-else-if="isLogin">
                <desktop-layout class="gt-lg" :rootRefs="this.$refs" />
                <mobile-layout class="lt-lg" :rootRefs="this.$refs" />
            </div>
            <div v-else>
                <guest-layout :rootRefs="this.$refs" />
            </div>
        </q-layout>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { QLayout, QAjaxBar } from 'quasar'

    import DesktopLayout from '@/layouts/desktop.vue'
    import MobileLayout from '@/layouts/mobile.vue'
    import ErrorsLayout from '@/layouts/errors.vue'
    import GuestLayout from '@/layouts/guest.vue'

    export default {
        name: 'App',
        components: {
            QLayout,
            QAjaxBar,
            MobileLayout,
            ErrorsLayout,
            DesktopLayout,
            GuestLayout
        },
        data () {
            return {
                delay: 100,
                isErrorPage: false
            }
        },
        computed: {
            ...mapGetters('User', [
                'isLogin', 'profile', 'pending'
            ])
        },
        mounted () {
            this.isErrorPage = this.$router.currentRoute.meta.isErrorPage
        },
        watch: {
            '$route' (toRoute) {
                this.isErrorPage = toRoute.meta.isErrorPage
            }
        }
    }
</script>

<style>
    .layout-header {
        z-index: 0 !important;
    }
</style>