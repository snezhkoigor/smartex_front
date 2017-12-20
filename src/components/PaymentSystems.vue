<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title title grey--text title-tool-bar">
				{{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click.native="getListPaymentSystems()">
				<v-icon>refresh</v-icon>
			</v-btn>
		</v-toolbar>

		<v-progress-linear class="pending" v-if="pending || checkPending" v-bind:indeterminate="pending || checkPending"></v-progress-linear>

		<v-divider></v-divider>

		<v-container class="wallets-list">
			<v-layout row-md wrap v-if="payment_systems" v-for="payment_system in payment_systems" :key="payment_system.id">
				<v-subheader v-if="payment_system.name" class="grey lighten-4" style="width: 100%;">
					<span class="title">{{payment_system.name}}</span>
					<v-btn icon @click.native="openAddEditDialog(payment_system.id)">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</v-subheader>

				<v-container grid-list-md fill-height fluid v-if="payment_system.wallets.data.length !== 0" class="mb-5">
					<v-layout row-md wrap>
						<v-flex xs12 sm6 md6 v-for="wallet in payment_system.wallets.data" :key="wallet.id">
							<v-card :class="{'': wallet.active, 'red lighten-5': !wallet.active}">
								<v-card-media style="background-color: #1565C0;">
									<v-container grid-list-md fill-height fluid>
										<v-layout row wrap class="hidden-lg-and-up ma-2">
											<v-flex d-flex xs12 sm7 md7>
												<span class="white--text">
													<div class="body-1">In</div>
													<div class="headline">{{wallet.balance | currency(wallet.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm7 md7>
												<span class="white--text">
													<div class="body-1">Out</div>
													<div class="headline">{{wallet.balance | currency(wallet.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm7 md7>
												<span class="white--text">
													<div class="body-1">Commission</div>
													<div class="headline">{{wallet.balance | currency(wallet.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm7 md7>
												<span class="white--text">
													<div class="body-1">Balance</div>
													<div class="headline">{{wallet.balance | currency(wallet.prefix)}}</div>
												</span>
											</v-flex>
										</v-layout>

										<v-layout row wrap class="hidden-md-and-down ma-2">
											<v-flex d-flex xs12 sm6 md6>
												<span class="white--text">
													<div class="body-1">In</div>
													<div class="headline">{{wallet.balance | currency(wallet.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm6 md6>
												<span class="white--text">
													<div class="body-1">Out</div>
													<div class="headline">{{wallet.balance | currency(wallet.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm6 md6>
												<span class="white--text">
													<div class="body-1">Commission</div>
													<div class="headline">{{wallet.balance | currency(wallet.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm6 md6>
												<span class="white--text">
													<div class="body-1">Balance</div>
													<div class="headline">{{wallet.balance | currency(wallet.prefix)}}</div>
												</span>
											</v-flex>
										</v-layout>
									</v-container>
								</v-card-media>
								<v-card-title primary-title>
									<div>
										<h3 class="headline mb-0">
											<span v-if="wallet.account.length > 25">
												<v-tooltip bottom>
													<v-icon dark color="primary" class="mb-1" slot="activator">mdi-information-outline</v-icon>
													<template v-for="line in wallet.account.split('\n')">{{line}}<br></template>
												</v-tooltip>
											</span>
											<span>
												{{wallet.account | truncate(25)}}
											</span>
										</h3>
									</div>
								</v-card-title>
								<v-card-actions>
									<v-btn flat color="green darken-1" @click="openAddEditDialog(payment_system.id, wallet)">
										Edit
									</v-btn>
									<v-btn flat icon color="green darken-1" @click="checkAccess(wallet)">
										<v-icon>mdi-playlist-check</v-icon>
									</v-btn>
									<v-btn flat icon color="red darken-1" @click="openDeleteDialog(payment_system.id, wallet)">
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
				<v-container v-if="payment_system.wallets.data.length === 0" class="mb-5">
					No wallets
				</v-container>
			</v-layout>
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

		<v-layout row justify-center>
			<v-dialog v-model="walletDeleteDialog" max-width="290" v-if="this.wallet.account">
				<v-card>
					<v-card-title class="headline">Delete this wallet?</v-card-title>
					<v-card-text>Are you sure that you want to delete the wallet '{{this.wallet.account | truncate(50)}}'?</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="red darken-1" flat="flat" @click="clearWalletObject()">
							Disagree
						</v-btn>
						<v-btn color="green darken-1"
								flat
								@click="deleteWallet()"
								:loading="pending"
								:disabled="pending"
						>
							Agree
							<span slot="loader">Sending...</span>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>

		<v-layout row wrap justify-center>
			<v-dialog v-model="walletAddEditDialog" fullscreen transition="dialog-bottom-transition" :overlay=true>
				<v-card color="grey lighten-5">
					<v-toolbar dark color="teal lighten-1">
						<v-btn icon @click="clearWalletObject()" dark>
							<v-icon>close</v-icon>
						</v-btn>
						<v-toolbar-title>
							<span v-if="wallet.id">Edit wallet</span>
							<span v-else>Add wallet</span>
						</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-toolbar-items>
							<v-btn dark
									flat
									@click="checkAccess(wallet)"
									:loading="checkPending"
									:disabled="checkPending"
							>
								<span>Check</span>
								<span slot="loader">Sending...</span>
							</v-btn>
							<v-btn dark
									flat
									@click="saveWallet()"
									:loading="pending"
									:disabled="pending"
							>
								<span v-if="wallet.id">Edit</span>
								<span v-else>Add</span>
								<span slot="loader">Sending...</span>
							</v-btn>
						</v-toolbar-items>
					</v-toolbar>

					<v-form ref="walletForm">
						<v-container fluid>
							<v-layout row class="mt-3">
								<v-flex xs12 sm10 v-if="meta">
									<v-select
											v-bind:items="meta.payment_systems"
											v-model="wallet.payment_system_id"
											item-text="name"
											item-value="id"
											label="Payment system"
											single-line
											style="z-index: 11111 !important"
											disabled
											bottom
									></v-select>
								</v-flex>
								<v-flex xs12 sm2 class="ml-2" v-if="meta">
									<v-select
											v-bind:items="meta.currencies"
											v-model="wallet.currency"
											item-text="prefix"
											item-value="name"
											label="Currency"
											single-line
											bottom
											style="z-index: 11111 !important"
											:error-messages="errors && errors.currency ? errors.currency[0] : []"
											:error="errors && !!errors.currency"
									></v-select>
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-text-field
											label="Wallet"
											v-model="wallet.account"
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
											v-model="wallet.user"
											:error-messages="errors && errors.user ? errors.user[0] : []"
											:error="errors && !!errors.user"
									></v-text-field>
								</v-flex>
							</v-layout>
							<v-layout row class="mt-3" v-if="needToFill('password')">
								<v-flex xs12>
									<v-text-field
											label="Password"
											v-model="wallet.password"
											:error-messages="errors && errors.password ? errors.password[0] : []"
											:error="errors && !!errors.password"
									></v-text-field>
								</v-flex>
							</v-layout>
							<v-layout row class="mt-3" v-if="needToFill('secret')">
								<v-flex xs12>
									<v-text-field
											label="Secret"
											v-model="wallet.secret"
											:error-messages="errors && errors.secret ? errors.secret[0] : []"
											:error="errors && !!errors.secret"
									></v-text-field>
								</v-flex>
							</v-layout>
							<v-layout row class="mt-3" v-if="needToFill('adv_sci')">
								<v-flex xs12>
									<v-text-field
											label="ADV SCI"
											v-model="wallet.adv_sci"
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
											v-model="wallet.id_payee"
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
											v-model="wallet.balance"
											:error-messages="errors && errors.balance ? errors.balance[0] : []"
											:error="errors && !!errors.balance"
									></v-text-field>
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12 class="mt-3">
									<v-checkbox
											label="Will wallet be active?"
											v-model="wallet.active"
											light
									/>
								</v-flex>
							</v-layout>
						</v-container>
					</v-form>
				</v-card>
			</v-dialog>
		</v-layout>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AppConfig from '../config/app';
    import HttpHelper from "../helpers/http";

    export default {
        data () {
            return {
                wallet: this.defaultWalletObject(),

                loading: true,

				walletCheckAnswer: '',

				pagination: {},
                walletCheckDialog: false,
                walletDeleteDialog: false,
                walletAddEditDialog: false,

                errors: [],

                loader: null,
            }
        },
        mounted() {
            this.getListPaymentSystems();
        },
        computed: {
            ...mapGetters('PaymentSystem', [
                'pending', 'payment_systems', 'meta', 'checkPending'
            ])
        },
		watch: {
            walletCheckAnswer: function (value) {
                if (value.length > 0) {
                    this.walletCheckDialog = true;
				}
			}
		},
        methods: {
            ...mapActions('PaymentSystem', [
                'list', 'walletAdd', 'walletEdit', 'walletDelete', 'walletCheck'
            ]),
            checkAccess(wallet) {
                this.walletCheck(wallet).then(response => {
                    this.walletCheckAnswer = 'Status: OK';
                    this.wallet.balance = response.data.balance;
				}).catch(errors => {
                    this.walletCheckAnswer = errors.message;
                    this.errors = errors;
                });
			},
			needToFill(fieldName) {
            	return this.meta && this.wallet.payment_system_id && this.meta.required[this.wallet.payment_system_id].indexOf(fieldName) !== -1;
			},
			defaultWalletObject() {
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
					balance: 0,
					active: true,
                }
			},
            clearWalletObject() {
                this.closeAllDialogs();
                this.course = this.defaultWalletObject();
			},
            openDeleteDialog(payment_system_id, walletProps) {
                walletProps = walletProps ? walletProps : this.defaultWalletObject();
                walletProps.payment_system_id = payment_system_id;

                this.setWalletObject(walletProps);
                this.walletDeleteDialog = true;
            },
            openAddEditDialog(payment_system_id, walletProps) {
                walletProps = walletProps ? walletProps : this.defaultWalletObject();
                walletProps.payment_system_id = payment_system_id;

				this.setWalletObject(walletProps);
                this.walletAddEditDialog = true;
            },
            setWalletObject(walletProps) {
                this.wallet = {
                    id: walletProps.id,
                    payment_system_id: walletProps.payment_system_id,
                    currency: walletProps.currency,
                    account: walletProps.account,
                    user: walletProps.user,
                    password: walletProps.password,
                    secret: walletProps.secret,
                    adv_sci: walletProps.adv_sci,
                    id_payee: walletProps.id_payee,
                    balance: walletProps.balance,
                    active: walletProps.active,
				}
			},
            getListPaymentSystems() {
                let pagination = this.pagination;

                pagination.filters = this.filters;
                pagination.q = '';
                if (this.search) {
                    pagination.q = this.search;
				}
                pagination.include = 'wallets';

                this.list(HttpHelper.getPaginationParam(pagination));
			},
            closeCheckWalletDialog() {
                this.walletCheckDialog = false;
                this.errors = [];
                this.walletCheckAnswer = '';
            },
			closeAllDialogs() {
                this.walletDeleteDialog = false;
            	this.walletAddEditDialog = false;
			},
			saveWallet() {
                if (this.wallet.id) {
                    this.walletEdit(this.wallet).then(response => {
                        this.clearWalletObject();
                        this.getListPaymentSystems();
                    }).catch(errors => {
                        this.errors = errors;
                    });
				} else {
                    this.walletAdd(this.wallet).then(response => {
                        this.clearWalletObject();
                        this.getListPaymentSystems();
                    }).catch(errors => {
                        this.errors = errors;
                    });
				}
			},
            deleteWallet() {
                this.walletDelete(this.wallet).then(response => {
                    this.clearWalletObject();
                    this.getListPaymentSystems();
                }).catch(errors => {
                    this.errors = errors;
                });
            },
        }
    }
</script>

<style>
	.wallets-list {
		padding: 15px !important;
	}
</style>