<template>
    <div class="logs">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <div v-show="!pending">
            <q-card-title>
                {{ this.$router.currentRoute.meta.title }}
                <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
                <span slot="right">
                    <q-btn flat
                           @click="getLogList()"
                           :disable="pending"
                    >
                        <q-icon name="refresh" />
                    </q-btn>
                </span>
            </q-card-title>
            <q-card-main>
                <div class="gutter-sm">
                    <div class="row gutter-sm">
                        <div class="col-12">
                            <q-search v-on:keyup.enter="getLogList()"
                                      v-model="search"
                                      :disable="pending"
                                      placeholder="Search by description"
                                      suffix="Press enter to start search"
                            />
                        </div>
                    </div>
                    <div class="row gutter-sm">
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                                    ref="filterBySubjectTypeRef"
                                    v-model="filterBySubjectType"
                                    float-label="Filter by model"
                                    :options="subjectTypesOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                                    ref="filterByLogNameRef"
                                    v-model="filterByLogName"
                                    float-label="Filter by action"
                                    :options="logNamesOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                                    ref="filterByUserRef"
                                    v-model="filterByUser"
                                    float-label="Filter by user"
                                    :options="usersOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                    </div>
                </div>
                <div class="row logs-table">
                    <div class="col-12" v-show="!pending">
                        <q-table
                                class="shadow-1"
                                :data="items"
                                :columns="columns"
                                row-key="name"
                                :pagination.sync="serverPagination"
                                @request="getLogList"
                        >
                            <q-td slot="body-cell-created_at" slot-scope="props" :props="props">
                                {{props.value | moment('DD.MM.YYYY, h:mm')}}
                            </q-td>
                            <q-td slot="body-cell-action" slot-scope="props" :props="props">
                                <q-btn flat icon="pageview" @click="goToViewLog(props.row)" />
                            </q-td>
                            <q-td slot="body-cell-description" slot-scope="props" :props="props">
                                {{props.value | truncate(50)}}
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
import { QSearch, QSelect, QTable, QTd } from 'quasar'
import InnerLoadingLayout from '../../layouts/InnerLoading'

import HttpHelper from '../../helpers/http'
import tableConfig from '../../config/table'

export default {
    name: 'ActivityLogsListPage',
    components: {
        QSearch,
        QSelect,
        QTable,
        InnerLoadingLayout,
        QTd
    },
    data () {
        return {
            items: [],
            subjectTypesOptions: [],
            logNamesOptions: [],
            usersOptions: [],
            serverPagination: this.getDefaultPagination(),
            errors: [],
            filterBySubjectType: '',
            filterByLogName: '',
            filterByUser: null,
            search: '',
            columns: [
                {
                    name: 'created_at',
                    label: 'Date',
                    align: 'left',
                    field: 'created_at',,
                    sortable: true
                },
                {
                    name: 'user',
                    label: 'User',
                    field: 'user',
                    align: 'left',
                    format (value, row) {
                        return value.data.name + ' ' + value.data.family
                    },
                    sort: false
                },
                {
                    name: 'logName',
                    label: 'Action',
                    field: 'log_name',
                    align: 'left',
                    sort: false
                },
                {
                    name: 'description',
                    label: 'Description',
                    field: 'description',
                    align: 'left',
                    sort: false
                },
                {
                    name: 'action',
                    label: '',
                    align: 'left',
                    field: 'action'
                }
            ]
        }
    },
    mounted () {
        this.getLogList()
    },
    computed: {
        ...mapGetters('log', [
            'activityLogsList', 'pending', 'meta'
        ])
    },
    watch: {
        filterBySubjectType: function (value) {
            this.$refs.filterBySubjectTypeRef.focused = false
            this.getLogList()
        },
        filterByLogName: function (value) {
            this.$refs.filterByLogNameRef.focused = false
            this.getLogList()
        },
        filterByUser: function (value) {
            this.$refs.filterByUserRef.focused = false
            this.getLogList()
        }
    },
    methods: {
        ...mapActions('log', [
            'list'
        ]),
        getDefaultPagination () {
            return {
                q: '',
                filters: {},
                include: 'user',
                fieldsets: {
                    '': ['description', 'user', 'created_at', 'log_name'],
                    user: ['name', 'family']
                },
                page: 1,
                rowsPerPage: tableConfig.perPage,
                rowsNumber: tableConfig.rowsNumber,
                sortBy: 'created_at',
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
        goToViewLog (log) {
            this.$router.push({
                name: 'activityLogShow',
                params: { activityLogId: log.id }
            })
        },
        clearSearchField () {
            this.search = ''
            this.getLogList()
        },
        clearFilterSubjectType () {
            this.filterBySubjectType = ''
            this.getLogList()
        },
        clearFilterLogName () {
            this.filterByLogName = ''
            this.getLogList()
        },
        clearFilterUser () {
            this.filterByUser = null
            this.getLogList()
        },
        getLogList (props) {
            let requestOptions = this.getDefaultPagination()
            if (props) {
                requestOptions = this.applyPaginationFromTable(requestOptions, props)
            }

            if (this.search) {
                requestOptions.q = this.search
            }
            if (this.filterBySubjectType && this.filterBySubjectType.length > 0) {
                requestOptions.filters.subject_type = this.filterBySubjectType
            }
            if (this.filterByLogName && this.filterByLogName.length > 0) {
                requestOptions.filters.log_name = this.filterByLogName
            }
            if (this.filterByUser && this.filterByUser > 0) {
                requestOptions.filters.causer_id = this.filterByUser
            }

            this.list(HttpHelper.getPaginationParam(requestOptions)).then(() => {
                this.items = this.activityLogsList
                this.serverPagination = requestOptions
                this.serverPagination.rowsNumber = this.meta.count
                this.subjectTypesOptions = this.meta.subject_types
                this.logNamesOptions = this.meta.log_names
                this.usersOptions = this.meta.users
            }).catch(errors => {
                this.errors = errors
            })
        }
    }
}
</script>

<style scoped>
    .logs-table {
        margin-top: 50px;
    }
</style>
