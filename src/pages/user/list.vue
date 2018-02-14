<template>
    <div class="users">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <div v-show="!pending">
            <q-card-title>
                {{ this.$router.currentRoute.meta.title }}
                <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
                <span slot="right">
                    <q-btn flat
                           @click="getUsersList()"
                           :disable="pending"
                    >
                        <q-icon name="refresh" />
                    </q-btn>
                    <q-btn flat
                           @click="goToAddUser()"
                           :disable="pending"
                    >
                        <q-icon name="add" />
                    </q-btn>
                </span>
            </q-card-title>
            <q-card-main>
                <div class="gutter-sm">
                    <div class="row gutter-sm">
                        <div class="col-12">
                            <q-search v-on:keyup.enter="getUsersList()"
                                      v-model="search"
                                      :disable="pending"
                                      placeholder="Search by ID, Name, Family, e-mail"
                                      suffix="Press enter to start search"
                            />
                        </div>
                    </div>
                </div>
                <div class="row users-table">
                    <div class="col-12">
                        <q-table
                                class="shadow-1"
                                :data="items"
                                :columns="columns"
                                row-key="id"
                                :pagination.sync="serverPagination"
                                @request="getUsersList"
                        >
                            <q-td slot="body-cell-date" slot-scope="props" :props="props">
                                {{props.value | moment('DD.MM.YYYY')}}
                            </q-td>
                            <q-td slot="body-cell-fio" slot-scope="props" :props="props">
                                {{props.row.name + ' ' + props.row.family}}
                            </q-td>
                            <q-td slot="body-cell-action" slot-scope="props" :props="props">
                                <q-btn flat icon="edit" @click="goToEditUser(props.row)" />
                                <q-btn flat icon="payment" @click="goToUserTransactions(props.row)" />
                                <q-btn flat icon="insert_comment" @click="goToUserComment(props.row)" />
                                <q-btn flat :color="props.row.verification_ok ? 'secondary' : 'red'" :disable="props.row.verification_ok || props.row.verification_image === ''" icon="verified_user" @click="goToUserVerification(props.row)" />
                                <q-btn flat color="red" icon="delete_forever" @click="openDeleteDialog(props.row)" />
                            </q-td>
                        </q-table>
                    </div>
                </div>
            </q-card-main>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { QSearch, QTable, QTd } from 'quasar'
import InnerLoadingLayout from '../../layouts/InnerLoading'

import tableConfig from '../../config/table'
import HttpHelper from '../../helpers/http'

export default {
    name: 'UsersListPage',
    components: {
        QSearch,
        QTable,
        QTd,
        InnerLoadingLayout
    },
    data () {
        return {
            loading: true,
            serverPagination: this.getDefaultPagination(),
            items: [],
            search: '',
            errors: [],
            columns: [
                {
                    name: 'id',
                    label: 'ID',
                    field: 'id'
                },
                {
                    name: 'date',
                    label: 'Date',
                    field: 'date',
                    sortable: true,
                    format (value, row) {
                        return value.date
                    }
                },
                {
                    name: 'fio',
                    label: 'Name',
                    field: 'fio'
                },
                {
                    name: 'email',
                    label: 'E-mail',
                    field: 'email'
                },
                {
                    name: 'comment',
                    label: 'Comment',
                    field: 'comment',
                    sortable: true
                },
                {
                    name: 'action',
                    label: '',
                    field: 'action'
                }
            ]
        }
    },
    mounted () {
        this.getUsersList()
    },
    computed: {
        ...mapGetters('user', [
            'users', 'pending', 'meta'
        ])
    },
    watch: {
        search: function (val) {
            if (val === '') {
                this.getUsersList()
            }
        }
    },
    methods: {
        ...mapActions('user', [
            'remove', 'list', 'edit'
        ]),
        getDefaultPagination () {
            return {
                q: '',
                filters: {},
                include: 'roles',
                page: 1,
                rowsPerPage: tableConfig.perPage,
                rowsNumber: tableConfig.rowsNumber,
                sortBy: 'date',
                descending: true
            }
        },
        applyPaginationFromTable (pagination, props) {
            if (props) {
                let { page, rowsPerPage, sortBy, descending } = props.pagination
                pagination.page = page
                pagination.rowsPerPage = rowsPerPage
                pagination.sortBy = sortBy
                pagination.descending = descending
            }

            return pagination
        },
        goToUserComment (user) {
            let editUser = user

            this.$q.dialog({
                title: 'Change comment of user ' + user.name + ' ' + user.family,
                message: '',
                prompt: {
                    model: editUser.comment,
                    type: 'text'
                },
                cancel: true,
                preventClose: true,
                color: 'secondary'
            }).then(data => {
                this.saveUser({
                    id: editUser.id,
                    email: editUser.email,
                    comment: data
                })
            }).catch(() => {
                console.log('>>>> Cancel')
            })
        },
        goToUserVerification () {},
        goToUserTransactions () {},
        goToAddUser () {
            this.$router.push({
                name: 'userAdd'
            })
        },
        goToEditUser (userItem) {
            this.$router.push({
                name: 'userEdit',
                params: { userId: userItem.id }
            })
        },
        openDeleteDialog (user) {
            this.$q.dialog({
                title: 'Delete',
                message: 'Are you sure that you want to delete the user ' + user.name + ' ' + user.family + '?',
                cancel: true,
                preventClose: true,
                color: 'secondary'
            }).then(data => {
                this.deleteUser(user)
            }).catch(() => {
                console.log('>>>> Cancel')
            })
        },
        getUsersList (props) {
            let requestOptions = this.getDefaultPagination()
            if (props) {
                requestOptions = this.applyPaginationFromTable(requestOptions, props)
            }

            if (this.search.length > 0) {
                requestOptions.q = this.search
            }

            this.list(HttpHelper.getPaginationParam(requestOptions)).then(() => {
                this.items = this.users
                this.serverPagination = requestOptions
                this.serverPagination.rowsNumber = this.meta.count
            })
        },
        saveUser (user) {
            this.edit(user).then(response => {
                this.getUsersList()
            }).catch(errors => {
                this.errors = errors.errors
            })
        },
        deleteUser (user) {
            this.remove(user.id).then(response => {
                this.getUsersList()
            }).catch(errors => {
                this.errors = errors
            })
        }
    }
}
</script>

<style scoped>
    .users-table {
        margin-top: 50px;
    }
</style>
