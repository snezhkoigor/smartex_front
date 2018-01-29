<template>
    <!-- if you want automatic padding use "layout-padding" class -->
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
</template>

<script>
    import {
        QTabs,
        QRouteTab,
        QField,
        QInput,
        QBtn,
        Toast
    } from 'quasar'

    import { mapGetters, mapActions } from 'vuex'
    import AppConfig from '../../config/app'

    export default {
        components: {
            QTabs,
            QRouteTab,
            QField,
            QInput,
            QBtn,
            Toast
        },
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
            reset () {
                this.resetPassword(this.email).then(() => {
                    this.errors = []
                    Toast.create({
                        html: 'Check your mail box for new password and Sing In.',
                        timeout: AppConfig.toast.positive.timeout,
                        bgColor: AppConfig.toast.positive.bgColor
                    })
                }).catch(errors => {
                    this.errors = errors.errors
                })
            }
        },
        props: ['rootRefs']
    }
</script>

<style>
    .reset-form {
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -180px 0 0 -200px;
    }
    .reset-form .form {
        padding: 20px;
        background-color: #f4f4f4;
    }
    .reset-form .form .sign-in-btn {
        padding-top: 20px;
    }
</style>
