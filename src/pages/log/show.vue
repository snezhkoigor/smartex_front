<template>
    <div class="logs">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <div v-show="!pending">
            <q-card-title>
                <router-link class="breadcrumbs-link" :to="{ name: 'activityLogList'}">Logs</router-link> <span v-if="activityLog">/ {{ activityLog.description | truncate(35) }}</span>
                <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
            </q-card-title>
            <q-card-main>
                <div class="row logs-show">
                    <vue-json-pretty :data="activityLog" v-if="activityLog"/>
                </div>
            </q-card-main>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueJsonPretty from 'vue-json-pretty'
import InnerLoadingLayout from '../../layouts/InnerLoading'

export default {
    components: {
        VueJsonPretty,
        InnerLoadingLayout
    },
    mounted () {
        this.show(this.$route.params.activityLogId)
    },
    computed: {
        ...mapGetters('log', [
            'pending', 'activityLog'
        ])
    },
    methods: {
        ...mapActions('log', [
            'show'
        ])
    }
}
</script>

<style scoped>
</style>
