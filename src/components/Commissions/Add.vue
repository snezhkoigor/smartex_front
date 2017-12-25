<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title title grey--text title-tool-bar">
				<router-link class="breadcrumbs-link" :to="{ name: 'commissionsList'}">Commissions</router-link> / {{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn
					flat
					@click="addCommission()"
					:loading="pending"
					:disabled="pending"
			>
				<span>Add</span>
				<span slot="loader">Sending...</span>
			</v-btn>
		</v-toolbar>

		<v-progress-linear class="pending" v-if="pending" v-bind:indeterminate="pending"></v-progress-linear>

		<v-divider></v-divider>

		<v-container>
			<v-form ref="commissionForm">
				<v-container grid-list-md fluid>
					<v-layout>
						<v-flex xs12>
							<v-select
									v-bind:items="wallets"
									v-model="commission.wallet_id"
									item-text="account"
									item-value="id"
									label="From wallet"
									single-line
									bottom
									:error-messages="errors && errors.wallet_id ? errors.wallet_id[0] : []"
									:error="errors && !!errors.wallet_id"
							></v-select>
						</v-flex>
					</v-layout>
					<v-layout row-md wrap>
						<v-flex xs12 sm10 md10>
							<v-select
									v-bind:items="paymentSystems"
									v-model="commission.payment_system_id"
									label="To payment system"
									item-text="name"
									item-value="id"
									:error-messages="errors && errors.payment_system_id ? errors.payment_system_id[0] : []"
									:error="errors && !!errors.payment_system_id"
									auto
							></v-select>
						</v-flex>
						<v-flex xs12 sm2 md2>
							<v-select
									v-bind:items="currencies"
									v-model="commission.currency"
									item-text="prefix"
									item-value="name"
									label="To currency"
									single-line
									bottom
									:error-messages="errors && errors.currency ? errors.currency[0] : []"
									:error="errors && !!errors.currency"
							></v-select>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12>
							<v-text-field
									label="Commission"
									v-model="commission.commission"
									:error-messages="errors && errors.commission ? errors.commission[0] : []"
									:error="errors && !!errors.commission"
							></v-text-field>
						</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs12 class="mt-3">
							<v-checkbox
									label="Will commission be active?"
									v-model="commission.active"
									light
							/>
						</v-flex>
					</v-layout>
				</v-container>
			</v-form>
		</v-container>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AppConfig from '../../config/app';
    import HttpHelper from '../../helpers/http';

    export default {
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
        mounted() {
            this.getMeta();
        },
        computed: {
            ...mapGetters('Commission', ['pending', 'meta']),
        },
        methods: {
            ...mapActions('Commission', ['add', 'getFormMeta']),
			setDefaultCommissionObject() {
            	return {
                    id: null,
                    payment_system_id: null,
                    currency: '',
                    commission: 0,
                    wallet_id: null,
                    active: true,
				}
			},
            getMeta() {
                this.getFormMeta().then(response => {
                    this.paymentSystems = this.meta.payment_systems;
                    this.currencies = this.meta.currencies;
                    this.wallets = this.meta.wallets;
				});
			},
            addCommission() {
                this.add(this.commission).then(response => {
                    this.$router.push({
                        name: 'commissionsList'
                    });
                }).catch(errors => {
                    this.errors = errors;
                });
			}
        }
    }
</script>