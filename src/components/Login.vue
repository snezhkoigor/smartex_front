<template>
    <div class="login-form">
        <div class="form elevation-1">
            <v-tabs fixed centered v-model="active">
                <v-tabs-bar color="teal" dark>
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    <v-tabs-item
                            v-for="tab in tabs"
                            :key="tab.name"
                            :href="'#' + tab.name"
                            ripple
							@click="changeTab(tab.name)"
                    >
                        {{ tab.title }}
                    </v-tabs-item>
                </v-tabs-bar>
                <v-tabs-items>
                    <v-tabs-content key="login" id="login">
                        <v-card flat>
                            <v-card-text>
                                <v-form ref="formLogin">
                                    <v-text-field
                                            v-model="emailLogin"
                                            label="E-mail"
                                            v-on:keyup.enter="login()"
                                            :error-messages="errors && errors.email ? errors.email : []"
                                            :error="errors && !!errors.email"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            label="Password"
                                            v-model="password"
                                            v-on:keyup.enter="login()"
                                            :append-icon="visiblePassword ? 'visibility_off' : 'visibility'"
                                            :append-icon-cb="() => (visiblePassword = !visiblePassword)"
                                            :type="visiblePassword ? 'password' : 'text'"
                                            required
                                            :error-messages="errors && errors.password ? errors.password : []"
                                            :error="errors && !!errors.password"
                                    ></v-text-field>
                                    <v-btn block
                                            dark
                                            color="teal lighten-1"
                                            @click="login()"
                                            :loading="pending"
                                            :disabled="pending"
                                    >
                                        Login
                                        <span slot="loader">Sending...</span>
                                    </v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tabs-content>
                    <v-tabs-content key="passwordReset" id="passwordReset">
                    </v-tabs-content>
                </v-tabs-items>
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
				emailLogin: '',
                emailReset: '',
				password: '',
				errors: [],
                loader: null,
				tabs: [
					{
					  name: 'login',
					  title: 'Login'
					},
					{
					  name: 'passwordReset',
					  title: 'Forget?'
					}
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
			login () {
                this.$store.dispatch('User/login', {email: this.emailLogin, password: this.password }).then(() => {
				    this.errors = [];
				}).catch(errors => {
					this.errors = errors;
				});
			},
            changeTab (name) {
                this.$router.push({
                    name: name
                });
			},
			reset () {

			}
		}
	}
</script>

<style>
    .login-form {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: auto;
    }
    .login-form .form {
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -150px 0 0 -150px;
    }
    .login-form .tabs__bar {
        height: 48px !important;
    }
    .login-form .tabs__wrapper {
        overflow: hidden;
    }

</style>
