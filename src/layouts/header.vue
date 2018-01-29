<template>
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
                        <q-item @click.stop="logout()" class="menu-item">
                            <q-icon name="exit_to_app" size="20px" />
                            &nbsp;Sing Out
                        </q-item>
                    </q-list>
                </q-popover>
            </q-btn>
        </div>
    </q-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'LayoutHeader',
    data () {
        return {
            refs: null
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
        toggleMenu () {
            // this.layoutRefs.mobile.toggleLeft()
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
    .header-container {
        min-height: 48px;
        width: 100%;
    }
    .q-toolbar-title {
        padding: 0 45px;
    }
    .q-toolbar-title .subtitle {
        font-size: 11px
    }
    .fio {
        margin-left: 10px;
        font-size: 17px;
    }
    .role {
        margin-left: 10px;
        font-size: 8px;
    }
    img.avatar {
        width: 45px;
        height: 45px
    }
    .menu-item {
        width: 200px;
    }
</style>
