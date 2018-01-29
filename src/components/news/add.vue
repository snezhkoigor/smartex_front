<template>
    <div>
        <v-toolbar card color="white" prominent>
            <v-toolbar-title class="page-title title grey--text title-tool-bar">
                <router-link class="breadcrumbs-link" :to="{ name: 'newsList'}">News</router-link> / {{ this.$router.currentRoute.meta.title }}
            </v-toolbar-title>
            <v-spacer />
            <v-btn
                    flat
                    @click="newsAdd()"
                    :loading="pending"
                    :disabled="pending"
            >
                <span>Add</span>
                <span slot="loader">Sending...</span>
            </v-btn>
        </v-toolbar>

        <v-progress-linear class="pending" v-if="pending" v-bind:indeterminate="pending" />

        <v-divider />

        <v-container>
            <v-form ref="newsForm">
                <v-container fluid>
                    <v-layout row>
                        <v-flex xs12 style="padding-left: 30px">
                            <froala
                                    :tag="'textarea'"
                                    :config="froalaConfig"
                                    v-model="newsItem.text"
                                    required
                                    :disabled="pending"
                                    :error-messages="errors && errors.text ? errors.text[0] : []"
                                    :error="errors && !!errors.text"
                            ></froala>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-3">
                        <v-flex xs12>
                            <v-text-field
                                    label="Title"
                                    v-model="newsItem.title"
                                    required
                                    counter="255"
                                    :disabled="pending"
                                    :error-messages="errors && errors.title ? errors.title[0] : []"
                                    :error="errors && !!errors.title"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                    label="Meta key"
                                    v-model="newsItem.meta_key"
                                    counter="255"
                                    :disabled="pending"
                                    :error-messages="errors && errors.meta_key ? errors.meta_key[0] : []"
                                    :error="errors && !!errors.meta_key"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                    label="Meta description"
                                    v-model="newsItem.meta_description"
                                    counter="255"
                                    :disabled="pending"
                                    :error-messages="errors && errors.meta_description ? errors.meta_description[0] : []"
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
                                        v-model="newsItem.date"
                                        prepend-icon="event"
                                        readonly
                                        :disabled="pending"
                                        :error-messages="errors && errors.date ? errors.date[0] : []"
                                        :error="errors && !!errors.date"
                                ></v-text-field>
                                <v-date-picker v-model="newsItem.date" autosave/>
                            </v-dialog>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 class="mt-3">
                            <v-checkbox
                                    label="Will news be active?"
                                    v-model="newsItem.active"
                                    :disabled="pending"
                                    light
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>
        </v-container>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import AppConfig from '../../config/app'

    export default {
        data () {
            return {
                newsItem: {
                    id: null,
                    title: '',
                    meta_key: '',
                    meta_description: '',
                    text: '',
                    date: new Date().toISOString().slice(0, 10),
                    active: true
                },

                newsDateDialog: false,
                errors: [],
                froalaConfig: AppConfig.froala,
                loader: null
            }
        },
        computed: {
            ...mapGetters('News', [
                'pending'
            ])
        },

        methods: {
            ...mapActions('News', [
                'add'
            ]),
            newsAdd () {
                this.add(this.newsItem).then(response => {
                    this.$router.push({
                        name: 'newsList'
                    })
                }).catch(errors => {
                    this.errors = errors
                })
            }
        }
    }
</script>