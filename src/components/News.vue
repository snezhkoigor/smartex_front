<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title body-2 grey--text title-tool-bar">
				{{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click.native="openAddEditDialog()">
				<v-icon>mdi-playlist-plus</v-icon>
			</v-btn>
			<v-btn icon @click.native="getListNews()">
				<v-icon>refresh</v-icon>
			</v-btn>
		</v-toolbar>

		<v-divider></v-divider>

		<v-card-text>
			<v-card-title>
				<v-spacer></v-spacer>
				<v-text-field
						append-icon="search"
						label="Search by title"
						single-line
						hint="Press enter for start search"
						v-on:keyup.enter="getListNews()"
						v-model="search"
				></v-text-field>
				<v-btn icon :disabled="search.length === 0" @click.native="clearSearchField()">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-data-table
				v-bind:headers="headers"
				v-bind:items="items"
				v-bind:pagination.sync="pagination"
				:total-items="totalItems"
				:loading="pending"
				class="elevation-0"
			>
				<template slot="headers" slot-scope="props">
					<tr>
						<th v-for="header in props.headers" :key="header.text"
								:class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
								@click="changeSort(header.value)"
						>
							<v-icon>arrow_upward</v-icon>
							{{ header.text }}
						</th>
					</tr>
				</template>
				<template slot="items" slot-scope="props">
					<tr :class="{'': props.item.active, 'red lighten-3': !props.item.active}"
						class="news-table-list"
					>
						<td class="text-xs-center news-table-list-data">{{ props.item.date | moment('DD.MM.YYYY') }}</td>
						<td class="news-table-list-data">{{ props.item.title | truncate(100) }}</td>
						<td class="text-lg-right news-table-list-actions">
							<v-menu offset-y>
								<v-btn flat slot="activator">actions</v-btn>
								<v-list>
									<v-list-tile @click="openAddEditDialog(props.item)">
										<v-list-tile-title>edit</v-list-tile-title>
									</v-list-tile>
									<v-list-tile @click="openDeleteDialog(props.item)">
										<v-list-tile-title>delete</v-list-tile-title>
									</v-list-tile>
								</v-list>
							</v-menu>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card-text>

		<v-layout row justify-center>
			<v-dialog v-model="dialogDelete" max-width="290">
				<v-card>
					<v-card-title class="headline">Delete this news?</v-card-title>
					<v-card-text>Are you sure that you want to delete the news '{{this.news.c_title | truncate(50)}}'?</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="red darken-1" flat="flat" @click="clearNewsObject()">
							Disagree
						</v-btn>
						<v-btn color="green darken-1"
								flat
								@click="deleteNews()"
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
			<v-dialog v-model="dialogAddEdit" fullscreen transition="dialog-bottom-transition" :overlay=false>
				<v-card color="grey lighten-5">
					<v-toolbar dark color="teal lighten-1">
						<v-btn icon @click="clearNewsObject()" dark>
							<v-icon>close</v-icon>
						</v-btn>
						<v-toolbar-title>
							<span v-if="news.c_id">Edit news</span>
							<span v-else>Add news</span>
						</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-toolbar-items>
							<v-btn dark
									flat
									@click="saveNews()"
									:loading="pending"
									:disabled="pending"
							>
								<span v-if="news.c_id">Edit</span>
								<span v-else>Add</span>
								<span slot="loader">Sending...</span>
							</v-btn>
						</v-toolbar-items>
					</v-toolbar>

					<v-form ref="newsForm">
						<v-container fluid>
							<v-layout row>
								<v-flex xs12 style="padding-left: 30px">
									<froala
											:tag="'textarea'"
											:config="froalaConfig"
											v-model="news.c_text"
											required
											:error-messages="errors && errors.text ? errors.text[0] : []"
											:error="errors && !!errors.text"
									></froala>
								</v-flex>
							</v-layout>
							<v-layout row class="mt-3">
								<v-flex xs12>
									<v-text-field
											label="Title"
											v-model="news.c_title"
											required
											counter="255"
											:error-messages="errors && errors.title ? errors.title[0] : []"
											:error="errors && !!errors.title"
									></v-text-field>
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-text-field
											label="Meta key"
											v-model="news.c_meta_key"
											counter="255"
											:error-messages="errors && errors.meta_key ? errors.meta_key : []"
											:error="errors && !!errors.meta_key"
									></v-text-field>
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-text-field
											label="Meta description"
											v-model="news.c_meta_description"
											counter="255"
											:error-messages="errors && errors.meta_description ? errors.meta_description : []"
											:error="errors && !!errors.meta_description"
									></v-text-field>
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-dialog
											v-model="newsDateDialog"
											lazy
											full-width
											width="290px"
									>
										<v-text-field
												slot="activator"
												label="News date"
												v-model="news.c_date"
												prepend-icon="event"
												readonly
												:error-messages="errors && errors.date ? errors.date : []"
												:error="errors && !!errors.date"
										></v-text-field>
										<v-date-picker v-model="news.c_date" autosave/>
									</v-dialog>
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12 class="mt-3">
									<v-checkbox
											label="Will news be active?"
											v-model="news.c_active"
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
                pagination: {
                    sortBy: 'date'
                },

                news: this.defaultNewsObject(),

                search: '',
                totalItems: 0,
                items: [],
                loading: true,
                pagination: {},

                newsDateDialog: false,
                dialogAddEdit: false,
                dialogDelete: false,

                errors: [],

                headers: [
                    { text: 'Date', value: 'date' },
                    { text: 'Title', value: 'title', align: 'left', }
                ],

				froalaConfig: AppConfig.froala,

                loader: null,
            }
        },
        watch: {
            pagination: {
                handler () {
                    this.getListNews();
                },
                deep: true
            }
        },
        mounted() {
            this.pagination.descending = true;
            this.getListNews();
        },
        computed: {
            ...mapGetters('News', [
                'pending'
            ])
        },
        methods: {
            ...mapActions('News', [
                'list', 'add', 'edit', 'delete'
            ]),
            clearSearchField () {
              	this.search = '';
              	this.getListNews();
			},
			currentDate() {
                return new Date().toISOString().slice(0, 10);
			},
			defaultNewsObject() {
                return {
                    c_id: null,
                    c_title: '',
                    c_meta_key: '',
                    c_meta_description: '',
                    c_text: '',
                    c_date: this.currentDate(),
                    c_active: true,
                }
			},
            clearNewsObject() {
                this.closeAllDialogs();
                this.news = this.defaultNewsObject();
			},
            openDeleteDialog(newsProps) {
                if (newsProps !== undefined) {
                    this.setNewsObject(newsProps);
                }
                this.dialogDelete = true;
            },
            openAddEditDialog(newsProps) {
                if (newsProps !== undefined) {
                    this.setNewsObject(newsProps);
				}
                this.dialogAddEdit = true;
			},
            setNewsObject(newsProps) {
              	this.news = {
                    c_id: newsProps.id,
                    c_title: newsProps.title,
                    c_meta_key: newsProps.meta_key,
                    c_meta_description: newsProps.meta_description,
                    c_text: newsProps.text,
                    c_date: newsProps.date,
                    c_active: newsProps.active,
				};
			},
			getListNews() {
                let pagination = this.pagination;

                pagination.q = '';
                if (this.search) {
                    pagination.q = this.search;
				}

                this.list(HttpHelper.getPaginationParam(pagination)).then(response => {
                    this.items = response.data.data
                    this.totalItems = response.data.meta.count
                })
			},
            changeSort (column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
            },
			closeAllDialogs() {
            	this.newsDateDialog = false;
                this.dialogAddEdit = false;
                this.dialogDelete = false;
                this.errors = [];
			},
			getDataFromNewsObject() {
                return {
                    id: this.news.c_id,
                    title: this.news.c_title,
                    meta_key: this.news.c_meta_key,
                    meta_description: this.news.c_meta_description,
                    text: this.news.c_text,
                    date: this.news.c_date,
                    active: this.news.c_active
				}
			},
			deleteNews() {
				this.delete(this.getDataFromNewsObject()).then(response => {
                    this.clearNewsObject();
                    this.getListNews();
                }).catch(errors => {
                    this.errors = errors;
                });
			},
			saveNews() {
                if (this.news.c_id) {
                    this.edit(this.getDataFromNewsObject()).then(response => {
                        this.clearNewsObject();
                        this.getListNews();
                    }).catch(errors => {
                        this.errors = errors;
                    });
				} else {
                    this.add(this.getDataFromNewsObject()).then(response => {
                        this.clearNewsObject();
                        this.getListNews();
                    }).catch(errors => {
                        this.errors = errors;
                    });
				}
			}
        }
    }
</script>

<style>
	.news-table-list-actions button {

	}
</style>