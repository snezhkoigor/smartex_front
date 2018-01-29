<template>
    <!-- if you want automatic padding use "layout-padding" class -->
    <q-layout>
        <q-page-container>
            <q-page class="flex flex-center">
                <div class="layout-padding reset-form">
                    <!-- your content -->
                    <!-- Tabs -->
                    <div class="row justify-center vertical-middle">
                        <div class="col-12">
                            <q-tabs color="secondary" inverted class="shadow-1" align="justify">
                                <q-route-tab
                                        label="Sing in"
                                        to="/login"
                                        exact
                                        slot="title"
                                />
                                <q-route-tab
                                        label="Forget?"
                                        to="/password-reset"
                                        exact
                                        slot="title"
                                />
                                <div class="form" color="light">
                                    <div class="row">
                                        <div class="col-12">
                                            <q-field :error-label="errors && errors.email ? errors.email[0] : ''" :error="errors && !!errors.email">
                                                <q-input v-model="email"
                                                         @keyup.enter="reset"
                                                         type="email"
                                                         float-label="E-mail"
                                                />
                                            </q-field>
                                        </div>
                                    </div>
                                    <div class="row sign-in-btn">
                                        <div class="col-12">
                                            <q-btn color="secondary"
                                                   class="full-width"
                                                   @click="reset"
                                                   :disable="pending"
                                            >
                                                Reset
                                            </q-btn>
                                        </div>
                                    </div>
                                </div>
                            </q-tabs>
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
        ...mapGetters('user', [
            'pending'
        ])
    },
    methods: {
        ...mapActions('user', [
            'resetPassword'
        ]),
        reset () {
            this.resetPassword(this.email).then(() => {
                this.errors = []
                this.$q.notify('Check your mail box for new password and Sing In.')
                // Notify.create({
                //     html: 'Check your mail box for new password and Sing In.',
                //     timeout: toastConfig.positive.timeout,
                //     bgColor: toastConfig.positive.bgColor
                // })
            }).catch(errors => {
                this.errors = errors.errors
            })
        }
    }
}
</script>

<style>
    .reset-form {
        width: 450px;
    }
    .reset-form .form {
        padding: 20px;
        background-color: #f4f4f4;
    }
    .reset-form .form .sign-in-btn {
        padding-top: 20px;
    }
</style>
