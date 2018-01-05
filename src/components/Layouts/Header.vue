<template>
	<div color="grey lighten-5">
		<v-navigation-drawer
				fixed
				temporary
				app
				v-model="drawer"
				style="width: 205px;"
		>
			<menu-component />
		</v-navigation-drawer>

		<v-toolbar
				color="teal"
				dark
				flat
				class="header-toolbar"
		>
			<v-toolbar-title class="ml-0 header-toolbar-title">
				<v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up" style="margin-top: -15px"></v-toolbar-side-icon>
				<!--<span>-->
					<!--<img src="../../../static/img/logo.svg" class="logo"/>-->
				<!--</span>-->
			</v-toolbar-title>

			<div class="d-flex align-center" style="margin-left: auto;">
				<v-menu bottom left>
					<v-btn flat slot="activator" dark class="user-menu">
						<v-icon large dark v-if="!profile.avatar">fa-grav</v-icon>
						<v-avatar
								size="36px"
								v-if="profile.avatar"
						>
							<img :src="profile.avatar_link" />
						</v-avatar>
						<div>
							<div class="fio">{{this.profile.first_name}} {{this.profile.last_name}}</div>
							<div class="role">
								<span v-for="roleItem in this.role" :key="roleItem.name">{{roleItem.displayName}}&nbsp;</span>
							</div>
						</div>
					</v-btn>
					<v-list>
						<!--<v-list-tile avatar @click="goToProfile()" key="logout">-->
							<!--<v-list-tile-avatar>-->
								<!--<v-icon large v-if="!profile.avatar">fa-grav</v-icon>-->
								<!--<v-avatar-->
										<!--size="36px"-->
										<!--v-if="profile.avatar"-->
								<!--&gt;-->
									<!--<img :src="profile.avatar_link" />-->
								<!--</v-avatar>-->
							<!--</v-list-tile-avatar>-->
							<!--<v-list-tile-content>-->
								<!--<v-list-tile-title>-->
									<!--Profile-->
								<!--</v-list-tile-title>-->
								<!--<v-list-tile-sub-title>Setup your account</v-list-tile-sub-title>-->
							<!--</v-list-tile-content>-->
						<!--</v-list-tile>-->
						<v-list-tile @click="logout" key="logout">
							<v-list-tile-avatar>
								<v-icon large>mdi-exit-to-app</v-icon>
							</v-list-tile-avatar>
							<v-list-tile-content>
								<v-list-tile-title>
									Log Out
								</v-list-tile-title>
								<v-list-tile-sub-title></v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-menu>
			</div>
		</v-toolbar>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import MenuComponent from '@/components/Layouts/Menu.vue';

    export default {
        components: {
            MenuComponent
        },
        data: () => ({
            drawer: false,
        }),
        methods: {
            ...mapActions('User', [
                'logout'
            ]),
            goToProfile() {
                this.$router.push({
                    name: 'profile'
                });
			}
        },
        computed: {
            ...mapGetters('User', [
                'isLogin', 'profile', 'role'
            ])
        }
    }
</script>

<style>
	.header-toolbar-title {
		/*margin-top: 5px;*/
		width: 200px;
	}
	.header-toolbar .toolbar__content {
		height: auto !important;
		max-width: 1300px;
		padding: 0px 15px;
		margin: 0px auto;
		position: relative;
	}
	.header-toolbar {
		height: 106px;
	}
	img.logo {
		width: 100px;
	}
</style>