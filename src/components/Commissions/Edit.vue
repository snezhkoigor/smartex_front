<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title title grey--text title-tool-bar">
				<router-link class="breadcrumbs-link" :to="{ name: 'commissionsList'}">Commissions</router-link> / {{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn
					flat
					@click="editCommission()"
					:loading="pending"
					:disabled="pending"
			>
				<span>Edit</span>
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
									v-model="commissionItem.wallet_id"
									item-text="account"
									item-value="id"
									label="From wallet"
									required
									:disabled="pending"
									:error-messages="errors && errors.wallet_id ? errors.wallet_id[0] : []"
									:error="errors && !!errors.wallet_id"
							></v-select>
						</v-flex>
					</v-layout>
					<v-layout row-md wrap>
						<v-flex xs12 sm10 md10>
							<v-select
									v-bind:items="paymentSystems"
									v-model="commissionItem.payment_system_id"
									label="To payment system"
									item-text="name"
									item-value="id"
									:disabled="pending"
									required
									:error-messages="errors && errors.payment_system_id ? errors.payment_system_id[0] : []"
									:error="errors && !!errors.payment_system_id"
									auto
							></v-select>
						</v-flex>
						<v-flex xs12 sm2 md2>
							<v-select
									v-bind:items="currencies"
									v-model="commissionItem.currency"
									item-text="prefix"
									item-value="name"
									label="To currency"
									:disabled="pending"
									required
									:error-messages="errors && errors.currency ? errors.currency[0] : []"
									:error="errors && !!errors.currency"
							></v-select>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12>
							<v-text-field
									label="Commission"
									v-model="commissionItem.commission"
									:disabled="pending"
									required
									:error-messages="errors && errors.commission ? errors.commission[0] : []"
									:error="errors && !!errors.commission"
							></v-text-field>
						</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs12 class="mt-3">
							<v-checkbox
									label="Will commission be active?"
									v-model="commissionItem.active"
									:disabled="pending"
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
                commissionItem: {
                    id: parseInt(this.$route.params.commissionId),
                    payment_system_id: null,
                    currency: '',
                    commission: 0,
                    wallet_id: null,
                    active: true,
				},

                paymentSystems: [],
                currencies: [],
                wallets: [],

                loading: true,
                errors: [],
                loader: null
            }
        },
        mounted() {
            this.getCommission(this.commissionItem);
        },
        computed: {
            ...mapGetters('Commission', ['pending', 'meta', 'commission']),
        },
        methods: {
            ...mapActions('Commission', ['add', 'getById', 'edit']),
            getCommission(commissionItem) {
                this.getById(commissionItem).then(response => {
                    this.commissionItem = this.commission;
                    this.paymentSystems = this.meta.payment_systems;
                    this.currencies = this.meta.currencies;
                    this.wallets = this.meta.wallets;
				});
			},
            editCommission() {
                this.edit(this.commissionItem).then(response => {
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