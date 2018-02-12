<template>
    <div class="wallets">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <div v-show="!pending">
            <q-card-title>
                {{ this.$router.currentRoute.meta.title }}
                <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
                <span slot="right">
                    <q-btn flat
                           @click="getWalletsList()"
                           :disable="pending"
                    >
                        <q-icon name="refresh" />
                    </q-btn>
                    <q-btn flat
                           @click="goToAddWallet()"
                           :disable="pending"
                    >
                        <q-icon name="add" />
                    </q-btn>
                </span>
            </q-card-title>
            <q-card-main>
                <div class="gutter-sm">
                    <div class="row gutter-sm">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                                    ref="filterByPaymentSystemRef"
                                    v-model="filterByPaymentSystem"
                                    float-label="Filter by payment system"
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
                </div>
                <div class="row wallet-items gutter-sm">
                    <div class="col-xs-12 col-sm-4 col-md-4" v-for="walletItem in wallets" v-bind:key="walletItem.id">
                        <q-card flat color="primary">
                            <q-card-title>
                                <div class="name">
                                    {{walletItem.paymentSystem.data.name}}
                                </div>
                                <div slot="subtitle">
                                    {{walletItem.account | truncate(25)}}
                                    <q-tooltip v-if="walletItem.account.length > 25">
                                        <nl2br tag="p" :text="walletItem.account" />
                                    </q-tooltip>
                                </div>
                                <div class="balance">
                                    <h6>{{walletItem.balance | currency(walletItem.prefix)}}</h6>
                                </div>
                            </q-card-title>
                            <q-card-main>
                            </q-card-main>
                            <q-card-separator />
                            <q-card-actions >
                                <q-btn flat :disable="pending" @click="goToEditWallet(walletItem)">Edit</q-btn>
                                <q-btn flat :disable="pending" @click="checkAccess(walletItem)">Check</q-btn>
                                <q-btn flat :disable="pending" color="red" @click="openDeleteDialog(walletItem)"><q-icon name="delete" /></q-btn>
                            </q-card-actions>
                        </q-card>
                    </div>
                </div>
            </q-card-main>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { QSearch, QSelect, QCard, QCardSeparator, QCardActions, QTooltip } from 'quasar'
import InnerLoadingLayout from '../../layouts/InnerLoading'
import Nl2br from 'vue-nl2br'

import HttpHelper from '../../helpers/http'
import ToastConfig from '../../config/toast'

export default {
    name: 'WalletsListPage',
    components: {
        QSearch,
        QSelect,
        QCard,
        QCardSeparator,
        QCardActions,
        InnerLoadingLayout,
        QTooltip,
        Nl2br
    },
    data () {
        return {
            loading: true,
            pagination: this.getDefaultPagination(),
            errors: [],

            filterByPaymentSystem: '',
            filterByCurrency: '',

            loader: null
        }
    },
    mounted () {
        this.getWalletsList()
    },
    computed: {
        ...mapGetters('wallet', [
            'checkPending', 'wallets', 'pending', 'meta'
        ])
    },
    watch: {
        filterByPaymentSystem: function (value) {
            this.$refs.filterByPaymentSystemRef.focused = false
            this.getWalletsList()
        },
        filterByCurrency: function (value) {
            this.$refs.filterByCurrencyRef.focused = false
            this.getWalletsList()
        }
    },
    methods: {
        ...mapActions('wallet', [
            'remove', 'check', 'list'
        ]),
        getDefaultPagination () {
            return {
                q: '',
                filters: {},
                include: 'paymentSystem'
            }
        },
        clearFilterCurrency () {
            this.filterByCurrency = ''
            this.getDefaultPagination()
            this.getWalletsList()
        },
        clearFilterPaymentSystem () {
            this.filterByPaymentSystem = ''
            this.getDefaultPagination()
            this.getWalletsList()
        },
        goToAddWallet () {
            this.$router.push({
                name: 'walletAdd'
            })
        },
        goToEditWallet (walletItem) {
            this.$router.push({
                name: 'walletEdit',
                params: { walletId: walletItem.id }
            })
        },
        checkAccess (wallet) {
            this.check(wallet).then(response => {
                this.wallet.balance = response.data.balance
                this.$q.notify({
                    message: 'Status: OK.',
                    color: ToastConfig.positive.bgColor,
                    timeout: ToastConfig.positive.timeout,
                    position: ToastConfig.position
                })
            }).catch(errors => {
                this.$q.notify({
                    message: errors.message,
                    color: ToastConfig.negative.bgColor,
                    timeout: ToastConfig.negative.timeout,
                    position: ToastConfig.position
                })
                this.errors = errors
            })
        },
        openDeleteDialog (wallet) {
            this.$q.dialog({
                title: 'Delete',
                message: 'Are you sure that you want to delete the wallet ' + (wallet.account.length > 25 ? wallet.account.substring(0, 25) + '...' : wallet.account) + '?',
                cancel: true,
                preventClose: true,
                color: 'secondary'
            }).then(data => {
                this.deleteWallet(wallet)
            }).catch(() => {
                console.log('>>>> Cancel')
            })
        },
        getWalletsList () {
            let pagination = this.getDefaultPagination()

            if (this.filterByPaymentSystem && this.filterByPaymentSystem > 0) {
                pagination.filters.payment_system_id = this.filterByPaymentSystem
            }
            if (this.filterByCurrency && this.filterByCurrency.length > 0) {
                pagination.filters.currency = this.filterByCurrency
            }

            this.list(HttpHelper.getPaginationParam(pagination))
        },
        deleteWallet (wallet) {
            this.remove(wallet.id).then(response => {
                this.getWalletsList()
            }).catch(errors => {
                this.errors = errors
            })
        }
    }
}
</script>

<style scoped>
    .wallet-items {
        margin-top: 50px;
    }
    .wallet-item-details {
        padding: 10px;
    }
</style>
