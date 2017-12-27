<template>
	<v-app id="inspire">
		<div v-if="isErrorPage()">
			<router-view />
		</div>
		<div v-if="!isErrorPage()">
			<div class="app-content" v-if="isLogin">
				<header-component/>

				<mobile-component/>
				<desktop-component/>
			</div>
			<div class="app-content" v-bind:class="{ 'teal darken-1': !isLogin }" v-if="!isLogin">
				<no-auth-component/>
			</div>

			<div :class="{'footer hidden-md-and-down blue-grey--text text--lighten-2': isLogin, 'footer hidden-md-and-down teal darken-1': !isLogin}">
				Copyright {{ new Date().getFullYear() }}, Smartex – the online exchange
			</div>
		</div>
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
        },
        methods: {
            isErrorPage() {
				return this.$router.currentRoute.meta.isErrorPage !== undefined && this.$router.currentRoute.meta.isErrorPage;
            }
        }
	}
</script>

<style>
	#inspire {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		background-color: white !important;
	}
	.app-content {
		min-height: calc(100vh - 100px);
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
		margin: -20px 0 0 0 !important;
	}
	.footer {
		width: 100%;
		padding: 50px;
		height: 50px;
		background: rgba(14,14,14,0.95);
		background-color: white !important;
		justify-content: center;
	}
	.error-container {
		max-width: 600px !important;
		padding: 0px 9px !important;
		margin: 50px auto !important;
		position: relative;

	}
	.error-container .error-gif {
		text-align: right
	}
	.error-container .error-title {
		text-align: left;
		margin-top: 20px
	}
	.error-container .error-text {
		text-align: initial;
		margin-top: 20px
	}
</style>
