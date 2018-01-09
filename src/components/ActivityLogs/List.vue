<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title title grey--text title-tool-bar">
				{{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
		</v-toolbar>

		<v-progress-linear class="pending" v-if="pending" v-bind:indeterminate="pending" />

		<v-divider />

		<v-card-text>
			<v-layout row-md wrap>
				<v-flex xs12 >
					<v-text-field
							append-icon="search"
							label="Search by description"
							hint="Press enter for start search"
							v-on:keyup.enter="getLogList()"
							v-model="search"
							:disabled="pending"
					></v-text-field>
					<v-btn class="clear-filter-button" flat small :disabled="search.length === 0" @click.native="clearSearchField()">
						clear
					</v-btn>
				</v-flex>
			</v-layout>
			<v-layout row-md wrap>
				<v-flex xs12 sm4 md4>
					<v-select
							v-bind:items="meta.subject_types"
							v-model="filterBySubjectType"
							label="Filter by model"
							item-text="name"
							item-value="id"
							class="ml-2"
							:disabled="pending"
					></v-select>
					<v-btn class="clear-filter-button" flat small :disabled="filterBySubjectType.length === 0" @click.native="clearFilterSubjectType()">
						clear
					</v-btn>
				</v-flex>
				<v-flex xs12 sm4 md4>
					<v-select
							v-bind:items="meta.log_names"
							v-model="filterByLogName"
							label="Filter by action"
							item-text="name"
							item-value="id"
							class="ml-2"
							:disabled="pending"
					></v-select>
					<v-btn class="clear-filter-button" flat small :disabled="filterByLogName.length === 0" @click.native="clearFilterLogName()">
						clear
					</v-btn>
				</v-flex>
				<v-flex xs12 sm4 md4>
					<v-select
							v-bind:items="meta.users"
							v-model="filterByUser"
							label="Filter by action"
							item-text="name"
							item-value="id"
							class="ml-2"
							:disabled="pending"
					></v-select>
					<v-btn class="clear-filter-button" flat small :disabled="filterByUser === null" @click.native="clearFilterUser()">
						clear
					</v-btn>
				</v-flex>
			</v-layout>

			<v-data-table
					v-bind:headers="headers"
					v-bind:items="items"
					v-bind:pagination.sync="pagination"
					:total-items="totalItems"
					:rows-per-page-items="perPage"
					class="elevation-0 mt-5"
					must-sort
			>
				<template slot="items" slot-scope="props">
					<tr>
						<td class="text-lg-left table-list-data" @click="goToViewLog(props.item)">
							{{props.item.created_at.date | moment('H:mm, d.MM.YYYY')}}
						</td>
						<td class="text-lg-left table-list-data" @click="goToViewLog(props.item)">
							{{ props.item.user.data.name }} {{ props.item.user.data.family }}
						</td>
						<td class="text-lg-left table-list-data" @click="goToViewLog(props.item)">
							{{ props.item.log_name }}
						</td>
						<td class="text-lg-left table-list-data" @click="goToViewLog(props.item)">
							{{ props.item.description | truncate(50) }}
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card-text>
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

                pagination: {
                    orderBy: 'created_at',
                    descending: true
				},

                errors: [],

                filterBySubjectType: '',
                filterByLogName: '',
                filterByUser: null,
                search: '',

                headers: [
                    { text: 'Date', value: 'created_at', align: 'left' },
                    { text: 'User', value: 'user', align: 'left', sortable: false},
                    { text: 'Action', value: 'log_name', align: 'left', sortable: false },
                    { text: 'Description', value: 'description', align: 'left', sortable: false }
                ],
                perPage: AppConfig.perPage,

                loader: null,
            }
        },
        mounted() {
            // this.getLogList();
		},
        computed: {
            ...mapGetters('ActivityLog', [
                'activityLogsList', 'pending', 'meta'
            ])
        },
        watch: {
            pagination: {
                handler: function (val, oldVal) {
                    if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
                        this.getLogList();
                    }
                },
                deep: true
            },
            filterBySubjectType: function (value) {
                if (value.length > 0) {
                    this.getLogList();
                }
            },
            filterByLogName: function (value) {
                if (value.length > 0) {
                    this.getLogList();
                }
            },
            filterByUser: function (value) {
                if (value > 0) {
                    this.getLogList();
                }
            }
        },
        methods: {
            ...mapActions('ActivityLog', [
                'list'
            ]),
            goToViewLog(log) {
                this.$router.push({
                    name: 'activityLogShow',
                    params: { activityLogId: log.id }
                });
			},
            clearSearchField () {
                this.search = '';
                this.getLogList();
            },
            clearFilterSubjectType() {
                this.filterBySubjectType = '';
                this.getLogList();
            },
            clearFilterLogName() {
                this.filterByLogName = '';
                this.getLogList();
            },
            clearFilterUser() {
                this.filterByUser = null;
                this.getLogList();
            },
            getLogList() {
                let pagination = this.pagination;

                pagination.filters = {};
                pagination.include = 'user';
                pagination.fieldsets = {
                    "":["description","user","created_at","log_name"],
					user:["name","family"]
                };

                pagination.q = '';
                if (this.search) {
                    pagination.q = this.search;
                }
                if (this.filterBySubjectType.length > 0) {
                    pagination.filters.subject_type = this.filterBySubjectType;
                }
                if (this.filterByLogName.length > 0) {
                    pagination.filters.log_name = this.filterByLogName;
                }
                if (this.filterByUser > 0) {
                    pagination.filters.causer_id = this.filterByUser;
                }

                this.list(HttpHelper.getPaginationParam(pagination)).then(() => {
                    this.items = this.activityLogsList;
                    this.totalItems = this.meta.count;
                });
            },
        }
    }
</script>