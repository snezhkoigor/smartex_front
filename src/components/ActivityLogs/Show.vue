<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title title grey--text title-tool-bar">
				<router-link class="breadcrumbs-link" :to="{ name: 'activityLogList'}">Logs</router-link> <span v-if="activityLog">/ {{ activityLog.description | truncate(35) }}</span>
			</v-toolbar-title>
		</v-toolbar>

		<v-progress-linear class="pending" v-if="pending" v-bind:indeterminate="pending" />

		<v-divider />

		<v-container>
			<vue-json-pretty :data="activityLog" v-if="activityLog"/>
		</v-container>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import VueJsonPretty from 'vue-json-pretty';

    export default {
        components: {
            VueJsonPretty
        },
        mounted() {
            this.showLog(this.$route.params.activityLogId);
        },
        computed: {
            ...mapGetters('ActivityLog', [
                'pending', 'activityLog'
            ])
        },
        methods: {
            ...mapActions('ActivityLog', [
                'showLog', 'list'
            ])
        }
    }
</script>