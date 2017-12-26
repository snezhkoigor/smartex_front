<template>
    <div class="reset-form">
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
                    <v-tabs-content key="passwordReset" id="passwordReset">
                        <v-card flat>
                            <v-card-text v-if="!successReset">
                                <v-form ref="formReset">
                                    <v-text-field
                                            v-model="email"
                                            label="E-mail"
                                            :error-messages="errors && errors.email ? errors.email : []"
                                            :error="errors && !!errors.email"
                                            data-vv-name="email"
                                            required
                                    ></v-text-field>
                                    <v-btn block
                                            color="teal lighten-1"
                                            @click="reset()"
                                            :loading="pending"
                                            :disabled="pending"
                                    >
                                        <span class="white--text">Reset</span>
                                        <span slot="loader">Sending...</span>
                                    </v-btn>
                                </v-form>
                            </v-card-text>
                            <v-card-text v-if="successReset">
                                <p>
                                    Check your mail box for new password and Sing In.
                                </p>
                                <v-btn block
                                        dark
                                        color="teal lighten-1"
                                        @click.stop="closeSuccessReset()"
                                >
                                    Close
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-tabs-content>
                    <v-tabs-content key="login" id="login">
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
                email: '',
				errors: [],
                loader: null,
                successReset: false,
				tabs: [
					{
					  name: 'login',
					  title: 'Sing In'
					},
					{
					  name: 'passwordReset',
					  title: 'Forget?'
					}
				],
				active: 'passwordReset'
			}
		},
		computed: {
			...mapGetters('User', [
			  'pending'
			])
		},
		methods: {
            ...mapActions('User', [
                'resetPassword'
            ]),
			reset() {
                this.resetPassword(this.email).then(() => {
				    this.errors = [];
				    this.successReset = true;
				}).catch(errors => {
					this.errors = errors;
				});
			},
            closeSuccessReset() {
                this.successReset = false;
                this.email = '';
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
    .reset-form {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: auto;
    }
    .reset-form .form {
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -150px 0 0 -150px;
    }
    .reset-form .tabs__bar {
        height: 48px !important;
    }
    .reset-form .tabs__wrapper {
        overflow: hidden;
    }
</style>
