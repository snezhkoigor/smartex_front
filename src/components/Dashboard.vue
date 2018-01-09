<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title title grey--text title-tool-bar">
				{{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
		</v-toolbar>

		<v-divider />

		<v-card-text>
			<v-container grid-list-md fluid>
				<v-layout row-md wrap>
					<v-flex xs12 sm7 md7>
						<total-clients-registrations-and-activations />
					</v-flex>
					<v-flex xs12 sm5 md5>
						<total-clients-registrations />
					</v-flex>
				</v-layout>
			</v-container>
		</v-card-text>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import TotalClientsRegistrations from '@/components/Widgets/Clients/TotalRegistrations.vue';
    import TotalClientsRegistrationsAndActivations from '@/components/Widgets/Clients/TotalRegistrationsAndActivations.vue';

    export default {
        data () {
            return {
                clientStep: 1
            }
        },
        components: {
            TotalClientsRegistrations,
            TotalClientsRegistrationsAndActivations
        },
        computed: {
            ...mapGetters('User', [
                'isLogin', 'role'
            ])
        }
    }
</script>

<style>

</style>
