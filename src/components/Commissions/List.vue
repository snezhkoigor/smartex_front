<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title title grey--text title-tool-bar">
				{{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click.native="goToAddCommission()">
				<v-icon>mdi-playlist-plus</v-icon>
			</v-btn>
			<v-btn icon @click.native="getCommissionsList()">
				<v-icon>refresh</v-icon>
			</v-btn>
		</v-toolbar>

		<v-progress-linear class="pending" v-if="pending" v-bind:indeterminate="pending"></v-progress-linear>

		<v-divider></v-divider>

		<v-card-text>
			<v-layout row-md wrap>
				<v-flex xs12 sm4 md4>
					<v-select
							v-bind:items="meta.payment_systems"
							v-model="filterByPaymentSystem"
							label="Filter by 'to' payment system"
							item-text="name"
							item-value="id"
							class="ml-2"
							:disabled="pending"
					></v-select>
					<v-btn class="clear-filter-button" flat small :disabled="filterByPaymentSystem.length === 0" @click.native="clearFilterPaymentSystem()">
						clear
					</v-btn>
				</v-flex>
				<v-flex xs12 sm4 md4>
					<v-select
							v-bind:items="meta.currencies"
							v-model="filterByCurrency"
							item-text="prefix"
							item-value="name"
							label="Filter by 'to' currency"
							class="ml-2"
							:disabled="pending"
					></v-select>
					<v-btn class="clear-filter-button" flat small :disabled="filterByCurrency.length === 0" @click.native="clearFilterCurrency()">
						clear
					</v-btn>
				</v-flex>
				<v-flex xs12 sm4 md4>
					<v-text-field
							append-icon="search"
							label="Search by 'from' wallet"
							class="ml-2"
							hint="Press enter for start search"
							v-on:keyup.enter="getCommissionsList()"
							v-model="search"
							:disabled="pending"
					></v-text-field>
					<v-btn class="clear-filter-button" flat small :disabled="search.length === 0" @click.native="clearSearchField()">
						clear
					</v-btn>
				</v-flex>
			</v-layout>

			<v-data-table
					v-bind:items="items"
					v-bind:pagination.sync="pagination"
					:total-items="totalItems"
					:rows-per-page-items="perPage"
					class="elevation-0 mt-5"
					hide-headers
			>
				<template slot="items" slot-scope="props">
					<tr :class="{'': props.item.active, 'red lighten-3': !props.item.active}"
							class="news-table-list"
					>
						<td class="text-lg-left table-list-data" @click="goToEditCommission(props.item)">
							<b>{{props.item.commission}}%</b>: <span class="commission-from">from</span> <b>{{props.item.wallet.data.paymentSystem.data.name}}, {{props.item.wallet.data.prefix}}</b> ({{ props.item.wallet.data.account | truncate(25) }}) <span class="commission-to">to</span> <b>{{ props.item.paymentSystem.data.name }}, {{ props.item.prefix }}</b>
						</td>
						<td class="text-lg-center table-list-actions">
							<v-btn flat icon color="red darken-1" @click="openDeleteDialog(props.item)">
								<v-icon>mdi-delete</v-icon>
							</v-btn>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card-text>

		<v-layout row justify-center>
			<v-dialog v-model="commissionDeleteDialog" max-width="300" v-if="this.commission.id">
				<v-card>
					<v-card-title class="headline">Delete this commission&nbsp;<b>{{this.commission.commission}}%</b>?</v-card-title>
					<v-card-text>
						<span class="commission-from">from</span> <b>{{this.commission.wallet.data.paymentSystem.data.name}}, {{this.commission.wallet.data.prefix}}</b> ({{ this.commission.wallet.data.account | truncate(25) }}) <span class="commission-to">to</span> <b>{{ this.commission.paymentSystem.data.name }}, {{ this.commission.prefix }}</b>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="red darken-1" flat="flat" @click="closeDeleteDialog()">
							Disagree
						</v-btn>
						<v-btn color="green darken-1"
								flat
								@click="deleteCommission()"
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

				commission: {},

                totalItems: 0,
                items: [],

				pagination: this.getDefaultPagination(),
                commissionDeleteDialog: false,

                errors: [],

				filterByPaymentSystem: '',
                filterByCurrency: '',
                search: '',

                perPage: AppConfig.perPage,

                loader: null,
            }
        },
        mounted() {
            this.getCommissionsList();
        },
        computed: {
            ...mapGetters('Commission', [
                'commissions', 'pending', 'meta'
            ])
        },
		watch: {
            pagination: {
                handler () {
                    this.getCommissionsList();
                },
                deep: true
            },
            filterByPaymentSystem: function (value) {
                if (value > 0) {
                    this.getCommissionsList();
                }
			},
            filterByCurrency: function (value) {
                if (value.length > 0) {
                    this.getCommissionsList();
                }
            }
		},
        methods: {
            ...mapActions('Commission', [
                'list', 'delete'
            ]),
            goToAddCommission() {
                this.$router.push({
                    name: 'commissionAdd'
                });
			},
            goToEditCommission (commissionItem) {
                this.$router.push({
                    name: 'commissionEdit',
                    params: { commissionId: commissionItem.id }
                });
            },
            clearSearchField() {
                this.search = '';
                this.getCommissionsList();
            },
            clearFilterCurrency() {
                this.filterByCurrency = '';
                this.setDefaultPagination();
                this.getCommissionsList();
            },
            clearFilterPaymentSystem() {
				this.filterByPaymentSystem = '';
                this.setDefaultPagination();
                this.getCommissionsList();
			},
			openDeleteDialog(commission) {
                this.commission = commission;
                this.commissionDeleteDialog = true;
            },
            closeDeleteDialog() {
                this.commissionDeleteDialog = false;
                this.commission = {};
            },
            setDefaultPagination() {
                this.pagination = this.getDefaultPagination();
            },
			getDefaultPagination() {
                return {
                    q: '',
                    filters: {}
				}
			},
            getCommissionsList() {
                let pagination = this.getDefaultPagination();

				if (this.filterByPaymentSystem > 0) {
                    pagination.filters.payment_system_id = this.filterByPaymentSystem;
				}
                if (this.filterByCurrency.length > 0) {
                    pagination.filters.currency = this.filterByCurrency;
                }
                if (this.search.length > 0) {
                    pagination.q = this.search;
                }

                pagination.include = 'paymentSystem,wallet,wallet.paymentSystem';

                this.list(HttpHelper.getPaginationParam(pagination)).then(() => {
                    this.items = this.commissions;
                    this.totalItems = this.meta.count;
				});
			},
            deleteCommission() {
                this.delete(this.commission).then(response => {
                    this.closeDeleteDialog();
                    this.getCommissionsList();
                }).catch(errors => {
                    this.errors = errors;
                });
            },
        }
    }
</script>

<style>
	.commission-from, .commission-to, .commission-value {
		font-size: 10px;
	}
</style>