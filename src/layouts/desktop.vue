<template>
    <q-layout ref="layout" view="hHh lpr fFf" :left-class="{'bg-grey-2': true}">
        <q-layout-header class="desktop-header">
            <header-component/>
        </q-layout-header>

        <div class="row desktop-container">
            <!-- Left Side Panel -->
            <div class="col-2 menu">
                <div slot="left">
                    <menu-component />
                </div>
            </div>

            <!-- your content -->
            <div class="col-10 content">
                <div class="col-10 body">
                    <router-view/>
                    <!--<content-component :layoutRefs="this.$refs" :rootRefs="this.rootRefs" />-->
                </div>
                <div class="col-10 footer">
                    <!-- Footer -->
                    <footer-component />
                </div>
            </div>
        </div>
    </q-layout>
</template>

<script>
import HeaderComponent from './header.vue'
import MenuComponent from './menu.vue'
import FooterComponent from './footer.vue'

export default {
    name: 'LayoutDesktop',
    components: {
        HeaderComponent,
        MenuComponent,
        FooterComponent
    },
    data () {
        return {}
    },
    methods: {}
}
</script>

<style>
    .desktop-container {
        max-width: 1300px !important;
        margin: 0px auto !important;
        position: relative;
        padding-top: 180px;
    }
    .desktop-container .content {
        z-index: 2;
    }
    .desktop-container .content .body {
        background: white;
        min-height: calc(100vh - 180px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        margin-top: -70px;
        margin-right: 15px;
    }
    .desktop-header {
        box-shadow: none !important;
        z-index: 1 !important;
    }
    .desktop-header .header-container {
        height: auto !important;
        max-width: 1300px;
        margin: 0px auto;
        position: relative;
        width: 100%
    }
    .desktop-header .toolbar {
        height: 250px;
        top: 0;
        margin-top: -70px;
    }
</style>
