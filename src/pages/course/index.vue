<template>
    <div class="courses">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <div v-show="!pending">
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
                <div class="gutter-sm">
                    <div class="row gutter-sm">
                        <div class="col-12">
                            <q-search v-on:keyup.enter="getListCourses()"
                                      v-model="search"
                                      :disable="pending"
                                      placeholder="Search (btc, btc/usd, etc.)"
                                      suffix="Press enter for start search"
                            />
                        </div>
                    </div>
                </div>
                <div class="row courses-table">
                    <div class="col-12">
                        <q-table
                                class="shadow-1"
                                :data="items"
                                :columns="columns"
                                row-key="name"
                                :pagination.sync="serverPagination"
                                @request="getListCourses"
                        >
                            <q-td slot="body-cell-date" slot-scope="props" :props="props">
                                {{props.value | moment('DD.MM.YYYY, h:mm')}}
                            </q-td>
                            <q-td slot="body-cell-action" slot-scope="props" :props="props">
                                <q-btn flat icon="edit" @click="openEditDialog(props.row)" />
                            </q-td>
                        </q-table>
                    </div>
                </div>
            </q-card-main>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { QSearch, QTable, QTd, QOptionGroup, QInput, QField } from 'quasar'
import InnerLoadingLayout from '../../layouts/InnerLoading'

import tableConfig from '../../config/table'
import HttpHelper from '../../helpers/http'

export default {
    name: 'CoursesListPage',
    components: {
        QSearch,
        QTable,
        QTd,
        InnerLoadingLayout,
        QOptionGroup,
        QInput,
        QField
    },
    data () {
        return {
            serverPagination: this.getDefaultPagination(),
            search: '',
            items: [],
            errors: [],
            columns: [
                {
                    name: 'date',
                    label: 'Date',
                    field: 'date',
                    sort: false
                },
                {
                    name: 'in_currency',
                    label: 'From',
                    field: 'in_currency',
                    type: 'string'
                },
                {
                    name: 'out_currency',
                    label: 'To',
                    field: 'out_currency',
                    type: 'string'
                },
                {
                    name: 'course',
                    label: 'Course',
                    field: 'course',
                    type: 'double'
                },
                {
                    name: 'action',
                    label: '',
                    field: 'action'
                }
            ]
        }
    },
    watch: {
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
        ...mapGetters('course', [
            'pending', 'courses', 'meta'
        ])
    },
    methods: {
        ...mapActions('course', [
            'list', 'edit'
        ]),
        getDefaultPagination () {
            return {
                q: '',
                filters: {
                    date: ''
                },
                orderBy: 'date',
                descending: true,
                page: 1,
                rowsPerPage: tableConfig.perPage,
                rowsNumber: tableConfig.rowsNumber
            }
        },
        applyPaginationFromTable (pagination, props) {
            if (props) {
                let { page, rowsPerPage, sortBy, descending } = props.pagination
                pagination.page = page
                pagination.rowsPerPage = rowsPerPage
                pagination.sortBy = sortBy
                pagination.descending = descending
            }

            return pagination
        },
        clearDateFilter () {
            this.filters.date = ''
            this.getListCourses()
        },
        clearSearchField () {
            this.search = ''
            this.getListCourses()
        },
        openEditDialog (course) {
            let editCourse = course

            this.$q.dialog({
                title: 'Change course ' + course.in_currency + '/' + course.out_currency,
                message: '',
                prompt: {
                    model: editCourse.course,
                    type: 'text'
                },
                cancel: true,
                preventClose: true,
                color: 'secondary'
            }).then(data => {
                editCourse.course = data
                this.saveCourse(editCourse)
            }).catch(() => {
                console.log('>>>> Cancel')
            })
        },
        getListCourses (props) {
            let requestOptions = this.getDefaultPagination()
            if (props) {
                requestOptions = this.applyPaginationFromTable(requestOptions, props)
            }

            requestOptions.filters = this.filters
            requestOptions.q = ''
            if (this.search) {
                requestOptions.q = this.search
            }

            this.list(HttpHelper.getPaginationParam(requestOptions)).then(response => {
                this.items = this.courses
                this.serverPagination = requestOptions
                this.serverPagination.rowsNumber = this.meta.count
            }).catch(errors => {
                this.errors = errors.errors
            })
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

<style scoped>
    .courses-table {
        margin-top: 50px;
    }
</style>
