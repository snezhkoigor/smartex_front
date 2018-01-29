<template>
    <div class="courses">
        <q-card-title>
            {{ this.$router.currentRoute.meta.title }}
            <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
            <span slot="right">
                <q-btn round flat
                       @click="getListNews()"
                       :disable="pending"
                >
                    <q-icon name="refresh" />
                </q-btn>
                <q-btn round flat
                       @click="goToAddNews()"
                       :disable="pending"
                >
                    <q-icon name="add" />
                </q-btn>
            </span>
        </q-card-title>
        <q-card-main>
            <!--<v-toolbar card color="white" prominent>-->
                <!--<v-toolbar-title class="page-title title grey&#45;&#45;text title-tool-bar">-->
                    <!--{{ this.$router.currentRoute.meta.title }}-->
                <!--</v-toolbar-title>-->
                <!--<v-spacer />-->
                <!--<v-btn icon @click.native="goToAddNews()">-->
                    <!--<v-icon>mdi-playlist-plus</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn icon @click.native="getListNews()">-->
                    <!--<v-icon>refresh</v-icon>-->
                <!--</v-btn>-->
            <!--</v-toolbar>-->
    <!---->
            <!--<v-progress-linear class="pending" v-if="pending" v-bind:indeterminate="pending" />-->
    <!---->
            <!--<v-divider />-->
    <!---->
            <!--<v-card-text>-->
                <!--<v-layout row-md wrap>-->
                    <!--<v-flex xs12 >-->
                        <!--<v-text-field-->
                                <!--append-icon="search"-->
                                <!--label="Search by title"-->
                                <!--hint="Press enter for start search"-->
                                <!--v-on:keyup.enter="getListNews()"-->
                                <!--v-model="search"-->
                                <!--:disabled="pending"-->
                        <!--&gt;</v-text-field>-->
                        <!--<v-btn class="clear-filter-button" flat small :disabled="search.length === 0" @click.native="clearSearchField()">-->
                            <!--clear-->
                        <!--</v-btn>-->
                    <!--</v-flex>-->
                <!--</v-layout>-->
                <!--<v-data-table-->
                        <!--v-bind:headers="headers"-->
                        <!--v-bind:items="items"-->
                        <!--v-bind:pagination.sync="pagination"-->
                        <!--:total-items="totalItems"-->
                        <!--:rows-per-page-items="perPage"-->
                        <!--class="elevation-0 mt-5"-->
                        <!--must-sort-->
                <!--&gt;-->
                    <!--<template slot="items" slot-scope="props">-->
                        <!--<tr :class="{'': props.item.active, 'red lighten-3': !props.item.active}"-->
                            <!--class="news-table-list"-->
                        <!--&gt;-->
                            <!--<td class="text-xs-center table-list-data" @click="goToEditNews(props.item)">{{ props.item.date | moment('DD.MM.YYYY') }}</td>-->
                            <!--<td class="table-list-data" @click="goToEditNews(props.item)">{{ props.item.title | truncate(100) }}</td>-->
                            <!--<td class="text-lg-center table-list-actions">-->
                                <!--<v-btn flat icon color="red darken-1" @click="openDeleteDialog(props.item)">-->
                                    <!--<v-icon>mdi-delete</v-icon>-->
                                <!--</v-btn>-->
                            <!--</td>-->
                        <!--</tr>-->
                    <!--</template>-->
                <!--</v-data-table>-->
            <!--</v-card-text>-->
    <!---->
            <!--<v-layout row justify-center>-->
                <!--<v-dialog v-model="dialogDelete" max-width="290" v-if="this.news.title">-->
                    <!--<v-card>-->
                        <!--<v-card-title class="headline">Delete this news?</v-card-title>-->
                        <!--<v-card-text>Are you sure that you want to delete the news '{{this.news.title | truncate(50)}}'?</v-card-text>-->
                        <!--<v-card-actions>-->
                            <!--<v-spacer></v-spacer>-->
                            <!--<v-btn color="red darken-1" flat="flat" @click="closeDeleteDialog()">-->
                                <!--Disagree-->
                            <!--</v-btn>-->
                            <!--<v-btn color="green darken-1"-->
                                   <!--flat-->
                                   <!--@click="deleteNews()"-->
                                   <!--:loading="pending"-->
                                   <!--:disabled="pending"-->
                            <!--&gt;-->
                                <!--Agree-->
                                <!--<span slot="loader">Sending...</span>-->
                            <!--</v-btn>-->
                        <!--</v-card-actions>-->
                    <!--</v-card>-->
                <!--</v-dialog>-->
            <!--</v-layout>-->
        </q-card-main>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppConfig from '../../config/app'
import HttpHelper from '../../helpers/http'

export default {
    data () {
        return {
            pagination: {
                sortBy: 'date',
                descending: true
            },

            news: {},

            search: '',
            totalItems: 0,
            items: [],
            loading: true,

            newsDateDialog: false,
            dialogDelete: false,

            errors: [],

            headers: [
                { text: 'Date', value: 'date' },
                { text: 'Title', value: 'title', align: 'left' }
            ],
            perPage: AppConfig.perPage,

            loader: null
        }
    },
    watch: {
        pagination: {
            handler: function (val, oldVal) {
                console.log(oldVal)
                console.log(val)
                if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
                    this.getListNews()
                }
            },
            deep: true
        }
    },
    mounted () {
        // this.pagination.descending = true
    },
    computed: {
        ...mapGetters('News', [
            'pending', 'newsList', 'meta'
        ])
    },
    methods: {
        ...mapActions('News', [
            'list', 'remove'
        ]),
        goToAddNews () {
            this.$router.push({
                name: 'newsAdd'
            })
        },
        goToEditNews (news) {
            this.$router.push({
                name: 'newsEdit',
                params: { newsId: news.id }
            })
        },
        clearSearchField () {
            this.search = ''
            this.getListNews()
        },
        openDeleteDialog (news) {
            this.news = news
            this.dialogDelete = true
        },
        getListNews () {
            let pagination = this.pagination

            pagination.q = ''
            if (this.search) {
                pagination.q = this.search
            }

            this.list(HttpHelper.getPaginationParam(pagination)).then(response => {
                this.items = this.newsList
                this.totalItems = this.meta.count ? this.meta.count : 0
                this.needCallListMethod = false
            }).catch(errors => {
                this.errors = errors
            })
        },
        closeDeleteDialog () {
            this.dialogDelete = false
            this.news = {}
        },
        deleteNews () {
            this.remove(this.news.id).then(response => {
                this.closeDeleteDialog()
                this.getListNews()
            }).catch(errors => {
                this.errors = errors
            })
        }
    }
}
</script>

<style>
</style>
