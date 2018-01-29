<template>
    <div class="logs">
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
            <div class="row sm-gutter">
                <div class="col-12">
                    <q-search v-on:keyup.enter="getLogList()"
                              v-model="search"
                              :disable="pending"
                              placeholder="Search by description"
                              suffix="Press enter to start search"
                    />
                </div>
            </div>
            <div class="row sm-gutter">
                <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                            ref="filterBySubjectTypeRef"
                            v-model="filterBySubjectType"
                            float-label="Filter by model"
                            :options="meta.subject_types"
                            :disable="pending"
                            :clearable="true"
                    />
                </div>
                <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                            ref="filterByLogNameRef"
                            v-model="filterByLogName"
                            float-label="Filter by action"
                            :options="meta.log_names"
                            :disable="pending"
                            :clearable="true"
                    />
                </div>
                <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                            ref="filterByUserRef"
                            v-model="filterByUser"
                            float-label="Filter by user"
                            :options="meta.users"
                            :disable="pending"
                            :clearable="true"
                    />
                </div>
            </div>
            <div class="row logs-table">
                <div class="col-12">
                    <q-data-table
                            :data="items"
                            :config="tableConfig"
                            :columns="headers"
                    >
                        <!-- Custom renderer for "action" column with button for custom action -->
                        <template slot="col-action" scope="cell">
                            <q-btn flat @click="goToViewLog(cell.row)">
                                <q-icon name="pageview" />
                            </q-btn>
                        </template>
                    </q-data-table>
                </div>
            </div>
        </q-card-main>
    </div>
</template>

<script>
    import {
        QCardTitle,
        QCardMain,
        QBtn,
        QIcon,
        QSelect,
        QSearch,
        QDataTable
    } from 'quasar'

    import { mapGetters, mapActions } from 'vuex'

    import HttpHelper from '../../helpers/http'
    import dataTableConfig from '../../config/dataTable'

    export default {
        components: {
            QCardTitle,
            QCardMain,
            QBtn,
            QIcon,
            QSelect,
            QSearch,
            QDataTable
        },
        data () {
            return {
                loading: true,

                commission: {},

                totalItems: 0,
                items: [],

                pagination: {
                    orderBy: 'created_at',
                    descending: true
                },

                errors: [],

                filterBySubjectType: '',
                filterByLogName: '',
                filterByUser: null,
                search: '',

                headers: [
                    {
                        label: 'Date',
                        field: 'created_at',
                        format (value, row) {
                            return value.date
                        },
                        sort (a, b) {
                            return (new Date(a)) - (new Date(b))
                        }
                    },
                    {
                        label: 'User',
                        field: 'user',
                        format (value, row) {
                            return value.data.name + ' ' + value.data.family
                        },
                        sort: false
                    },
                    {
                        label: 'Action',
                        field: 'log_name',
                        sort: false
                    },
                    {
                        label: 'Description',
                        field: 'description',
                        sort: false
                    },
                    {
                        label: '',
                        field: 'action'
                    }
                ],
                tableConfig: dataTableConfig,

                loader: null
            }
        },
        mounted () {
            this.getLogList()
        },
        computed: {
            ...mapGetters('ActivityLog', [
                'activityLogsList', 'pending', 'meta'
            ])
        },
        watch: {
            pagination: {
                handler: function (val, oldVal) {
                    if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
                        this.getLogList()
                    }
                },
                deep: true
            },
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
            ...mapActions('ActivityLog', [
                'list'
            ]),
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
            getLogList () {
                let pagination = this.pagination

                pagination.filters = {}
                pagination.include = 'user'
                pagination.fieldsets = {
                    '': ['description', 'user', 'created_at', 'log_name'],
                    user: ['name', 'family']
                }

                pagination.q = ''
                if (this.search) {
                    pagination.q = this.search
                }
                if (this.filterBySubjectType && this.filterBySubjectType.length > 0) {
                    pagination.filters.subject_type = this.filterBySubjectType
                }
                if (this.filterByLogName && this.filterByLogName.length > 0) {
                    pagination.filters.log_name = this.filterByLogName
                }
                if (this.filterByUser && this.filterByUser > 0) {
                    pagination.filters.causer_id = this.filterByUser
                }

                this.list(HttpHelper.getPaginationParam(pagination)).then(() => {
                    this.items = this.activityLogsList
                    this.totalItems = this.meta.count
                })
            }
        }
    }
</script>

<style>
    .logs-table {
        margin-top: 50px;
    }
</style>