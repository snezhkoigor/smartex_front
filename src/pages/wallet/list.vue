<template>
    <div class="wallets">
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
            <div class="row sm-gutter">
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
            <div class="row wallet-items">
                <div class="col-xs-12 col-sm-6 col-md-6" v-for="walletItem in wallets" :key="walletItem.id">
                    <q-card flat color="primary">
                        <q-card-title>
                            {{walletItem.paymentSystem.data.name}}
                            <span slot="subtitle">
                                {{walletItem.account | truncate(25)}}
                                <q-tooltip v-if="walletItem.account.length > 25">
                                    <template v-for="line in walletItem.account.split('\n')">{{line}}<br></template>
                                </q-tooltip>
                            </span>
                        </q-card-title>
                        <q-card-main>
                            <div class="row">
                                <div class="wallet-item-details col-xs-12 col-sm-6 col-md-6">
                                    <div>In</div>
                                    <div><h5>{{walletItem.balance | currency(walletItem.prefix)}}</h5></div>
                                </div>
                                <div class="wallet-item-details col-xs-12 col-sm-6 col-md-6">
                                    <div>Out</div>
                                    <div><h5>{{walletItem.balance | currency(walletItem.prefix)}}</h5></div>
                                </div>
                                <div class="wallet-item-details col-xs-12 col-sm-6 col-md-6">
                                    <div>Commissions</div>
                                    <div><h5>{{walletItem.balance | currency(walletItem.prefix)}}</h5></div>
                                </div>
                                <div class="wallet-item-details col-xs-12 col-sm-6 col-md-6">
                                    <div>Balance</div>
                                    <div><h5>{{walletItem.balance | currency(walletItem.prefix)}}</h5></div>
                                </div>
                            </div>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppConfig from '../../config/app'
import HttpHelper from '../../helpers/http'

export default {
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
        ...mapGetters('Wallet', [
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
        ...mapActions('Wallet', [
            'remove', 'check', 'list'
        ]),
        isPending () {
            return this.pending || this.checkPending
        },
        clearFilterCurrency () {
            this.filterByCurrency = ''
            this.setDefaultPagination()
            this.getWalletsList()
        },
        clearFilterPaymentSystem () {
            this.filterByPaymentSystem = ''
            this.setDefaultPagination()
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
                // Toast.create({
                //     html: 'Status: OK.',
                //     timeout: AppConfig.toast.positive.timeout,
                //     bgColor: AppConfig.toast.positive.bgColor
                // })
            }).catch(errors => {
                // Toast.create({
                //     html: errors.message,
                //     timeout: AppConfig.toast.negative.timeout,
                //     bgColor: AppConfig.toast.negative.bgColor
                // })
                this.errors = errors
            })
        },
        openDeleteDialog (wallet) {
            // let self = this
            // let deleteWallet = wallet
            //
            // Dialog.create({
            //     title: 'Delete',
            //     message: 'Are you sure that you want to delete the wallet ' + (wallet.account.length > 25 ? wallet.account.substring(0, 25) + '...' : wallet.account) + '?',
            //     buttons: [
            //         {
            //             label: 'Disagree',
            //             handler () {}
            //         },
            //         {
            //             label: 'Agree',
            //             handler () {
            //                 self.deleteWallet(deleteWallet)
            //             }
            //         }
            //     ]
            // })
        },
        setDefaultPagination () {
            this.pagination = this.getDefaultPagination()
        },
        getDefaultPagination () {
            return {
                q: '',
                filters: {},
                include: 'paymentSystem'
            }
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

<style>
    .wallet-items {
        margin-top: 50px;
    }
    .wallet-item-details {
        padding: 10px;
    }
</style>
