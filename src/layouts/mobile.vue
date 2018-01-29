<template>
    <q-layout ref="layout" view="hHr LpR Fff">
        <q-layout-header class="mobile-header">
            <q-toolbar color="secondary"
                class="row toolbar no-shadow"
            >
                <div class="row header-container">
                    <q-btn
                        flat
                        @click="leftDrawerOpen = !leftDrawerOpen"
                        class="mobile-only"
                    >
                        <q-icon name="menu" />
                    </q-btn>

                    <q-toolbar-title>
                        <div class="desktop-only">Smartex</div>
                        <div class="subtitle desktop-only">Discover your power</div>
                    </q-toolbar-title>

                    <q-btn flat>
                        <q-icon name="assignment_ind" size="35px" v-if="!profile.avatar" />
                        <img :src="profile.avatar_link" class="avatar" v-if="profile.avatar"/>

                        <div>
                            <div class="fio">{{this.profile.name}} {{this.profile.family}}</div>
                            <div class="role">
                                <span v-for="roleItem in this.role" :key="roleItem.name">{{roleItem.displayName}}&nbsp;</span>
                            </div>
                        </div>

                        <!-- Direct child of target -->
                        <q-popover ref="popover"
                            anchor="center middle"
                            self="center middle"
                        >
                            <!-- The DOM element(s) that make up the popup, in this case a list: -->
                            <q-list separator link>
                                <q-item @click="$refs.popover.close(), goToProfile()" class="menu-item">
                                    <q-icon name="person" size="20px" />
                                    &nbsp;Profile
                                </q-item>
                                <q-item @click="$refs.popover.close(), logout()" class="menu-item">
                                    <q-icon name="exit_to_app" size="20px" />
                                    &nbsp;Sing Out
                                </q-item>
                            </q-list>
                        </q-popover>
                    </q-btn>
                </div>
            </q-toolbar>
        </q-layout-header>

        <!-- Left Side Panel -->
        <q-layout-drawer
            v-model="leftDrawerOpen"
            content-class="bg-grey-2"
        >
            <menu-component />
        </q-layout-drawer>

        <!-- your content -->
        <div class="row mobile-content">
            <div class="col-12 body">
                <router-view />
            </div>
        </div>

        <!-- Footer -->
        <footer-component />
    </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import HeaderComponent from './header.vue'
import MenuComponent from './menu.vue'
import FooterComponent from './footer.vue'

export default {
    name: 'LayoutMobile',
    components: {
        HeaderComponent,
        MenuComponent,
        FooterComponent
    },
    data () {
        return {
            leftDrawerOpen: false
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
        }
    },
    computed: {
        ...mapGetters('user', [
            'isLogin', 'profile', 'role', 'pending'
        ])
    }
}
</script>

<style>
    .mobile-content {
        margin-right: 20px;
        margin-left: 20px;
        padding-top: 125px;
    }
    .mobile-content  .body {
        background: white;
        min-height: calc(100vh - 190px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        margin-right: 15px;
        z-index: 2;
    }
    .mobile-header {
        box-shadow: none !important;
        z-index: 1 !important;
    }
    .mobile-header .header-container {
        height: auto !important;
        max-width: 1300px;
        position: relative;
        width: 100%;
        margin-top: -40px;
    }
    .mobile .toolbar {
        height: 200px;
        top: 0;
        margin-top: -20px;
    }
</style>
