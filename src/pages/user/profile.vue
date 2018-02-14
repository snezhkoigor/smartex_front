<template>
    <div class="profile">
        <q-card-title>
            {{ this.$router.currentRoute.meta.title }}
            <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
            <span slot="right">
                <q-btn flat
                       class="full-width"
                       @click="profileSave()"
                       :disable="pending"
                >
                    Save
                </q-btn>
            </span>
        </q-card-title>
        <q-card-main>
            <div class="row gutter-sm">
                <div class="col-sm-3 avatar">
                    <picture-input
                        @change="onChangeAvatarImage"
                        ref="pictureInput"
                        :margin="pictureInput.margin"
                        :accept="pictureInput.accept"
                        :size="pictureInput.size"
                        :prefill="currentProfile.avatar_link"
                        :buttonClass="pictureInput.buttonClass.button"
                        :zIndex="pictureInput.zIndex"
                        :removeButtonClass="pictureInput.buttonClass.removeButton"
                        :removable="pictureInput.removable"
                        :customStrings="pictureInput.customStrings"
                    >
                    </picture-input>
                </div>

                <div class="col-sm-9 gutter-sm">
                    <q-field :error-label="errors && errors.name ? errors.name[0] : ''" :error="errors && !!errors.name">
                        <q-input v-model="currentProfile.name"
                                 float-label="First name"
                                 :disable="pending"
                        />
                    </q-field>
                    <q-field :error-label="errors && errors.family ? errors.family[0] : ''" :error="errors && !!errors.family">
                        <q-input v-model="currentProfile.family"
                                 float-label="Last name"
                                 :disable="pending"
                        />
                    </q-field>
                    <q-field :error-label="errors && errors.email ? errors.email[0] : ''" :error="errors && !!errors.email">
                        <q-input v-model="currentProfile.email"
                                 type="email"
                                 float-label="E-mail"
                                 :disable="pending"
                        />
                    </q-field>

                    <div class="row gutter-sm">
                        <div :class="{'col-sm-12': !currentProfile.new_password, 'col-sm-6': currentProfile.new_password}">
                            <q-field :error-label="errors && errors.new_password ? errors.new_password[0] : ''" :error="errors && !!errors.new_password">
                                <q-input v-model="currentProfile.new_password"
                                         type="password"
                                         float-label="New password"
                                         :disable="pending"
                                />
                            </q-field>
                        </div>
                        <div class="col-sm-6">
                            <q-field v-show="currentProfile.new_password" :error-label="errors && errors.current_password ? errors.current_password[0] : ''" :error="errors && !!errors.current_password">
                                <q-input v-model="currentProfile.current_password"
                                         type="password"
                                         float-label="Current password"
                                         :disable="pending || currentProfile.new_password === undefined || currentProfile.new_password.length === 0"
                                />
                            </q-field>
                        </div>
                    </div>
                </div>
            </div>
        </q-card-main>
    </div>
</template>

<script>
import {
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QBtn,
    QField,
    QInput
} from 'quasar'

import { mapGetters, mapActions } from 'vuex'
import pictureInputConfig from '../../config/pictureInput'
import PictureInput from 'vue-picture-input'

export default {
    data () {
        return {
            visiblePassword: true,
            newPassword: '',
            currentPassword: '',
            errors: [],
            loader: null,

            pagination: {
                include: 'roles'
            },

            pictureInput: pictureInputConfig,
            currentProfile: {},

            avatarImageChanged: false
        }
    },
    components: {
        PictureInput,
        QCard,
        QCardTitle,
        QCardSeparator,
        QCardMain,
        QBtn,
        QField,
        QInput
    },
    mounted () {
        this.getUserProfile()
    },
    computed: {
        ...mapGetters('user', [
            'pending', 'profile'
        ])
    },

    methods: {
        ...mapActions('user', [
            'add', 'updateProfile', 'getProfile'
        ]),
        onChangeAvatarImage () {
            this.avatarImageChanged = true
        },
        getUserProfile () {
            this.getProfile(this.pagination).then(() => {
                this.currentProfile = this.setCurrentProfile()
            })
        },
        setCurrentProfile () {
            return {
                name: this.profile.name,
                family: this.profile.family,
                email: this.profile.email,
                new_password: '',
                current_password: '',
                logo_64_base: '',
                avatar_link: this.profile.avatar_link
            }
        },
        profileSave () {
            if (this.avatarImageChanged) {
                this.currentProfile.logo_64_base = this.$refs.pictureInput.image
            }

            this.updateProfile(this.currentProfile).then(response => {
                this.errors = []
                this.currentProfile.current_password = ''
                this.currentProfile.new_password = ''
            }).catch(errors => {
                this.errors = errors.errors
            })
        }
    }
}
</script>

<style scoped>
</style>
