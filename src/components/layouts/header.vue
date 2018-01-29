<template>
    <q-toolbar color="secondary"
        class="row toolbar no-shadow"
    >
        <div class="row header-container">
            <!-- toggles QLayout left side -->
            <q-btn
                flat
                @click="toggleMenu()"
                class="lt-lg"
            >
                <q-icon name="menu" />
            </q-btn>

            <q-toolbar-title>
                <div class="gt-lg">Smartex</div>
                <div class="subtitle gt-lg">Discover your power</div>
            </q-toolbar-title>

            <q-btn flat :class="{'mobile-user-btn': this.layoutRefs.mobile, '': !this.layoutRefs.mobile}">
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
                            <q-icon name="person" size="20px"/>
                            &nbsp;Profile
                        </q-item>
                        <q-item @click="logout()" class="menu-item">
                            <q-icon name="exit_to_app" size="20px"/>
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

    import {
        QToolbar,
        QBtn,
        QToolbarTitle,
        QIcon,
        QPopover,
        QList,
        QItem
    } from 'quasar'

    export default {
        components: {
            QToolbar,
            QBtn,
            QToolbarTitle,
            QIcon,
            QPopover,
            QList,
            QItem
        },
        data () {
            return {
                refs: null
            }
        },
        methods: {
            ...mapActions('User', [
                'logout'
            ]),
            goToProfile () {
                this.$router.push({
                    name: 'profile'
                })
            },
            toggleMenu () {
                this.layoutRefs.mobile.toggleLeft()
            }
        },
        computed: {
            ...mapGetters('User', [
                'isLogin', 'profile', 'role', 'pending'
            ])
        },
        props: ['layoutRefs']
    }
</script>

<style>
    .header-container {
        min-height: 48px;
    }
    .q-toolbar-title {
        padding: 0 45px;
    }
    .q-toolbar-title .subtitle {
        font-size: 11px
    }
    .toolbar {
        height: 250px;
        top: 0;
        margin-top: -70px;
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
