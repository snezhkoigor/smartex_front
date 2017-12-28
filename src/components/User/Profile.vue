<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title title grey--text title-tool-bar">
				{{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn
					flat
					@click="profileSave()"
					:loading="pending"
					:disabled="pending"
			>
				<span>Save</span>
				<span slot="loader">Sending...</span>
			</v-btn>
		</v-toolbar>

		<v-progress-linear class="pending" v-if="pending" v-bind:indeterminate="pending"></v-progress-linear>

		<v-divider></v-divider>

		<v-container>
			<v-form ref="profileForm">
				<v-container grid-list-md fluid>
					<v-layout row-md wrap>
						<v-flex xs12 sm3 md3>
							<picture-input
									ref="pictureInput"
									:margin="pictureInput.margin"
									:accept="pictureInput.accept"
									:size="pictureInput.size"
									:prefill="currentProfile.avatar_link"
									:buttonClass="pictureInput.buttonClass.button"
									:zIndex="pictureInput.zIndex"
									:removeButtonClass="pictureInput.buttonClass.button"
									:removable="pictureInput.removable"
									:customStrings="pictureInput.customStrings"
							>
							</picture-input>
						</v-flex>
						<v-flex xs12 sm9 md9>
							<v-text-field
									label="First name"
									v-model="currentProfile.first_name"
									:disabled="pending"
									:error-messages="errors && errors.first_name ? errors.first_name[0] : []"
									:error="errors && !!errors.first_name"
							></v-text-field>
							<v-text-field
									label="Last name"
									v-model="currentProfile.last_name"
									:disabled="pending"
									:error-messages="errors && errors.last_name ? errors.last_name[0] : []"
									:error="errors && !!errors.last_name"
							></v-text-field>
							<v-text-field
									label="Email"
									v-model="currentProfile.email"
									:disabled="pending"
									required
									:error-messages="errors && errors.email ? errors.email[0] : []"
									:error="errors && !!errors.email"
							></v-text-field>
							<v-layout row-md wrap>
								<v-flex xs12 sm6 md6>
									<v-text-field
											label="New password"
											v-model="currentProfile.new_password"
											:disabled="pending"
											:append-icon="visiblePassword ? 'visibility_off' : 'visibility'"
											:append-icon-cb="() => (visiblePassword = !visiblePassword)"
											:type="visiblePassword ? 'password' : 'text'"
											:error-messages="errors && errors.new_password ? errors.new_password[0] : []"
											:error="errors && !!errors.new_password"
									></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md6>
									<v-text-field
											label="Current password"
											v-model="currentProfile.current_password"
											:disabled="pending || newPassword.length === 0"
											:append-icon="visiblePassword ? 'visibility_off' : 'visibility'"
											:append-icon-cb="() => (visiblePassword = !visiblePassword)"
											:type="visiblePassword ? 'password' : 'text'"
											:error-messages="errors && errors.current_password ? errors.current_password[0] : []"
											:error="errors && !!errors.current_password"
									></v-text-field>
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-container>
			</v-form>
		</v-container>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AppConfig from '../../config/app';
    import HttpHelper from '../../helpers/http';
    import PictureInput from 'vue-picture-input'

    export default {
        data() {
            return {
                visiblePassword: true,
                newPassword: '',
                currentPassword: '',
                errors: [],
                loader: null,

                pictureInput: AppConfig.pictureInput,
				currentProfile: {}
            }
        },
        components: {
            PictureInput
        },
		mounted() {
            this.getUserProfile();
		},
        computed: {
            ...mapGetters('User', [
                'pending', 'profile'
            ])
        },

        methods: {
            ...mapActions('User', [
                'add', 'updateProfile', 'getProfile'
            ]),
            getUserProfile () {
                this.getProfile().then(() => {
                    this.currentProfile = this.setCurrentProfile();
				});
			},
			setCurrentProfile() {
              	return {
              	    first_name: this.profile.first_name,
                    last_name: this.profile.last_name,
                    email: this.profile.email,
                    new_password: '',
                    current_password: '',
                    logo_64_base: '',
					avatar_link: this.profile.avatar_link
				}
			},
            profileSave() {
                // console.log(this.$refs.pictureInput.image);

				if (this.$refs.pictureInput.image) {
				    this.currentProfile.logo_64_base = this.$refs.pictureInput.image;
				}

                this.updateProfile(this.currentProfile).then(response => {
                    this.errors = [];
                    this.getProfile().then(() => {
                        this.currentProfile = this.setCurrentProfile();
					});
                }).catch(errors => {
                    this.errors = errors;
                });
            }
        }
    }
</script>