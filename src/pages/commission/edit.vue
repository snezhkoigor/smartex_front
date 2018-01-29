<template>
    <div class="commissions">
        <q-card-title>
            <router-link class="breadcrumbs-link" :to="{ name: 'commissionsList'}">Commissions</router-link> / {{ this.$router.currentRoute.meta.title }}
            <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
            <span slot="right">
                <q-btn flat
                       class="full-width"
                       @click="editCommission()"
                       :disable="pending"
                >
                    Edit
                </q-btn>
            </span>
        </q-card-title>
        <q-card-main>
            <div class="row">
                <div class="col-12">
                    <q-field
                            :error-label="errors && errors.wallet_id ? errors.wallet_id[0] : ''"
                            :error="errors && !!errors.wallet_id"
                    >
                        <q-select
                                v-model="commissionItem.wallet_id"
                                float-label="From *"
                                :options="wallets"
                                :disable="pending || wallets.length === 0"
                        />
                    </q-field>
                </div>
            </div>
            <div class="row sm-gutter">
                <div class="col-xs-12 col-sm-10 col-md-10">
                    <q-field
                            :error-label="errors && errors.payment_system_id ? errors.payment_system_id[0] : ''"
                            :error="errors && !!errors.payment_system_id"
                    >
                        <q-select
                                v-model="commissionItem.payment_system_id"
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
                                v-model="commissionItem.currency"
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
                        <q-input v-model="commissionItem.commission"
                                 float-label="Commission *"
                                 :disable="pending"
                                 suffix="%"
                        />
                    </q-field>
                </div>
            </div>
            <div class="row">
                <div class="col-12 active-checkbox">
                    <q-checkbox v-model="commissionItem.active"
                                label="Will commission be active?"
                                :disable="pending"
                    />
                </div>
            </div>
        </q-card-main>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            commissionItem: {
                id: parseInt(this.$route.params.commissionId),
                payment_system_id: null,
                currency: '',
                commission: null,
                wallet_id: null,
                active: null
            },

            paymentSystems: [],
            currencies: [],
            wallets: [],

            loading: true,
            errors: [],
            loader: null
        }
    },
    mounted () {
        this.getCommission(this.commissionItem)
    },
    computed: {
        ...mapGetters('Commission', [
            'pending', 'meta', 'commission'
        ])
    },
    methods: {
        ...mapActions('Commission', [
            'add', 'getById', 'edit'
        ]),
        getCommission (commissionItem) {
            this.getById(commissionItem.id).then(response => {
                this.commissionItem = this.commission
                this.paymentSystems = this.meta.payment_systems
                this.currencies = this.meta.currencies
                this.wallets = this.meta.wallets
            })
        },
        editCommission () {
            this.edit(this.commissionItem).then(response => {
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

<style>
    .active-checkbox {
        margin-top: 20px;
    }
</style>
