<template>
	<v-container fluid grid-list-md class="hidden-sm-and-down">
		<v-layout row wrap>
			<v-flex d-flex d-flex xs2 sm2 class="flex-menu-container">
				<v-card class="card--flex-toolbar">
					<menu-component />
				</v-card>
			</v-flex>
			<v-flex d-flex d-flex xs10 sm10>
				<v-card class="card--flex-toolbar">
					<router-view />
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
    import MenuComponent from '@/components/Layouts/Menu.vue';

    export default {
        components: {
            MenuComponent
        },
    }
</script>

<style>
	.flex-menu-container {
		height: 100%;
		width: 100%;
	}
</style>