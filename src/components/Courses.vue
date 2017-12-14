<template>
	<div>
		<v-toolbar card color="white" prominent>
			<v-toolbar-title class="page-title body-2 grey--text title-tool-bar">
				{{ this.$router.currentRoute.meta.title }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click.native="getListCourses()">
				<v-icon>refresh</v-icon>
			</v-btn>
		</v-toolbar>

		<v-divider></v-divider>

		<v-card-text>
			<v-card-title>
				<v-dialog
						v-model="courseDateFilterDialog"
						lazy
						full-width
						width="290px"
				>
					<v-text-field
							readonly
							slot="activator"
							label="Filter by date"
							v-model="filters.date"
							prepend-icon="event"
					></v-text-field>
					<v-date-picker v-model="filters.date" autosave>

					</v-date-picker>
				</v-dialog>
				<v-btn icon :disabled="filters.date.length === 0" @click.native="clearDateFilter()">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<v-spacer></v-spacer>
				<v-text-field
						append-icon="search"
						label="Search (btc, btc/usd, etc.)"
						single-line
						hint="Press enter for start search"
						v-on:keyup.enter="getListCourses()"
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
					:rows-per-page-items="perPage"
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
					<tr @click="openEditDialog(props.item)" class="course-tr">
						<td class="text-xs-center">{{ props.item.date | moment('DD.MM.YYYY') }}</td>
						<td class="text-xs-center">{{ props.item.in_currency }}</td>
						<td class="text-xs-center">{{ props.item.out_currency }}</td>
						<td class="text-xs-right">{{ props.item.course }}</td>
					</tr>
				</template>
			</v-data-table>
		</v-card-text>

		<v-layout row justify-center>
			<v-dialog v-model="dialogEdit" max-width="350">
				<v-card>
					<v-card-title class="headline">Change {{this.course.c_in_currency}}/{{this.course.c_out_currency}} course.</v-card-title>
					<v-card-text>
						<v-form ref="courseForm">
							<v-container fluid>
								<v-layout row class="mt-3">
									<v-flex xs12>
										<v-text-field
												label="Course"
												v-model="course.c_course"
												required
												:error-messages="errors && errors.course ? errors.course[0] : []"
												:error="errors && !!errors.course"
										></v-text-field>
									</v-flex>
								</v-layout>
							</v-container>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="red darken-1" flat="flat" @click="clearCourseObject()">
							Close
						</v-btn>
						<v-btn color="green darken-1"
								flat
								@click="saveCourse()"
								:loading="pending"
								:disabled="pending"
						>
							Change
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
    import AppConfig from '../config/app';
    import HttpHelper from "../helpers/http";

    export default {
        data () {
            return {
                pagination: {
                    sortBy: 'date'
                },

				filters: {
                    date: ''
				},

                course: this.defaultCourseObject(),

                search: '',
                totalItems: 0,
                items: [],
                loading: true,
                pagination: {},

                dialogEdit: false,
                courseDateFilterDialog: false,

                errors: [],

                headers: [
                    { text: 'Date', value: 'date' },
                    { text: 'From', value: 'in_currency', align: 'left', },
                    { text: 'To', value: 'out_currency', align: 'left', },
                    { text: 'Course', value: 'course', align: 'left', }
                ],
                perPage: AppConfig.perPage,

                loader: null,
            }
        },
        watch: {
            pagination: {
                handler () {
                    this.getListCourses();
                },
                deep: true
            }
        },
        mounted() {
            this.pagination.descending = true;
            this.getListCourses();
        },
        computed: {
            ...mapGetters('Course', [
                'pending'
            ])
        },
        methods: {
            ...mapActions('Course', [
                'list', 'edit'
            ]),
            clearDateFilter() {
                this.filters.date = '';
                this.getListCourses();
			},
            clearSearchField () {
              	this.search = '';
              	this.getListCourses();
			},
			defaultCourseObject() {
                return {
                    c_id: null,
                    c_in_currency: '',
                    c_out_currency: '',
                    c_date: '',
                    c_course: ''
                }
			},
            clearCourseObject() {
                this.closeAllDialogs();
                this.course = this.defaultCourseObject();
			},
            openEditDialog(courseProps) {
                if (courseProps !== undefined) {
                    this.setCourseObject(courseProps);
                }
                this.dialogEdit = true;
            },
            setCourseObject(courseProps) {
              	this.course = {
                    c_id: courseProps.id,
                    c_in_currency: courseProps.in_currency,
                    c_out_currency: courseProps.out_currency,
                    c_date: courseProps.date,
                    c_course: courseProps.course
				};
			},
			getListCourses() {
                let pagination = this.pagination;

                pagination.filters = this.filters;
                pagination.q = '';
                if (this.search) {
                    pagination.q = this.search;
				}

                this.list(HttpHelper.getPaginationParam(pagination)).then(response => {
                    this.items = response.data.data
                    this.totalItems = response.data.meta.count
                })
			},
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
            },
			closeAllDialogs() {
            	this.dialogEdit = false;
            	this.courseDateFilterDialog = false;
                this.errors = [];
			},
			getDataFromCourseObject() {
                return {
                    id: this.course.c_id,
                    date: this.course.c_date,
                    in_currency: this.course.c_in_currency,
                    out_currency: this.course.c_out_currency,
                    course: this.course.c_course
				}
			},
			saveCourse() {
                if (this.course.c_id) {
                    this.edit(this.getDataFromCourseObject()).then(response => {
                        this.clearCourseObject();
                        this.getListCourses();
                    }).catch(errors => {
                        this.errors = errors;
                    });
				}
			}
        }
    }
</script>

<style>
	.course-tr {
		cursor: pointer;
	}
</style>