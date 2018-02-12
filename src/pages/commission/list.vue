<template>
    <div class="commissions">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <div v-show="!pending">
            <q-card-title>
                {{ this.$router.currentRoute.meta.title }}
                <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
                <span slot="right">
                    <q-btn flat
                           @click="getCommissionsList()"
                           :disable="pending"
                    >
                        <q-icon name="refresh" />
                    </q-btn>
                    <q-btn flat
                           @click="goToAddCommission()"
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
                            <q-search v-on:keyup.enter="getCommissionsList()"
                                      v-model="search"
                                      :disable="pending"
                                      placeholder="Search by 'from' wallet"
                                      suffix="Press enter to start search"
                            />
                        </div>
                    </div>
                    <div class="row gutter-sm">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                                    ref="filterByPaymentSystemRef"
                                    v-model="filterByPaymentSystem"
                                    float-label="Filter by 'to' payment system"
                                    :options="paymentSystemsOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                                    ref="filterByCurrencyRef"
                                    v-model="filterByCurrency"
                                    float-label="Filter by currency"
                                    :options="currenciesOptions"
                                    :disable="pending"
                                    :clearable="true"
                            />
                        </div>
                    </div>
                </div>
                <div class="row commissions-table">
                    <div class="col-12">
                        <q-table
                                class="shadow-1"
                                :data="items"
                                :columns="columns"
                                row-key="name"
                                :pagination.sync="serverPagination"
                                @request="getCommissionsList"
                        >
                            <q-td slot="body-cell-action" slot-scope="props" :props="props">
                                <q-btn flat icon="edit" @click="goToEditCommission(props.row)" />
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
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    QCardTitle,
    QCardMain,
    QBtn,
    QIcon,
    QField,
    QSelect,
    QCard,
    QCardSeparator,
    QCardActions,
    QTooltip,
    Dialog,
    QSearch,
    QTable,
    QTd
} from 'quasar'
import InnerLoadingLayout from '../../layouts/InnerLoading'
import tableConfig from '../../config/table'
import HttpHelper from '../../helpers/http'

export default {
    name: 'CommissionsListPage',
    components: {
        QCardTitle,
        QCardMain,
        QBtn,
        QIcon,
        QField,
        QSelect,
        QCard,
        QCardSeparator,
        QCardActions,
        QTooltip,
        Dialog,
        QSearch,
        QTable,
        QTd,
        InnerLoadingLayout
    },
    data () {
        return {
            items: [],
            serverPagination: this.getDefaultPagination(),
            errors: [],
            filterByPaymentSystem: '',
            filterByCurrency: '',
            paymentSystemsOptions: [],
            currenciesOptions: [],
            search: '',
            loader: null,
            columns: [
                {
                    name: 'commission',
                    label: 'Commission (%)',
                    field: 'commission'
                },
                {
                    name: 'wallet',
                    label: 'From',
                    field: 'wallet',
                    format (value, row) {
                        return value.data.paymentSystem.data.name + ', ' + value.data.prefix + ' ' + (value.data.account.length > 25 ? value.data.account.substring(0, 25) + '...' : value.data.account)
                    }
                },
                {
                    name: 'paymentSystem',
                    label: 'To',
                    field: 'paymentSystem',
                    format (value, row) {
                        return value.data.name
                    }
                },
                {
                    name: 'prefix',
                    label: 'Currency',
                    field: 'prefix'
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
        this.getCommissionsList()
    },
    computed: {
        ...mapGetters('commission', [
            'commissions', 'pending', 'meta'
        ])
    },
    watch: {
        filterByPaymentSystem: function (value) {
            this.$refs.filterByPaymentSystemRef.focused = false
            this.getCommissionsList()
        },
        filterByCurrency: function (value) {
            this.$refs.filterByCurrencyRef.focused = false
            this.getCommissionsList()
        },
        search: function (val) {
            if (val === '') {
                this.getCommissionsList()
            }
        }
    },
    methods: {
        ...mapActions('commission', [
            'list', 'remove'
        ]),
        getDefaultPagination () {
            return {
                q: '',
                filters: {},
                include: 'paymentSystem,wallet,wallet.paymentSystem',
                page: 1,
                rowsPerPage: tableConfig.perPage,
                rowsNumber: tableConfig.rowsNumber
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
        goToAddCommission () {
            this.$router.push({
                name: 'commissionAdd'
            })
        },
        goToEditCommission (commissionItem) {
            this.$router.push({
                name: 'commissionEdit',
                params: { commissionId: commissionItem.id }
            })
        },
        clearSearchField () {
            this.search = ''
            this.getCommissionsList()
        },
        clearFilterCurrency () {
            this.filterByCurrency = ''
            this.getDefaultPagination()
            this.getCommissionsList()
        },
        clearFilterPaymentSystem () {
            this.filterByPaymentSystem = ''
            this.getDefaultPagination()
            this.getCommissionsList()
        },
        openDeleteDialog (commission) {
            this.$q.dialog({
                title: 'Delete',
                message: 'Are you sure that you want to delete the commission ' + commission.commission + '%, from ' + commission.wallet.data.paymentSystem.data.name + ', ' + commission.wallet.data.prefix + ' ' + (commission.wallet.data.account.length > 25 ? commission.wallet.data.account.substring(0, 25) + '...' : commission.wallet.data.account) + ' to ' + commission.paymentSystem.data.name + ', ' + commission.prefix + '?',
                cancel: true,
                preventClose: true,
                color: 'secondary'
            }).then(data => {
                this.deleteCommission(commission)
            }).catch(() => {
                console.log('>>>> Cancel')
            })
        },
        getCommissionsList (props) {
            let requestOptions = this.getDefaultPagination()
            if (props) {
                requestOptions = this.applyPaginationFromTable(requestOptions, props)
            }

            if (this.filterByPaymentSystem && this.filterByPaymentSystem > 0) {
                requestOptions.filters.payment_system_id = this.filterByPaymentSystem
            }
            if (this.filterByCurrency && this.filterByCurrency.length > 0) {
                requestOptions.filters.currency = this.filterByCurrency
            }
            if (this.search.length > 0) {
                requestOptions.q = this.search
            }

            this.list(HttpHelper.getPaginationParam(requestOptions)).then(() => {
                this.items = this.commissions
                this.serverPagination = requestOptions
                this.serverPagination.rowsNumber = this.meta.count
                this.paymentSystemsOptions = this.meta.payment_systems
                this.currenciesOptions = this.meta.currencies
            })
        },
        deleteCommission (commission) {
            this.remove(commission.id).then(response => {
                this.getCommissionsList()
            }).catch(errors => {
                this.errors = errors
            })
        }
    }
}
</script>

<style scoped>
    .commissions-table {
        margin-top: 50px;
    }
</style>
