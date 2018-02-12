<template>
    <div class="commissions">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <div v-show="!pending">
            <q-card-title>
                <router-link class="breadcrumbs-link" :to="{ name: 'commissionsList'}">Commissions</router-link> / {{ this.$router.currentRoute.meta.title }}
                <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
                <span slot="right">
                    <q-btn flat
                           class="full-width"
                           @click="addCommission()"
                           :disable="pending"
                    >
                        Add
                    </q-btn>
                </span>
            </q-card-title>
            <q-card-main>
                <div class="gutter-sm">
                    <div class="row">
                        <div class="col-12">
                            <q-field
                                    :error-label="errors && errors.wallet_id ? errors.wallet_id[0] : ''"
                                    :error="errors && !!errors.wallet_id"
                            >
                                <q-select
                                        v-model="commission.wallet_id"
                                        float-label="From *"
                                        :options="wallets"
                                        :disable="pending || wallets.length === 0"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-sm">
                        <div class="col-xs-12 col-sm-10 col-md-10">
                            <q-field
                                    :error-label="errors && errors.payment_system_id ? errors.payment_system_id[0] : ''"
                                    :error="errors && !!errors.payment_system_id"
                            >
                                <q-select
                                        v-model="commission.payment_system_id"
                                        float-label="To payment system *"
                                        :options="paymentSystems"
                                        :disable="pending || paymentSystems.length === 0"
                                />
                            </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2">
                            <q-field
                                    :error-label="errors && errors.currency ? errors.currency[0] : ''"
                                    :error="errors && !!errors.currency"
                            >
                                <q-select
                                        v-model="commission.currency"
                                        float-label="To currency *"
                                        :options="currencies"
                                        :disable="pending || currencies.length === 0"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <q-field :error-label="errors && errors.commission ? errors.commission[0] : ''"
                                     :error="errors && !!errors.commission"
                                     helper="Max value is 99.9"
                            >
                                <q-input v-model="commission.commission"
                                         float-label="Commission *"
                                         :disable="pending"
                                         suffix="%"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 active-checkbox">
                            <q-checkbox v-model="commission.active"
                                        label="Will commission be active?"
                                        :disable="pending"
                            />
                        </div>
                    </div>
                </div>
            </q-card-main>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { QSelect, QCheckbox, QField, QInput } from 'quasar'
import InnerLoadingLayout from '../../layouts/InnerLoading'

export default {
    name: 'CommissionAddPage',
    components: {
        QSelect,
        QCheckbox,
        QField,
        QInput,
        InnerLoadingLayout
    },
    data () {
        return {
            commission: this.setDefaultCommissionObject(),

            paymentSystems: [],
            currencies: [],
            wallets: [],

            loading: true,
            errors: [],
            loader: null
        }
    },
    mounted () {
        this.getMeta()
    },
    computed: {
        ...mapGetters('commission', [
            'pending', 'meta'
        ])
    },
    methods: {
        ...mapActions('commission', [
            'add', 'getFormMeta'
        ]),
        setDefaultCommissionObject () {
            return {
                id: null,
                payment_system_id: null,
                currency: '',
                commission: null,
                wallet_id: null,
                active: true
            }
        },
        getMeta () {
            this.getFormMeta().then(response => {
                this.paymentSystems = this.meta.payment_systems
                this.currencies = this.meta.currencies
                this.wallets = this.meta.wallets
            })
        },
        addCommission () {
            this.add(this.commission).then(response => {
                this.$router.push({
                    name: 'commissionsList'
                })
            }).catch(errors => {
                this.errors = errors.errors
            })
        }
    }
}
</script>

<style scoped>
    .active-checkbox {
        margin-top: 20px;
    }
</style>
