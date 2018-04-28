<template>
    <div class="logs">
        <inner-loading-layout :pending="pending || paymentPending"></inner-loading-layout>
        <div v-show="!pending && !paymentPending">
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
                    <div class="row gutter-sm">
                        <div class="col-xs-12 col-sm-4 col-md-4">
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-checkbox v-model="filterByNeedModeration" label="Exchanges with new comments?" />
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
                                <q-tr :props="props">
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
                                        {{ props.row.in_payment }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.in_currency_amount }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.in_fee }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.in_payee }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.clear_comment | truncate(20) }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.clear_rating }}
                                    </q-td>
                                    <q-td style="border-right: 3px solid black;">
                                        <q-btn v-show="props.row.in_id_pay" flat icon="pageview" @click="goToViewInPayment(props.row)" />
                                        <q-btn v-if="props.row.is_moderated === false && props.row.clear_comment !== ''" flat icon="verified_user" @click="moderateComment(props.row)" />
                                    </q-td>
                                    <q-td>
                                        {{ props.row.out_id_pay }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.out_date | moment('DD.MM.YYYY, h:mm') }}
                                    </q-td>
                                    <q-td>
                                        {{ props.row.out_payment }}
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
                                    <q-td>
                                        <q-btn v-show="props.row.out_id_pay" flat icon="pageview" @click="goToViewOutPayment(props.row)" />
                                    </q-td>
                                </q-tr>
                            </template>
                        </q-table>
                    </div>
                </div>
            </q-card-main>
        </div>

        <q-dialog
            v-model="showPreviewDialog"
            ref="dialog"
            stack-buttons
            @cancel="onCancelPreviewDialog"
            @hide="onCancelPreviewDialog"
        >
            <!-- This or use "title" prop on <q-dialog> -->
            <span slot="title">Payment details</span>

            <!-- This or use "message" prop on <q-dialog> -->
            <span slot="message">Don't confirm this payment if don't have money in purse</span>

            <div slot="body">
                <p v-if="payment.date">
                    Date: {{ payment.date.date | moment('DD.MM.YYYY, h:mm') }}
                </p>
                <p v-if="payment.confirm">
                    Date confirm: {{ payment.date_confirm.date | moment('DD.MM.YYYY, h:mm') }}
                </p>
                <p v-if="payment.confirm === 0">
                    Date confirm: ---
                </p>
                <p v-if="payment.user">
                    User: {{ payment.user.data.name }} {{ payment.user.data.family }}
                </p>
                <p v-if="payment.paymentSystem">
                    Payment System: {{ payment.paymentSystem.data.name }}
                </p>
                <p>
                    Amount: {{ payment.prefix }}{{ payment.amount }}
                </p>
                <p>
                    Fee: {{ payment.fee ? payment.fee : '---' }}
                </p>
                <p>
                    Payer: {{ payment.payer ? payment.payer : '---' }}
                </p>
                <p>
                    Payee: {{ payment.payee ? payment.payee : '---' }}
                </p>
                <p>
                    Comment: {{ payment.comment ? payment.comment : '---' }}
                </p>
            </div>
            <template slot="buttons" slot-scope="props">
                <div class="verify-dialog-btn">
                    <span>
                        <q-btn flat label="Close" @click="onCancelPreviewDialog" />
                    </span>
                    <span v-show="payment.confirm === 0">
                        <q-btn color="secondary" @click="confirmPayment">
                            <span v-if="!paymentPending">Confirm</span>
                            <span v-if="paymentPending">Loading ...</span>
                        </q-btn>
                    </span>
                </div>
            </template>
        </q-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { QSearch, QSelect, QTable, QTd, QTr, QDialog, QCheckbox } from 'quasar'
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
        QTd,
        QDialog,
        QCheckbox
    },
    data () {
        return {
            showPreviewDialog: false,
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
            filterByNeedModeration: false,
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
                    name: 'in_payment',
                    label: 'In Payment',
                    field: 'in_payment',
                    align: 'left',
                    sort: false
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
                {
                    name: 'clear_comment',
                    label: 'Comment',
                    field: 'clear_comment',
                    align: 'left',
                    sort: false
                },
                {
                    name: 'clear_rating',
                    label: 'Rating',
                    field: 'clear_rating',
                    align: 'left',
                    sort: false
                },
                {
                    name: 'action_in',
                    label: '',
                    field: 'action_in'
                },
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
                    name: 'out_payment',
                    label: 'Out Payment',
                    field: 'out_payment',
                    align: 'left',
                    sort: false
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
                },
                {
                    name: 'action_out',
                    label: '',
                    field: 'action_out'
                }
            ]
        }
    },
    mounted () {
        this.getExchangesList()
    },
    computed: {
        ...mapGetters({
            'exchangesList': 'exchange/exchangesList',
            'pending': 'exchange/pending',
            'meta': 'exchange/meta',
            'payment': 'payment/payment',
            'paymentPending': 'payment/pending'
        })
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
        },
        filterByNeedModeration: function (value) {
            this.$refs.filterByOutCurrencyRef.focused = false
            this.getExchangesList()
        }
    },
    methods: {
        ...mapActions({
            'list': 'exchange/list',
            'getPdf': 'exchange/getPdf',
            'confirm': 'payment/confirm',
            'getById': 'payment/getById',
            'resetPayment': 'payment/resetPayment',
            'commentModeration': 'exchange/commentModeration'
        }),
        moderateComment (exchange) {
            this.commentModeration(exchange).then(() => {
                this.getExchangesList()
            }).catch(errors => {
                this.errors = errors
            })
        },
        confirmPayment () {
            this.confirm(this.payment.id).then(() => {
                this.showPreviewDialog = false
                this.resetPayment()
                this.getExchangesList()
            }).catch(errors => {
                this.errors = errors
                this.resetPayment()
            })
        },
        onCancelPreviewDialog () {
            this.showPreviewDialog = false
            this.resetPayment()
        },
        goToViewInPayment (exchange) {
            this.getById(exchange.in_id_pay).then(() => {
                this.showPreviewDialog = true
            }).catch(errors => {
                this.errors = errors
                this.resetPayment()
            })
        },
        goToViewOutPayment (exchange) {
            this.getById(exchange.out_id_pay).then(() => {
                this.showPreviewDialog = true
            }).catch(errors => {
                this.errors = errors
                this.resetPayment()
            })
        },
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
            if (this.filterByNeedModeration) {
                requestOptions.filters.need_moderate = true
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
