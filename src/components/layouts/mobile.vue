<template>
    <!-- Configure "view" prop for QLayout -->
    <q-layout ref="mobile">
        <!-- Header -->
        <div slot="header" class="mobile-header">
            <header-component :layoutRefs="this.$refs" />
        </div>

        <!-- Left Side Panel -->
        <div slot="left">
            <menu-component :layoutRefs="this.$refs" />
        </div>

        <!-- your content -->
        <div class="mobile-content">
            <router-view />
            <!--<content-component  :layoutRefs="this.$refs" :rootRefs="this.rootRefs" />-->
        </div>

        <!-- Footer -->
        <footer-component />
    </q-layout>
</template>

<script>
    import {
        QLayout,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon
    } from 'quasar'

    import HeaderComponent from '@/layouts/header.vue'
    import MenuComponent from '@/layouts/menu.vue'
    import FooterComponent from '@/layouts/footer.vue'

    export default {
        name: 'Mobile',
        components: {
            QLayout,
            QToolbar,
            QToolbarTitle,
            QBtn,
            QIcon,
            MenuComponent,
            FooterComponent,
            HeaderComponent
        },
        data () {
            return {
                refs: this.$refs
            }
        },
        props: ['rootRefs']
    }
</script>

<style>
    .transition-generic {
        transition: all 0.3s;
    }
    .mobile-content {
        background: white;
        min-height: calc(100vh - 180px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        margin: -70px 15px 0px 15px !important;
    }
    .mobile-header .header-container {
        height: auto !important;
		max-width: 1300px;
		/* padding: 0px 5px 0px 5px; */
		margin: 0px auto;
		position: relative; 
        width: 100%
    }
</style>
