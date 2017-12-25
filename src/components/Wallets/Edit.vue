<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title title grey--text title-tool-bar">
				<router-link class="breadcrumbs-link" :to="{ name: 'walletsList'}">Wallets</router-link> / {{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn
					flat
					@click="editWallet()"
					:loading="walletPending"
					:disabled="walletPending"
			>
				<span>Edit</span>
				<span slot="loader">Sending...</span>
			</v-btn>
			<v-btn
					flat
					@click="checkAccess(walletItem)"
					:loading="checkPending"
					:disabled="checkPending"
			>
				<span>Check</span>
				<span slot="loader">Sending...</span>
			</v-btn>
		</v-toolbar>

		<v-progress-linear class="pending" v-if="isPending()" v-bind:indeterminate="isPending()"></v-progress-linear>

		<v-divider></v-divider>

		<v-container>
			<v-form ref="walletForm">
				<v-container grid-list-md fluid>
					<v-layout row-md wrap>
						<v-flex xs12 sm10 md10>
							<v-select
									v-bind:items="paymentSystemItems"
									v-model="walletItem.payment_system_id"
									item-text="name"
									item-value="id"
									auto
									disabled
							></v-select>
						</v-flex>
						<v-flex xs12 sm2 md2>
							<v-select
									v-bind:items="currencies"
									v-model="walletItem.currency"
									item-text="prefix"
									item-value="name"
									label="Currency"
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
									label="Wallet"
									v-model="walletItem.account"
									multi-line
									:error-messages="errors && errors.account ? errors.account[0] : []"
									:error="errors && !!errors.account"
							></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row class="mt-3" v-if="needToFill('user')">
						<v-flex xs12>
							<v-text-field
									label="User"
									v-model="walletItem.user"
									:error-messages="errors && errors.user ? errors.user[0] : []"
									:error="errors && !!errors.user"
							></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row class="mt-3" v-if="needToFill('password')">
						<v-flex xs12>
							<v-text-field
									label="Password"
									v-model="walletItem.password"
									:error-messages="errors && errors.password ? errors.password[0] : []"
									:error="errors && !!errors.password"
							></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row class="mt-3" v-if="needToFill('secret')">
						<v-flex xs12>
							<v-text-field
									label="Secret"
									v-model="walletItem.secret"
									:error-messages="errors && errors.secret ? errors.secret[0] : []"
									:error="errors && !!errors.secret"
							></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row class="mt-3" v-if="needToFill('adv_sci')">
						<v-flex xs12>
							<v-text-field
									label="ADV SCI"
									v-model="walletItem.adv_sci"
									counter="100"
									:error-messages="errors && errors.adv_sci ? errors.adv_sci[0] : []"
									:error="errors && !!errors.adv_sci"
							></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row class="mt-3" v-if="needToFill('id_payee')">
						<v-flex xs12>
							<v-text-field
									label="ID PAYEE"
									v-model="walletItem.id_payee"
									counter="100"
									:error-messages="errors && errors.id_payee ? errors.id_payee[0] : []"
									:error="errors && !!errors.id_payee"
							></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row class="mt-3">
						<v-flex xs12>
							<v-text-field
									label="Balance"
									v-model="walletItem.balance"
									:error-messages="errors && errors.balance ? errors.balance[0] : []"
									:error="errors && !!errors.balance"
							></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 class="mt-3">
							<v-checkbox
									label="Will wallet be active?"
									v-model="walletItem.active"
									light
							/>
						</v-flex>
					</v-layout>
				</v-container>
			</v-form>
		</v-container>

		<v-layout row justify-center>
			<v-dialog v-model="walletCheckDialog" max-width="290">
				<v-card>
					<v-card-title class="headline">Answer</v-card-title>
					<v-card-text color="green darken-1" v-if="walletCheckAnswer">
						<p v-if="!errors.message" color="green--text darken-1">
							{{walletCheckAnswer}}
						</p>
						<p v-if="errors.message && errors.message.length" class="red--text darken-1">
							{{errors.message}}
						</p>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="green darken-1" flat="flat" @click="closeCheckWalletDialog()">
							Ok
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AppConfig from '../../config/app';
    import HttpHelper from '../../helpers/http';

    export default {
        data () {
            return {
                walletItem: {
                    id: parseInt(this.$route.params.walletId),
                    payment_system_id: parseInt(this.$route.params.paymentSystemId),
                    currency: '',
                    account: null,
                    user: null,
                    password: null,
                    secret: null,
                    adv_sci: null,
                    id_payee: null,
                    balance: 0,
                    active: true,
                },

                paymentSystemItems: [],
                currencies: [],

                loading: true,
                walletCheckAnswer: '',
                errors: [],
                loader: null,

                walletCheckDialog: false,
            }
        },
        mounted() {
            this.getWallet(this.walletItem);
        },
        watch: {
            walletCheckAnswer: function (value) {
                if (value.length > 0) {
                    this.walletCheckDialog = true;
                }
            }
        },
        computed: {
            ...mapGetters({
                walletMeta: 'Wallet/meta',
                wallet: 'Wallet/wallet',
                walletPending: 'Wallet/pending',
                checkPending: 'Wallet/checkPending'
            }),
        },
        methods: {
            ...mapActions('Wallet', [
                'getById', 'edit', 'check'
            ]),
            isPending() {
                return this.walletPending || this.checkPending
            },
            closeCheckWalletDialog() {
                this.walletCheckDialog = false;
                this.errors = [];
                this.walletCheckAnswer = '';
            },
            checkAccess(walletItem) {
                this.check(walletItem).then(response => {
                    this.walletCheckAnswer = 'Status: OK';
                    this.walletItem.balance = response.data.balance;
                }).catch(errors => {
                    this.walletCheckAnswer = errors.message;
                    this.errors = errors;
                });
            },
            getWallet(wallet) {
                this.getById(wallet).then(response => {
                    this.walletItem = this.wallet;
                    this.paymentSystemItems = this.walletMeta.payment_systems;
                    this.currencies = this.walletMeta.currencies;
                });
            },
            needToFill(fieldName) {
                return this.walletMeta && this.walletItem.payment_system_id && this.walletMeta.required[this.walletItem.payment_system_id].indexOf(fieldName) !== -1;
            },
            editWallet() {
                this.edit(this.walletItem).then(response => {
                    this.$router.push({
                        name: 'walletsList'
                    });
                }).catch(errors => {
                    this.errors = errors;
                });
            }
        }
    }
</script>