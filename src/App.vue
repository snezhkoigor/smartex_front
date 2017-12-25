<template>
	<v-app id="inspire" v-bind:class="{ 'teal darken-1': !isLogin }">
		<header-component v-if="isLogin" />

		<mobile-component v-if="this.profile" />
		<desktop-component v-if="this.profile" />
		<no-auth-component v-if="!isLogin" />
	</v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import HeaderComponent from '@/components/Layouts/Header.vue';
    import MobileComponent from '@/components/Layouts/Mobile.vue';
    import DesktopComponent from '@/components/Layouts/Desktop.vue';
    import NoAuthComponent from '@/components/Layouts/NoAuth.vue';

	export default {
        data: () => ({
            drawer: false,
        }),
        components: {
            HeaderComponent,
            MobileComponent,
            DesktopComponent,
            NoAuthComponent
        },
        computed: {
            ...mapGetters('User', [
                'isLogin', 'profile'
            ])
        }
	}
</script>

<style>
	#inspire {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
	.card--flex-toolbar {
		margin-top: -46px;
	}
	.menu .btn {
		margin-top: -2px;
		height: 50px !important
	}
	.fio {
		margin-left: 10px;
		font-size: 11px;
	}
	.role {
		margin-left: 10px;
		font-size: 7px;
	}
	.fr-element ul, ol {
		padding-left: 30px;
	}
	button.accent {
		color: black !important;
	}
	div.fr-element .fr-view {
		padding-left: 40px;
	}
	.dialog--fullscreen .toolbar__content, .dialog--fullscreen form {
		max-width: 1300px !important;
		padding: 0px 9px !important;
		margin: 0px auto !important;
		position: relative;
	}
	.pending {
		height: 5px;
		position: absolute !important;
		top: 0;
		margin-top: 58px !important;
	}

	a.breadcrumbs-link {
		text-decoration: none;
	}

	.table-list-data {
		cursor: pointer;
		font-size: 14px !important;
	}
	.table-list-actions {
		float: right;
	}
	.clear-filter-button {
		float: right;
		margin: -20px 0 0 0;
	}
</style>
