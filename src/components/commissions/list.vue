<template>
    <div class="commissions">
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
            <div class="row sm-gutter">
                <div class="col-12">
                    <q-search v-on:keyup.enter="getCommissionsList()"
                              v-model="search"
                              :disable="pending"
                              placeholder="Search by 'from' wallet"
                              suffix="Press enter to start search"
                    />
                </div>
            </div>
            <div class="row sm-gutter">
                <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                            ref="filterByPaymentSystemRef"
                            v-model="filterByPaymentSystem"
                            float-label="Filter by 'to' payment system"
                            :options="meta.payment_systems"
                            :disable="pending"
                            :clearable="true"
                    />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                            ref="filterByCurrencyRef"
                            v-model="filterByCurrency"
                            float-label="Filter by currency"
                            :options="meta.currencies"
                            :disable="pending"
                            :clearable="true"
                    />
                </div>
            </div>
            <div class="row commissions-table">
                <div class="col-12">
                    <q-data-table
                            :data="items"
                            :config="{}"
                            :columns="headers"
                    >
                        <!-- Custom renderer for "source" column -->
                        <template slot="col-source" scope="cell">
                            {{cell.data}}
                        </template>
                        <!-- Custom renderer for "action" column with button for custom action -->
                        <template slot="col-action" scope="cell">
                            <q-btn flat @click="goToEditCommission(cell.row)">
                                <q-icon name="edit" />
                            </q-btn>
                            <q-btn flat @click="openDeleteDialog(cell.row)">
                                <q-icon name="delete_forever" />
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
        QField,
        QSelect,
        QCard,
        QCardSeparator,
        QCardActions,
        QTooltip,
        Toast,
        Dialog,
        QSearch,
        QDataTable
    } from 'quasar'

    import { mapGetters, mapActions } from 'vuex'

    import AppConfig from '../../config/app'
    import HttpHelper from '../../helpers/http'

    export default {
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
            Toast,
            Dialog,
            QSearch,
            QDataTable
        },
        data () {
            return {
                loading: true,
                totalItems: 0,
                items: [],
                pagination: this.getDefaultPagination(),

                errors: [],

                filterByPaymentSystem: '',
                filterByCurrency: '',
                search: '',

                perPage: AppConfig.perPage,

                loader: null,

                headers: [
                    {
                        label: 'Commission (%)',
                        field: 'commission'
                    },
                    {
                        label: 'From',
                        field: 'wallet',
                        format (value, row) {
                            return '<b>' + value.data.paymentSystem.data.name + ', ' + value.data.prefix + '</b>' + ' ' + (value.data.account.length > 25 ? value.data.account.substring(0, 25) + '...' : value.data.account)
                        }
                    },
                    {
                        label: 'To',
                        field: 'paymentSystem'
                    },
                    {
                        label: 'Currency',
                        field: 'prefix'
                    },
                    {
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
            ...mapGetters('Commission', [
                'commissions', 'pending', 'meta'
            ])
        },
        watch: {
            pagination: {
                handler: function (val, oldVal) {
                    if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
                        this.getCommissionsList()
                    }
                },
                deep: true
            },
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
            ...mapActions('Commission', [
                'list', 'delete'
            ]),
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
                this.setDefaultPagination()
                this.getCommissionsList()
            },
            clearFilterPaymentSystem () {
                this.filterByPaymentSystem = ''
                this.setDefaultPagination()
                this.getCommissionsList()
            },
            openDeleteDialog (commission) {
                let self = this
                let deleteCommission = commission

                Dialog.create({
                    title: 'Delete',
                    message: 'Are you sure that you want to delete the commission <br/><br/>' + commission.commission + '%, from ' + '<b>' + commission.wallet.data.paymentSystem.data.name + ', ' + commission.wallet.data.prefix + '</b>' + ' ' + (commission.wallet.data.account.length > 25 ? commission.wallet.data.account.substring(0, 25) + '...' : commission.wallet.data.account) + ' to <b>' + commission.paymentSystem.data.name + ', ' + commission.prefix + '</b>?',
                    buttons: [
                        {
                            label: 'Disagree',
                            handler () {}
                        },
                        {
                            label: 'Agree',
                            handler () {
                                self.deleteCommission(deleteCommission)
                            }
                        }
                    ]
                })
            },
            setDefaultPagination () {
                this.pagination = this.getDefaultPagination()
            },
            getDefaultPagination () {
                return {
                    q: '',
                    filters: {},
                    include: 'paymentSystem,wallet,wallet.paymentSystem'
                }
            },
            getCommissionsList () {
                let pagination = this.getDefaultPagination()

                if (this.filterByPaymentSystem && this.filterByPaymentSystem > 0) {
                    pagination.filters.payment_system_id = this.filterByPaymentSystem
                }
                if (this.filterByCurrency && this.filterByCurrency.length > 0) {
                    pagination.filters.currency = this.filterByCurrency
                }
                if (this.search.length > 0) {
                    pagination.q = this.search
                }

                this.list(HttpHelper.getPaginationParam(pagination)).then(() => {
                    this.items = this.commissions
                    this.totalItems = this.meta.count
                })
            },
            deleteCommission (commission) {
                this.delete(commission).then(response => {
                    this.getCommissionsList()
                }).catch(errors => {
                    this.errors = errors
                })
            }
        }
    }
</script>

<style>
    .commissions-table {
        margin-top: 50px;
    }
</style>