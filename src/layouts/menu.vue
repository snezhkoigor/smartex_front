<template>
    <div class="menu">
        <div class="profile-btn">
            <q-btn flat @click.stop="goToProfile()">
                <q-icon name="settings" class="avatar"></q-icon>
            </q-btn>
        </div>
        <div class="profile" color="secondary">
            <div class="photo">
                <q-icon name="help_outline" size="55px" v-if="!profile.avatar" />
                <img :src="profile.avatar_link + '/55'" class="avatar" v-if="profile.avatar"/>
            </div>
            <div class="user-info">
                <div class="fio">Welcome, {{this.profile.name}} {{this.profile.family}}</div>
                <div class="role">
                    <span v-for="roleItem in this.role" :key="roleItem.name">{{roleItem.displayName}}&nbsp;</span>
                </div>
            </div>
        </div>
        <q-item-separator />
        <q-list highlight no-border link>
            <q-list-header>Menu</q-list-header>
            <q-item to="/dashboard" v-if="hasAccess('dashboard')">
                <q-item-side icon="dashboard" />
                <q-item-main>
                    <q-item-tile label>Dashboard</q-item-tile>
                    <q-item-tile sublabel>Main information in graph</q-item-tile>
                </q-item-main>
            </q-item>
            <q-item to="/wallets" v-if="hasAccess('wallets')">
                <q-item-side icon="account_balance_wallet" />
                <q-item-main>
                    <q-item-tile label>Wallets</q-item-tile>
                    <q-item-tile sublabel>List of available wallets</q-item-tile>
                </q-item-main>
            </q-item>
            <q-item to="/exchanges" v-if="hasAccess('exchanges')">
                <q-item-side icon="swap_horiz" />
                <q-item-main>
                    <q-item-tile label>Exchanges</q-item-tile>
                    <q-item-tile sublabel>List of all exchanges</q-item-tile>
                </q-item-main>
            </q-item>
            <q-item to="/commissions" v-if="hasAccess('commissions')">
                <q-item-side icon="toll" />
                <q-item-main>
                    <q-item-tile label>Commissions</q-item-tile>
                    <q-item-tile sublabel>Operation's commissions</q-item-tile>
                </q-item-main>
            </q-item>
            <q-item to="/courses" v-if="hasAccess('courses')">
                <q-item-side icon="import_export" />
                <q-item-main>
                    <q-item-tile label>Courses</q-item-tile>
                    <q-item-tile sublabel>All courses by today</q-item-tile>
                </q-item-main>
            </q-item>
            <q-item to="/users" v-if="hasAccess('users')">
                <q-item-side icon="people" />
                <q-item-main>
                    <q-item-tile label>Users</q-item-tile>
                    <q-item-tile sublabel>Set up users data</q-item-tile>
                </q-item-main>
            </q-item>
            <q-item to="/news" v-if="hasAccess('news')">
                <q-item-side icon="chrome_reader_mode" />
                <q-item-main>
                    <q-item-tile label>News</q-item-tile>
                </q-item-main>
            </q-item>
            <q-item to="/activity-logs" v-if="hasAccess('activity-logs')">
                <q-item-side icon="report" />
                <q-item-main>
                    <q-item-tile label>Logs</q-item-tile>
                    <q-item-tile sublabel>All users activities</q-item-tile>
                </q-item-main>
            </q-item>
        </q-list>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { QItemSeparator, QItemTile } from 'quasar'

export default {
    name: 'LayoutMenu',
    components: {
        QItemSeparator,
        QItemTile
    },
    data () {
        return {
            leftDrawerOpen: true
        }
    },
    mounted () {},
    methods: {
        ...mapActions('user', [
            'logout'
        ]),
        goToProfile () {
            this.$router.push({
                name: 'profile'
            })
        },
        hasAccess (routeName) {
            let props = this.$router.resolve({
                name: routeName
            })

            if (props) {
                return this.$router.options.can(props.route.meta)
            }

            return false
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
    .menu .profile {
        padding: 20px;
    }
    .menu .profile .photo {
        text-align: center;
        margin-left: 40px;
        padding-bottom: 10px;
    }
    .menu .profile .user-info {
        text-align: center;
    }
    .menu .profile-btn {
        float: right;
    }
    .menu .profile .fio {
        margin-left: 10px;
        font-size: 17px;
    }
    .menu .profile .role {
        margin-top: 10px;
        font-size: 10px;
    }
</style>
