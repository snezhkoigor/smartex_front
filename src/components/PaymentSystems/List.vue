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
			<v-layout row-md wrap v-for="paymentSystemItem in paymentSystems" :key="paymentSystemItem.id">
				<v-subheader class="grey lighten-4" style="width: 100%;">
					<span class="title">{{paymentSystemItem.name}}</span>
					<v-btn icon @click.native="goToAddWallet(paymentSystemItem.id)">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</v-subheader>

				<v-container grid-list-md fill-height fluid v-if="paymentSystemItem.wallets !== undefined && paymentSystemItem.wallets.data.length > 0" class="mb-5">
					<v-layout row-md wrap>
						<v-flex xs12 sm6 md6 v-for="walletItem in paymentSystemItem.wallets.data" :key="walletItem.id">
							<v-card :class="{'': walletItem.active, 'red lighten-5': !walletItem.active}">
								<v-card-media style="background-color: #1565C0;">
									<v-container grid-list-md fill-height fluid>
										<v-layout row wrap class="hidden-lg-and-up ma-2">
											<v-flex d-flex xs12 sm7 md7>
												<span class="white--text">
													<div class="body-1">In</div>
													<div class="headline">{{walletItem.balance | currency(walletItem.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm7 md7>
												<span class="white--text">
													<div class="body-1">Out</div>
													<div class="headline">{{walletItem.balance | currency(walletItem.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm7 md7>
												<span class="white--text">
													<div class="body-1">Commission</div>
													<div class="headline">{{walletItem.balance | currency(walletItem.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm7 md7>
												<span class="white--text">
													<div class="body-1">Balance</div>
													<div class="headline">{{walletItem.balance | currency(walletItem.prefix)}}</div>
												</span>
											</v-flex>
										</v-layout>

										<v-layout row wrap class="hidden-md-and-down ma-2">
											<v-flex d-flex xs12 sm6 md6>
												<span class="white--text">
													<div class="body-1">In</div>
													<div class="headline">{{walletItem.balance | currency(walletItem.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm6 md6>
												<span class="white--text">
													<div class="body-1">Out</div>
													<div class="headline">{{walletItem.balance | currency(walletItem.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm6 md6>
												<span class="white--text">
													<div class="body-1">Commission</div>
													<div class="headline">{{walletItem.balance | currency(walletItem.prefix)}}</div>
												</span>
											</v-flex>
											<v-flex d-flex xs12 sm6 md6>
												<span class="white--text">
													<div class="body-1">Balance</div>
													<div class="headline">{{walletItem.balance | currency(walletItem.prefix)}}</div>
												</span>
											</v-flex>
										</v-layout>
									</v-container>
								</v-card-media>
								<v-card-title primary-title>
									<div>
										<h3 class="headline mb-0">
											<span v-if="walletItem.account.length > 25">
												<v-tooltip bottom>
													<v-icon dark color="primary" class="mb-1" slot="activator">mdi-information-outline</v-icon>
													<template v-for="line in walletItem.account.split('\n')">{{line}}<br></template>
												</v-tooltip>
											</span>
											<span>
												{{walletItem.account | truncate(25)}}
											</span>
										</h3>
									</div>
								</v-card-title>
								<v-card-actions>
									<v-btn flat color="green darken-1" @click="goToEditWallet(walletItem)">
										Edit
									</v-btn>
									<v-btn flat icon color="green darken-1" @click="checkAccess(walletItem)">
										<v-icon>mdi-playlist-check</v-icon>
									</v-btn>
									<v-btn flat icon color="red darken-1" @click="openDeleteDialog(walletItem)">
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
				<v-container v-if="paymentSystemItem.wallets === undefined || (paymentSystemItem.wallets !== undefined && paymentSystemItem.wallets.data.length === 0)" class="mb-5">
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
						<v-btn color="green darken-1" flat="flat" @click="closeCheckDialog()">
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
						<v-btn color="red darken-1" flat="flat" @click="closeDeleteDialog()">
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
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AppConfig from '../../config/app';
    import HttpHelper from '../../helpers/http';

    export default {
        data () {
            return {
                loading: true,

				wallet: {},

                walletCheckAnswer: '',
				pagination: {},
                walletCheckDialog: false,
                walletDeleteDialog: false,

                errors: [],

                loader: null,
            }
        },
        mounted() {
            this.getListPaymentSystems();
        },
        computed: {
            ...mapGetters('PaymentSystem', [
                'pending', 'paymentSystems', 'meta'
            ]),
            ...mapGetters('Wallet', [
                'checkPending'
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
                'list'
            ]),
            ...mapActions('Wallet', [
                'delete', 'check'
            ]),
            goToAddWallet(paymentSystemId) {
                this.$router.push({
					name: 'walletAdd',
					params: { paymentSystemId: paymentSystemId }
                });
			},
            goToEditWallet(walletItem) {
				this.$router.push({
					name: 'walletEdit',
					params: { paymentSystemId: walletItem.payment_system_id, walletId: walletItem.id }
				});
			},
            checkAccess(wallet) {
                this.check(wallet).then(response => {
                    this.walletCheckAnswer = 'Status: OK';
                    this.wallet.balance = response.data.balance;
				}).catch(errors => {
                    this.walletCheckAnswer = errors.message;
                    this.errors = errors;
                });
			},
			openDeleteDialog(wallet) {
                this.wallet = wallet;
                this.walletDeleteDialog = true;
            },
            closeCheckDialog(wallet) {
                this.walletCheckAnswer = '';
                this.walletCheckDialog = false;
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
            closeDeleteDialog() {
                this.walletDeleteDialog = false;
                this.wallet = {};
			},
            deleteWallet() {
                this.delete(this.wallet).then(response => {
                    this.closeDeleteDialog();
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