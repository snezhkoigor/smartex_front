<template>
    <q-layout ref="layout" view="hHh Lpr lFf" :left-class="{'bg-grey-2': true}">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <q-layout-header class="desktop-header" v-show="!pending">
            <q-toolbar color="secondary"
                class="row toolbar no-shadow"
            >
                <div class="row header-container">
                    <q-btn
                        flat
                        @click="leftDrawerOpen = !leftDrawerOpen"
                    >
                        <q-icon name="menu" />
                    </q-btn>

                    <q-toolbar-title>
                        <div>{{projectName}}</div>
                        <div class="subtitle">Discover your power</div>
                    </q-toolbar-title>

                    <q-btn flat @click.stop="goToProfile()" v-if="!leftDrawerOpen && profile">
                        <q-icon name="settings" v-if="profile.avatar_link === undefined" />
                        <img :src="profile.avatar_link + '/25'" class="avatar" v-if="profile.avatar_link !== undefined"/>
                    </q-btn>
                    <q-btn flat @click.stop="singOut()">
                        <q-icon name="exit_to_app" />
                    </q-btn>
                </div>
            </q-toolbar>
        </q-layout-header>

        <!-- Left Side Panel -->
        <q-layout-drawer
            v-model="leftDrawerOpen"
            content-class="bg-grey-2 no-shadow"
            v-show="!pending"
        >
            <menu-component />
        </q-layout-drawer>

        <q-page-container v-show="!pending">
            <div class="row desktop-container">
                <div class="col-12 body">
                    <router-view/>
                    <!--<content-component :layoutRefs="this.$refs" :rootRefs="this.rootRefs" />-->
                </div>
            </div>
            <footer-component />
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import MenuComponent from './menu.vue'
import FooterComponent from './footer.vue'

import _envLocal from '../../env.js'
import InnerLoadingLayout from '../layouts/InnerLoading'

export default {
    name: 'LayoutDesktop',
    components: {
        MenuComponent,
        FooterComponent,
        InnerLoadingLayout
    },
    data () {
        return {
            leftDrawerOpen: true,
            projectName: _envLocal.APP_NAME
        }
    },
    methods: {
        ...mapActions('user', [
            'logout'
        ]),
        goToProfile () {
            this.$router.push({
                name: 'profile'
            })
        },
        singOut () {
            this.logout().then(() => {
                this.$router.push({
                    name: 'login'
                })
            })
        }
    },
    computed: {
        ...mapGetters('user', [
            'isLogin', 'profile', 'role', 'pending'
        ])
    }
}
</script>

<style scoped>
    .desktop-container {
        min-height: calc(100vh - 140px);
    }
    .desktop-header {
    }
    .desktop-header .toolbar {
        height: 70px;
        padding-bottom: 5px;
    }

    .header-container {
        min-height: 48px;
        width: 100%;
    }
    .subtitle {
        font-size: 11px
    }
    img.avatar {
        width: 25px;
        height: 25px
    }
</style>
