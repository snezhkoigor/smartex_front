<template>
    <div class="login-form">
        <div class="form elevation-1">
            <v-tabs fixed
                    centered
                    color="teal"
                    v-model="active"
                    dark
                    fixed-tabs
            >
                <v-tab
                        v-for="tab in tabs"
                        :key="tab.name"
                        :href="'#' + tab.name"
                        ripple
                        @click="changeTab(tab.name)"
                >
                    {{ tab.title }}
                </v-tab>
                <v-tab-item key="login" id="login">
                    <v-card flat>
                        <v-card-text>
                            <v-form ref="formLogin">
                                <v-text-field
                                        v-model="email"
                                        label="E-mail"
                                        v-on:keyup.enter="singIn()"
                                        :error-messages="errors && errors.email ? errors.email : []"
                                        :error="errors && !!errors.email"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        label="Пароль"
                                        v-model="password"
                                        v-on:keyup.enter="singIn()"
                                        :append-icon="visiblePassword ? 'visibility_off' : 'visibility'"
                                        :append-icon-cb="() => (visiblePassword = !visiblePassword)"
                                        :type="visiblePassword ? 'password' : 'text'"
                                        required
                                        :error-messages="errors && errors.password ? errors.password : []"
                                        :error="errors && !!errors.password"
                                ></v-text-field>
                                <v-btn block
                                        color="teal lighten-1"
                                        @click="singIn()"
                                        :loading="pending"
                                        :disabled="pending"
                                >
                                    <span class="white--text">Авторизация</span>
                                    <span slot="loader">Отправка...</span>
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

	export default {
		data () {
			return {
				visiblePassword: true,
                email: '',
				password: '',
				errors: [],
                loader: null,
				tabs: [
					{
					  name: 'login',
					  title: 'Авторизация'
					},
					// {
					//   name: 'passwordReset',
					//   title: 'Forget?'
					// }
				],
				active: 'login'
			}
		},
		computed: {
			...mapGetters('User', [
			  'pending'
			])
		},
		methods: {
            ...mapActions('User', [
                'login', 'getProfile'
            ]),
			singIn () {
                this.login({ email: this.email, password: this.password }).then(() => {
				    this.errors = [];
                    this.getProfile().then(() => {
                        this.$router.push({
                            name: 'dashboard'
                        });
                    });
				})
                .catch(errors => {
					this.errors = errors;
				});
			},
            changeTab (name) {
                this.$router.push({
                    name: name
                });
			}
		}
	}
</script>

<style>
    .login-form {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: auto;
    }
    .login-form .form {
        width: 320px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -160px 0 0 -160px;
    }
    .login-form .tabs__bar {
        height: 48px !important;
    }
    .login-form .tabs__wrapper {
        overflow: hidden !important;
    }
</style>
