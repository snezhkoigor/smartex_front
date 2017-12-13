<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="body-2 grey--text title-tool-bar">
				{{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
		</v-toolbar>

		<v-divider></v-divider>

		<v-card-text>
		</v-card-text>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters('User', [
                'isLogin', 'role'
            ])
        }
    }
</script>

<style>

</style>
