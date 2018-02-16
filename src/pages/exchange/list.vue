<template>
    <div class="logs">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <div v-show="!pending">
            <q-card-title>
                {{ this.$router.currentRoute.meta.title }}
                <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
                <span slot="right">
                    <q-btn flat
                           @click="downloadPdf()"
                           :disable="pending"
                           v-show="this.filterByUser"
                    >
                        <q-icon name="picture_as_pdf" />
                    </q-btn>
                    <q-btn flat
                           @click="getExchangesList()"
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
                            <q-search v-on:keyup.enter="getExchangesList()"
                                      v-model="search"
                                      :disable="pending"
                                      placeholder="Search by exchange ID"
                                      suffix="Press enter to start search"
                            />
                        </div>
                    </div>
                    <div class="row gutter-sm">
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                                    ref="filterByUserRef"
                                    v-model="filterByUser"
                                    float-label="Filter by user"
                                    :options="userOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                                    ref="filterByInCurrencyRef"
                                    v-model="filterByInCurrency"
                                    float-label="Filter by income currency"
                                    :options="inCurrencyOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                                    ref="filterByOutCurrencyRef"
                                    v-model="filterByOutCurrency"
                                    float-label="Filter by withdrawal currency"
                                    :options="outCurrencyOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                    </div>
                    <div class="row gutter-sm">
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                                    ref="filterByInPaymentSystemRef"
                                    v-model="filterByInPaymentSystem"
                                    float-label="Filter by income payment system"
                                    :options="inPaymentSystemOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                                    ref="filterByOutPaymentSystemRef"
                                    v-model="filterByOutPaymentSystem"
                                    float-label="Filter by withdrawal payment system"
                                    :options="outPaymentSystemOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                                    ref="filterByExchangeStatusRef"
                                    v-model="filterByExchangeStatus"
                                    float-label="Filter by status"
                                    :options="exchangeStatusOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                    </div>
                </div>
                <div class="row exchanges-table gutter-sm">
                    <div class="col-12" v-show="!pending">
                        <q-table
                                class="shadow-1"
                                :data="items"
                                :columns="columns"
                                row-key="name"
                                :pagination.sync="serverPagination"
                                @request="getExchangesList"
                        >
                            <template slot="body" slot-scope="props">
                                <q-tr :props="props" :class="{'red-4': props.row.in_id_pay === 0, 'red-2': props.row.in_id_pay !== 0 && props.row.out_id_pay === 0, 'green-5': props.row.in_id_pay !== 0 && props.row.out_id_pay !== 0}">
                                    <q-td>
                                        {{ props.row.id }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.in_id_pay }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.date | moment('DD.MM.YYYY, h:mm') }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.in_currency_amount }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.in_fee }}
                                    </q-td>
                                    <q-td style="border-right: 3px solid black;">
                                        {{ props.row.in_payee }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.out_id_pay }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.out_date | moment('DD.MM.YYYY, h:mm') }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.out_currency_amount }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.out_fee }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.out_payee }}
                                    </q-td>
                                </q-tr>
                            </template>
                        </q-table>
                    </div>
                </div>
            </q-card-main>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { QSearch, QSelect, QTable, QTd, QTr } from 'quasar'
import InnerLoadingLayout from '../../layouts/InnerLoading'

import HttpHelper from '../../helpers/http'
import tableConfig from '../../config/table'
import axios from 'axios'

