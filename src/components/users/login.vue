<template>
    <!-- if you want automatic padding use "layout-padding" class -->
    <div class="layout-padding login">
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
                                <q-field :error-label="errors && errors.email ? errors.email : ''" :error="errors && !!errors.email">
                                    <q-input v-model="email"
                                        @keyup.enter="singIn"
                                        type="email"
                                        float-label="E-mail"
                                    />
                                </q-field>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <q-field :error-label="errors && errors.password ? errors.password : ''" :error="errors && !!errors.password">
                                    <q-input v-model="password" @keyup.enter="singIn" type="password" float-label="Password" />
                                </q-field>
                            </div>
                        </div>
                        <div class="row sign-in-btn">
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
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import {
        QTabs,
        QRouteTab,
        QField,
        QInput,
        QBtn
    } from 'quasar'

    export default {
        components: {
            QTabs,
            QRouteTab,
            QField,
            QInput,
            QBtn
        },
        data () {
            return {
                email: '',
                password: '',
                errors: []
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
        },
        props: ['rootRefs']
    }
</script>

<style>
    .login {
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -180px 0 0 -200px;
    }
    .login .form {
        padding: 20px;
        background-color: #f4f4f4;
    }
    .login .form .sign-in-btn {
        padding-top: 20px;
    }
</style>
