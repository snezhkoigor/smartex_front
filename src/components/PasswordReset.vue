<template>
    <div class="reset-form">
        <div class="form elevation-1">
            <v-tabs fixed
                    centered
                    color="teal"
                    v-model="active"
                    slider-color="yellow"
                    dark
                    :fixed-tabs="true"
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
                <v-tab-item key="passwordReset" id="passwordReset">
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
        width: 320px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -160px 0 0 -160px;
    }
    .reset-form .tabs__bar {
        height: 48px !important;
    }
    .reset-form .tabs__wrapper {
        overflow: hidden;
    }
</style>
