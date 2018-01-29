<template>
    <div class="menu">
        <q-list link no-border>
            <q-item to="/dashboard" v-if="hasAccess('dashboard')">
                <q-icon name="apps" size="25px" />
                &nbsp;Dashboard
            </q-item>
        </q-list>
        <q-list link no-border inset-delimiter>
            <q-item to="/login" v-if="hasAccess('dashboard')">
                <q-icon name="apps" size="25px" />
                &nbsp;login
            </q-item>
        </q-list>
    </div>
</template>

<script>
export default {
    name: 'LayoutMenu',
    data () {
        return {
            leftDrawerOpen: true
        }
    },
    mounted () {},
    methods: {
        hasAccess (routeName) {
            let props = this.$router.resolve({
                name: routeName
            })

            if (props) {
                return this.$router.options.can(props.route.meta)
            }

            return false
        }
    }
}
</script>

<style>
    .menu .q-list {
        padding: 0 !important;
    }
    .menu .q-list .q-item {
        font-size: 18px;
    }
</style>
