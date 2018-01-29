<template>
    <!-- Configure "view" prop for QLayout -->
    <q-layout ref="layout">
        <!-- Header -->
        <div slot="header" class="desktop-header">
            <header-component :layoutRefs="this.$refs" />
        </div>

        <div class="row desktop-container">
            <!-- Left Side Panel -->
            <div class="col-2">
                <div slot="left">
                    <menu-component />
                </div>
            </div>

            <!-- your content -->
            <div class="col-10">
                <div class="col-10 desktop-content">
                    <router-view />
                    <!--<content-component :layoutRefs="this.$refs" :rootRefs="this.rootRefs" />-->
                </div>
                <div class="col-10">
                    <!-- Footer -->
                    <footer-component />
                </div>
            </div>
        </div>
    </q-layout>
</template>

<script>
    import {
        QLayout,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QAjaxBar
    } from 'quasar'
    import MenuComponent from '@/layouts/menu.vue'
    import FooterComponent from '@/layouts/footer.vue'
    import HeaderComponent from '@/layouts/header.vue'

    export default {
        components: {
            QLayout,
            QToolbar,
            QToolbarTitle,
            QBtn,
            QIcon,
            QAjaxBar,
            MenuComponent,
            FooterComponent,
            HeaderComponent
        },
        data () {
            return {}
        },
        props: ['rootRefs']
    }
</script>

<style>
    .transition-generic {
        transition: all 0s ease-in;
    }
    .desktop-content {
        background: white;
        z-index: 10000;
        min-height: calc(100vh - 180px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        margin-top: -70px;
        margin-right: 15px;
    }
    .desktop-container {
        max-width: 1300px !important;
		/* padding: 0px 9px !important; */
		margin: 0px auto !important;
		position: relative;
    }
    .desktop-header .header-container {
        height: auto !important;
		max-width: 1300px;
		/* padding: 0px 25px 0px 15px; */
		margin: 0px auto;
		position: relative; 
        width: 100%
    }
</style>
