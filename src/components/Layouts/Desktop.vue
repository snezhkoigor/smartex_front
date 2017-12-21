<template>
	<v-container fluid grid-list-md class="hidden-md-and-down desktop-container" v-scroll="onScroll">
		<v-layout row wrap>
			<v-flex d-flex d-flex xs2 sm2 class="flex-menu-container">
				<v-card :class="{'card--flex-toolbar': offsetTop <= 53, 'card--flex-toolbar fixed': offsetTop > 53}">
					<menu-component />
				</v-card>
			</v-flex>
			<v-flex d-flex d-flex xs10 sm10>
				<v-card class="card--flex-toolbar">
					<router-view></router-view>
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
        data () {
            return {
                offsetTop: 0
            }
        },

        methods: {
            onScroll (e) {
                this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
            }
        }
    }
</script>

<style>
	.flex-menu-container {
		height: 100%;
		width: 100%;
	}
	.flex-menu-container .fixed {
		position: fixed;
		min-width: 207px !important;
		z-index: 100;
		top: 0;
		margin-top: 5px;
		/*margin-right: 4px;*/
	}
	.flex-menu-container .card {
		min-width: 207px !important;
	}
	.desktop-container {
		max-width: 1300px !important;
		padding: 0px 9px !important;
		margin: 0px auto !important;
		position: relative;
	}
</style>