<template>
    <div class="wallets">
        <q-card-title>
            <router-link class="breadcrumbs-link" :to="{ name: 'walletsList'}">Wallets</router-link> / {{ this.$router.currentRoute.meta.title }}
            <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
            <span slot="right">
                <q-btn flat
                       @click="checkAccess(walletItem)"
                       :disable="pending"
                       v-if="walletItem.payment_system_id"
                >
                    Check
                </q-btn>
                <q-btn flat
                       @click="addWallet()"
                       :disable="pending"
                >
                    Add
                </q-btn>
            </span>
        </q-card-title>
        <q-card-main>
            <div class="row sm-gutter">
                <div class="col-xs-12 col-sm-10 col-md-10">
                    <q-field
                            :error-label="errors && errors.payment_system_id ? errors.payment_system_id[0] : ''"
                            :error="errors && !!errors.payment_system_id"
                    >
                        <q-select
                                v-model="walletItem.payment_system_id"
                                float-label="Payment system *"
                                :options="paymentSystemItems"
                                :disable="pending || paymentSystemItems.length === 0"
                        />
                    </q-field>
                </div>
                <div class="col-xs-12 col-sm-2 col-md-2">
                    <q-field
                            :error-label="errors && errors.currency ? errors.currency[0] : ''"
                            :error="errors && !!errors.currency"
                    >
                        <q-select
                                v-model="walletItem.currency"
                                float-label="Currency *"
                                :options="currencies"
                                :disable="pending || currencies.length === 0"
                        />
                    </q-field>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <q-field :error-label="errors && errors.account ? errors.account[0] : ''"
                             :error="errors && !!errors.account"
                    >
                        <q-input v-model="walletItem.account"
                                 float-label="Wallet *"
                                 :disable="pending"
                                 :type="isWalletMulti()"
                        />
                    </q-field>
                </div>
            </div>
            <div class="row" v-if="needToFill('user')">
                <div class="col-12">
                    <q-field :error-label="errors && errors.user ? errors.user[0] : ''"
                             :error="errors && !!errors.user"
                    >
                        <q-input v-model="walletItem.user"
                                 float-label="User *"
                                 :disable="pending"
                        />
                    </q-field>
                </div>
            </div>
            <div class="row" v-if="needToFill('password')">
                <div class="col-12">
                    <q-field :error-label="errors && errors.password ? errors.password[0] : ''"
                             :error="errors && !!errors.password"
                    >
                        <q-input v-model="walletItem.password"
                                 float-label="Password *"
                                 :disable="pending"
                        />
                    </q-field>
                </div>
            </div>
            <div class="row" v-if="needToFill('secret')">
                <div class="col-12">
                    <q-field :error-label="errors && errors.secret ? errors.secret[0] : ''"
                             :error="errors && !!errors.secret"
                    >
                        <q-input v-model="walletItem.secret"
                                 float-label="Secret *"
                                 :disable="pending"
                        />
                    </q-field>
                </div>
            </div>
            <div class="row" v-if="needToFill('adv_sci')">
                <div class="col-12">
                    <q-field :error-label="errors && errors.adv_sci ? errors.adv_sci[0] : ''"
                             :error="errors && !!errors.adv_sci"
                    >
                        <q-input v-model="walletItem.adv_sci"
                                 float-label="ADV SCI *"
                                 :disable="pending"
                        />
                    </q-field>
                </div>
            </div>
            <div class="row" v-if="needToFill('id_payee')">
                <div class="col-12">
                    <q-field :error-label="errors && errors.id_payee ? errors.id_payee[0] : ''"
                             :error="errors && !!errors.id_payee"
                             helper="Max value is 99.9"
                    >
                        <q-input v-model="walletItem.id_payee"
                                 float-label="ID PAYEE *"
                                 :disable="pending"
                        />
                    </q-field>
                </div>
            </div>
            <div class="row" v-if="needToFill('Balance')">
                <div class="col-12">
                    <q-field :error-label="errors && errors.balance ? errors.balance[0] : ''"
                             :error="errors && !!errors.balance"
                    >
                        <q-input v-model="walletItem.balance"
                                 float-label="Balance"
                                 :disable="pending"
                        />
                    </q-field>
                </div>
            </div>
            <div class="row">
                <div class="col-12 active-checkbox">
                    <q-checkbox v-model="walletItem.active" label="Will wallet be active?" />
                </div>
            </div>
        </q-card-main>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppConfig from '../../config/app'

export default {
    data () {
        return {
            walletItem: this.setDefaultWalletObject(),

            paymentSystemItems: [],
            currencies: [],

            loading: true,
            errors: [],
            loader: null
        }
    },
    mounted () {
        this.getMeta()
    },
    computed: {
        ...mapGetters('Wallet', ['pending', 'checkPending', 'meta'])
    },
    methods: {
        ...mapActions('Wallet', ['add', 'check', 'getFormMeta']),
        setDefaultWalletObject () {
            return {
                id: null,
                payment_system_id: null,
                currency: '',
                account: null,
                user: null,
                password: null,
                secret: null,
                adv_sci: null,
                id_payee: null,
                balance: null,
                active: true
            }
        },
        isPending () {
            return this.pending || this.checkPending
        },
        checkAccess (walletItem) {
            this.check(walletItem).then(response => {
                this.walletItem.balance = response.data.balance
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
        getMeta () {
            this.getFormMeta().then(response => {
                this.paymentSystemItems = this.meta.payment_systems
                this.currencies = this.meta.currencies
            })
        },
        isWalletMulti () {
            if (this.meta && this.walletItem.payment_system_id && this.meta.settings[this.walletItem.payment_system_id].is_account_multi_line === 1) {
                return 'textarea'
            }

            return 'text'
        },
        needToFill (fieldName) {
            return this.meta && this.walletItem.payment_system_id && this.meta.settings[this.walletItem.payment_system_id].fields.indexOf(fieldName) !== -1
        },
        addWallet () {
            this.add(this.walletItem).then(response => {
                this.$router.push({
                    name: 'walletsList'
                })
            }).catch(errors => {
                this.errors = errors.errors
            })
        }
    }
}
</script>

<style>
    .active-checkbox {
        margin-top: 20px;
    }
</style>