export default {
    name: 'ActivityLogsListPage',
    components: {
        QSearch,
        QSelect,
        QTable,
        QTr,
        InnerLoadingLayout,
        QTd
    },
    data () {
        return {
            items: [],
            inPaymentSystemOptions: [],
            outPaymentSystemOptions: [],
            inCurrencyOptions: [],
            outCurrencyOptions: [],
            userOptions: [],
            exchangeStatusOptions: [],
            serverPagination: this.getDefaultPagination(),
            errors: [],
            search: '',
            filterByUser: this.$route.params.userId ? parseInt(this.$route.params.userId) : '',
            filterByInPaymentSystem: '',
            filterByOutPaymentSystem: '',
            filterByInCurrency: '',
            filterByOutCurrency: '',
            filterByExchangeStatus: '',
            columns: [
                {
                    name: 'id',
                    label: 'ID',
                    align: 'left',
                    field: 'id',
                    sortable: true
                },
                {
                    name: 'in_id_pay',
                    label: 'In ID',
                    align: 'left',
                    field: 'in_id_pay',
                    sortable: true
                },
                {
                    name: 'date',
                    label: 'In Date',
                    align: 'left',
                    field: 'date',
                    sortable: true
                },
                {
                    name: 'in_currency_amount',
                    label: 'In',
                    field: 'in_currency_amount',
                    align: 'left',
                    sort: false
                },
                {
                    name: 'in_fee',
                    label: 'In Fee',
                    field: 'in_fee',
                    align: 'left',
                    sort: false
                },
                {
                    name: 'in_payee',
                    label: 'In Payee',
                    field: 'in_payee',
                    align: 'left',
                    sort: false
                },
                // {
                //     name: 'comment',
                //     label: 'Comment',
                //     field: 'comment',
                //     align: 'left',
                //     sort: false
                // },
                {
                    name: 'out_id_pay',
                    label: 'Out ID',
                    align: 'left',
                    field: 'out_id_pay',
                    sortable: true
                },
                {
                    name: 'out_date',
                    label: 'Out Date',
                    align: 'left',
                    field: 'out_date',
                    sortable: true
                },
                {
                    name: 'out_currency_amount',
                    label: 'Out',
                    field: 'out_currency_amount',
                    align: 'left',
                    sort: false
                },
                {
                    name: 'out_fee',
                    label: 'Out Fee',
                    field: 'out_fee',
                    align: 'left',
                    sort: false
                },
                {
                    name: 'out_payee',
                    label: 'Out Payee',
                    field: 'out_payee',
                    align: 'left',
                    sort: false
                }
            ]
        }
    },
    mounted () {
        this.getExchangesList()
    },
    computed: {
        ...mapGetters('exchange', [
            'exchangesList', 'pending', 'meta'
        ])
    },
    watch: {
        filterByExchangeStatus: function (value) {
            this.$refs.filterByExchangeStatusRef.focused = false
            this.getExchangesList()
        },
        filterByUser: function (value) {
            this.$refs.filterByUserRef.focused = false
            this.getExchangesList()
        },
        filterByInPaymentSystem: function (value) {
            this.$refs.filterByInPaymentSystemRef.focused = false
            this.getExchangesList()
        },
        filterByOutPaymentSystem: function (value) {
            this.$refs.filterByOutPaymentSystemRef.focused = false
            this.getExchangesList()
        },
        filterByInCurrency: function (value) {
            this.$refs.filterByInCurrencyRef.focused = false
            this.getExchangesList()
        },
        filterByOutCurrency: function (value) {
            this.$refs.filterByOutCurrencyRef.focused = false
            this.getExchangesList()
        }
    },
    methods: {
        ...mapActions('exchange', [
            'list', 'getPdf'
        ]),
        downloadPdf () {
            axios({
                method: 'get',
                url: '/payments/pdf/transactions/' + this.filterByUser,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                responseType: 'arraybuffer'
            }).then(response => {
                let blob = new Blob([response.data], {type: 'application/pdf'})
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'transactions_of_user_id_' + this.filterByUser + '.pdf'
                link.click()
            }).catch(errors => {
                this.errors = errors
            })
        },
        getDefaultPagination () {
            return {
                q: '',
                filters: {},
                include: 'inPayment,outPayment',
                fieldsets: {},
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
        clearSearchField () {
            this.search = ''
            this.getExchangesList()
        },
        getExchangesList (props) {
            let requestOptions = this.getDefaultPagination()
            if (props) {
                requestOptions = this.applyPaginationFromTable(requestOptions, props)
            }

            if (this.search) {
                requestOptions.q = this.search
            }
            if (this.filterByExchangeStatus && this.filterByExchangeStatus.length > 0) {
                requestOptions.filters.exchange_status = this.filterByExchangeStatus
            }
            if (this.filterByInCurrency && this.filterByInCurrency.length > 0) {
                requestOptions.filters.in_currency = this.filterByInCurrency
            }
            if (this.filterByOutCurrency && this.filterByOutCurrency.length > 0) {
                requestOptions.filters.out_currency = this.filterByOutCurrency
            }
            if (this.filterByInPaymentSystem && this.filterByInPaymentSystem.length > 0) {
                requestOptions.filters.in_payment = this.filterByInPaymentSystem
            }
            if (this.filterByOutPaymentSystem && this.filterByOutPaymentSystem.length > 0) {
                requestOptions.filters.out_payment = this.filterByOutPaymentSystem
            }
            if (this.filterByUser && this.filterByUser > 0) {
                requestOptions.filters.id_user = this.filterByUser
            }

            this.list(HttpHelper.getPaginationParam(requestOptions)).then(() => {
                this.items = this.exchangesList
                this.serverPagination = requestOptions
                this.serverPagination.rowsNumber = this.meta.count
                this.userOptions = this.meta.users
                this.inPaymentSystemOptions = this.meta.payment_systems
                this.outPaymentSystemOptions = this.meta.payment_systems
                this.inCurrencyOptions = this.meta.currencies
                this.outCurrencyOptions = this.meta.currencies
                this.exchangeStatusOptions = this.meta.statuses
            }).catch(errors => {
                this.errors = errors
            })
        }
    }
}
</script>

<style scoped>
    .exchanges-table {
        margin-top: 50px;
    }
    .red-2 {
        background-color: #ffcdd2;
    }
    .red-4 {
        background-color: #ef9a9a;
    }
    .green-5 {
        background-color: #80cbc4;
    }
</style>
