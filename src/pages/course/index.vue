<template>
    <div class="courses">
        <q-card-title>
            {{ this.$router.currentRoute.meta.title }}
            <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
            <span slot="right">
                <q-btn flat
                       @click="getListCourses()"
                       :disable="pending"
                >
                    <q-icon name="refresh" />
                </q-btn>
            </span>
        </q-card-title>
        <q-card-main>
            <div class="row">
                <div class="col-12">
                    <q-search v-on:keyup.enter="getListCourses()"
                              v-model="search"
                              :disable="pending"
                              placeholder="Search (btc, btc/usd, etc.)"
                              suffix="Press enter for start search"
                    />
                </div>
            </div>
            <div class="row courses-table">
                <div class="col-12">
                    <q-data-table
                            :data="items"
                            :columns="columns"
                    >
                        <!-- Custom renderer for "action" column with button for custom action -->
                        <template slot="col-action" scope="cell">
                            <q-btn flat @click="openEditDialog(cell.row)">
                                <q-icon name="edit" />
                            </q-btn>
                        </template>
                    </q-data-table>
                </div>
            </div>
        </q-card-main>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HttpHelper from '../../helpers/http'

export default {
    data () {
        return {
            pagination: {
                orderBy: 'date',
                descending: true
            },

            filters: {
                date: ''
            },

            search: '',
            totalItems: 0,
            items: [],
            loading: true,

            errors: [],

            columns: [
                { label: 'Date', field: 'date', sort: false },
                { label: 'From', field: 'in_currency', type: 'string' },
                { label: 'To', field: 'out_currency', type: 'string' },
                { label: 'Course', field: 'course', type: 'double' },
                { label: '', field: 'action' }
            ],

            loader: null
        }
    },
    watch: {
        pagination: {
            handler: function (val, oldVal) {
                if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
                    this.getListCourses()
                }
            },
            deep: true
        },
        search: function (val) {
            if (val === '') {
                this.getListCourses()
            }
        }
    },
    mounted () {
        this.getListCourses()
    },
    computed: {
        ...mapGetters('Course', [
            'pending', 'courses', 'meta'
        ])
    },
    methods: {
        ...mapActions('Course', [
            'list', 'edit'
        ]),
        clearDateFilter () {
            this.filters.date = ''
            this.getListCourses()
        },
        clearSearchField () {
            this.search = ''
            this.getListCourses()
        },
        openEditDialog (course) {
            // let self = this
            // let editCourse = course

            // Dialog.create({
            //     title: 'Change course ' + course.in_currency + '/' + course.out_currency,
            //     form: {
            //         course: {
            //             type: 'text',
            //             label: 'Course',
            //             model: editCourse.course
            //         }
            //     },
            //     buttons: [
            //         {
            //             label: 'Cancel',
            //             handler () {}
            //         },
            //         {
            //             label: 'Save',
            //             handler (data) {
            //                 editCourse.course = data.course
            //                 self.saveCourse(editCourse)
            //             }
            //         }
            //     ]
            // })
        },
        getListCourses () {
            let pagination = this.pagination

            pagination.filters = this.filters
            pagination.q = ''
            if (this.search) {
                pagination.q = this.search
            }

            this.list(HttpHelper.getPaginationParam(pagination)).then(response => {
                this.items = this.courses
                this.totalItems = this.meta.count ? this.meta.count : 0
            }).catch(errors => {
                this.errors = errors.errors
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
        closeAllDialogs () {
            this.dialogEdit = false
            this.courseDateFilterDialog = false
            this.errors = []
        },
        saveCourse (course) {
            this.edit(course).then(response => {
                this.getListCourses()
            }).catch(errors => {
                this.errors = errors.errors
            })
        }
    }
}
</script>

<style>
    .courses-table {
        margin-top: 50px;
    }
</style>
