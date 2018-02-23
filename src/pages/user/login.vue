<template>
    <!-- if you want automatic padding use "layout-padding" class -->
    <q-layout>
        <q-page-container>
            <q-page class="flex flex-center">
                <div class="layout-padding login">
                    <!-- your content -->
                    <!-- Tabs -->
                    <div class="row justify-center vertical-middle">
                        <inner-loading-layout :pending="pending"></inner-loading-layout>
                        <div class="col-12" v-show="!pending">
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
                                    <div class="row gutter-sm">
                                        <div class="col-12">
                                            <q-field :error-label="errors && errors.email ? errors.email : ''" :error="errors && !!errors.email">
                                                <q-input v-model="email"
                                                    @keyup.enter="singIn"
                                                    type="email"
                                                    float-label="E-mail"
                                                />
                                            </q-field>
                                        </div>
                                    </div>
                                    <div class="row gutter-sm">
                                        <div class="col-12">
                                            <q-field :error-label="errors && errors.password ? errors.password : ''" :error="errors && !!errors.password">
                                                <q-input v-model="password" @keyup.enter="singIn" type="password" float-label="Password" />
                                            </q-field>
                                        </div>
                                    </div>
                                    <div class="row gutter-sm sign-in-btn">
                                        <div class="col-12">
                                            <q-btn color="secondary"
                                                class="full-width"
                                                @click="singIn"
                                                :disable="pending"
                                            >
                                                Sing In
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
import { QField, QInput } from 'quasar'

import InnerLoadingLayout from '../../layouts/InnerLoading'

export default {
    name: 'PageLogin',
    components: {
        InnerLoadingLayout,
        QField,
        QInput
    },
    data () {
        return {
            email: '',
            password: '',
            errors: []
        }
    },
    computed: {
        ...mapGetters('user', [
            'pending'
        ])
    },
    methods: {
        ...mapActions('user', [
            'login', 'getProfile'
        ]),
        singIn () {
            this.login({ email: this.email, password: this.password }).then(() => {
                this.errors = []
                this.getProfile({include: 'roles'}).then(() => {
                    this.$router.push({
                        name: 'dashboard'
                    })
                }).catch(errors => {
                    this.errors = errors.errors
                })
            }).catch(errors => {
                this.errors = errors.errors
            })
        }
    }
}
</script>

<style scoped>
    .login {
        width: 450px;
    }
    .login .form {
        padding: 20px;
        background-color: #f4f4f4;
    }
    .login .form .sign-in-btn {
        padding-top: 20px;
    }
</style>
