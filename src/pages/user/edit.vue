<template>
    <div class="commissions">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <div v-show="!pending">
            <q-card-title>
                <router-link class="breadcrumbs-link" :to="{ name: 'usersList'}">Users</router-link> / {{ this.$router.currentRoute.meta.title }}
                <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
                <span slot="right">
                    <q-btn flat
                           class="full-width"
                           @click="editUser()"
                           :disable="pending"
                    >
                        Edit
                    </q-btn>
                </span>
            </q-card-title>
            <q-card-main>
                <div class="gutter-sm">
                    <div class="row">
                        <div class="col-12">
                            <q-field
                                    :error-label="errors && errors.role_id ? errors.role_id[0] : ''"
                                    :error="errors && !!errors.role_id"
                            >
                                <q-select
                                        v-model="userItem.role_id"
                                        float-label="Role"
                                        :options="roles"
                                        :disable="pending"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-y-sm">
                        <div class="col-12">
                            <q-field :error-label="errors && errors.email ? errors.email[0] : ''"
                                     :error="errors && !!errors.email"
                            >
                                <q-input v-model="userItem.email"
                                         float-label="Email *"
                                         :disable="pending"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-y-sm">
                        <div class="col-12">
                            <q-field :error-label="errors && errors.name ? errors.name[0] : ''"
                                     :error="errors && !!errors.name"
                            >
                                <q-input v-model="userItem.name"
                                         float-label="Name"
                                         :disable="pending"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-y-sm">
                        <div class="col-12">
                            <q-field :error-label="errors && errors.family ? errors.family[0] : ''"
                                     :error="errors && !!errors.family"
                            >
                                <q-input v-model="userItem.family"
                                         float-label="Family"
                                         :disable="pending"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-y-sm">
                        <div class="col-12">
                            <q-field :error-label="errors && errors.password ? errors.password[0] : ''"
                                     :error="errors && !!errors.password">
                                <q-input v-model="userItem.password" type="password" float-label="Password" />
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-y-sm">
                        <div class="col-12">
                            <q-field :error-label="errors && errors.comment ? errors.comment[0] : ''"
                                     :error="errors && !!errors.comment"
                            >
                                <q-input v-model="userItem.comment"
                                         float-label="Comment"
                                         :disable="pending"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 active-checkbox">
                            <q-checkbox v-model="userItem.activation"
                                        label="Will user be active?"
                                        :disable="pending"
                            />
                        </div>
                    </div>
                </div>
            </q-card-main>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { QSelect, QCheckbox, QField, QInput } from 'quasar'
import InnerLoadingLayout from '../../layouts/InnerLoading'

export default {
    name: 'UserEditPage',
    components: {
        QSelect,
        QCheckbox,
        QField,
        QInput,
        InnerLoadingLayout
    },
    data () {
        return {
            userItem: this.setDefaultUserObject(),
            roles: [],

            loading: true,
            errors: [],
            loader: null
        }
    },
    mounted () {
        this.getUser()
    },
    computed: {
        ...mapGetters('user', [
            'pending', 'meta', 'user'
        ])
    },
    methods: {
        ...mapActions('user', [
            'edit', 'getById'
        ]),
        setDefaultUserObject () {
            return {
                id: parseInt(this.$route.params.userId),
                name: '',
                family: '',
                email: '',
                role_id: null,
                activation: null,
                comment: '',
                password: ''
            }
        },
        getUser () {
            this.getById(this.userItem.id).then(response => {
                this.roles = this.meta.roles

                this.userItem.name = this.user.name
                this.userItem.family = this.user.family
                this.userItem.email = this.user.email
                this.userItem.activation = this.user.activation
                this.userItem.comment = this.user.comment
                if (this.user) {
                    this.userItem.role_id = this.user.roles.data[0].id
                }
            })
        },
        editUser () {
            this.edit(this.userItem).then(response => {
                this.$router.push({
                    name: 'usersList'
                })
            }).catch(errors => {
                this.errors = errors.errors
            })
        }
    }
}
</script>

<style scoped>
    .active-checkbox {
        margin-top: 20px;
    }
</style>
