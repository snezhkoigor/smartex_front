<template>
    <div class="news">
        <inner-loading-layout :pending="pending"></inner-loading-layout>
        <div v-show="!pending">
            <q-card-title>
                <router-link class="breadcrumbs-link" :to="{ name: 'newsList'}">News</router-link> / {{ this.$router.currentRoute.meta.title }}
                <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
                <span slot="right">
                    <q-btn flat
                           class="full-width"
                           @click="newsAdd()"
                           :disable="pending"
                    >
                        Add
                    </q-btn>
                </span>
            </q-card-title>
            <q-card-main>
                <div class="gutter-sm">
                    <div class="row gutter-y-sm">
                        <div class="col-12">
                            <q-field :error-label="errors && errors.text ? errors.text[0] : ''"
                                     :error="errors && !!errors.text"
                            >
                                <q-editor
                                    v-model="newsItem.text"
                                    :toolbar="[
                                        ['undo', 'redo'],
                                        ['bold', 'italic', 'underline'],
                                        ['hr', 'link', 'custom_btn'],
                                        ['print', 'fullscreen'],
                                        [
                                            'removeFormat'
                                        ],
                                        [
                                            {
                                                label: this.$q.i18n.editor.align,
                                                icon: this.$q.icon.editor.align,
                                                fixedLabel: true,
                                                options: ['left', 'center', 'right', 'justify']
                                            }
                                        ]
                                    ]"
                                >
                                    <q-btn
                                        slot="insert_img"
                                        dense
                                        color="secondary"
                                        icon="image"
                                        label="Image"
                                        @click="importImage"
                                    />
                                </q-editor>
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-sm">
                        <div class="col-12 col-sm-8 col-md-8">
                            <q-field :error-label="errors && errors.title ? errors.title[0] : ''"
                                     :error="errors && !!errors.title"
                            >
                                <q-input v-model="newsItem.title"
                                         float-label="Title *"
                                         :disable="pending"
                                />
                            </q-field>
                        </div>
                        <div class="col-12 col-sm-4 col-md-4">
                            <q-field
                                    :error-label="errors && errors.lang ? errors.lang[0] : ''"
                                    :error="errors && !!errors.lang"
                            >
                                <q-select
                                        v-model="newsItem.lang"
                                        float-label="Language"
                                        :options="languageOptions"
                                        :disable="pending"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-y-sm">
                        <div class="col-12">
                            <q-field :error-label="errors && errors.meta_key ? errors.meta_key[0] : ''"
                                     :error="errors && !!errors.meta_key"
                            >
                                <q-input v-model="newsItem.meta_key"
                                         float-label="Meta key"
                                         :disable="pending"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-y-sm">
                        <div class="col-12">
                            <q-field :error-label="errors && errors.meta_description ? errors.meta_description[0] : ''"
                                     :error="errors && !!errors.meta_description"
                            >
                                <q-input v-model="newsItem.meta_description"
                                         float-label="Meta description"
                                         :disable="pending"
                                />
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-y-sm">
                        <div class="col-12">
                            <q-field :error-label="errors && errors.date ? errors.date[0] : ''"
                                     :error="errors && !!errors.date"
                            >
                                <q-datetime v-model="newsItem.date"
                                            type="date"
                                            float-label="News date" />
                            </q-field>
                        </div>
                    </div>
                    <div class="row gutter-y-sm">
                        <div class="col-12 active-checkbox">
                            <q-checkbox v-model="newsItem.active" label="Will news be active?" />
                        </div>
                    </div>
                </div>
            </q-card-main>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { QField, QInput, QCheckbox, QDatetime, QEditor, QSelect } from 'quasar'
import InnerLoadingLayout from '../../layouts/InnerLoading'

export default {
    name: 'NewsAddPage',
    components: {
        QField,
        QInput,
        QCheckbox,
        QDatetime,
        QEditor,
        InnerLoadingLayout,
        QSelect
    },
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
            errors: [],
            languageOptions: []
        }
    },
    mounted () {
        this.getFormMeta().then(() => {
            this.languageOptions = this.meta.languages
        })
    },
    computed: {
        ...mapGetters('news', [
            'pending', 'meta'
        ])
    },
    methods: {
        ...mapActions('news', [
            'add', 'getFormMeta'
        ]),
        importImage () {

        },
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

<style scoped>
</style>
