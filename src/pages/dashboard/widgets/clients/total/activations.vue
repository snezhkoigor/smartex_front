<template>
    <div>
        <q-card class="shadow-0">
            <q-card-title>
            </q-card-title>
            <q-card-main>
                <div class="settings">
                    <q-select :options="periodItems" v-model="period" style="width: 80px"/>
                </div>
                <div class="chart-box">
                    <vue-highcharts :options="options" ref="lineCharts" />
                </div>
            </q-card-main>
        </q-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { QSelect } from 'quasar'
import VueHighcharts from 'vue2-highcharts'

export default {
    data () {
        return {
            period: 'week',
            periodItems: [
                {
                    label: '7 days',
                    value: 'week'
                },
                {
                    label: '12 months',
                    value: 'month'
                },
                {
                    label: 'all',
                    value: 'year'
                }
            ],
            options: {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Registrations and activations'
                },
                subtitle: {
                    text: 'All registrations and activations by periods'
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                credits: {
                    enabled: false
                },
                series: []
            }
        }
    },
    components: {
        VueHighcharts,
        QSelect
    },
    computed: {
        ...mapGetters('dashboard', [
            'totalRegistrationsAndActivationsItems', 'totalRegistrationsAndActivationsPending'
        ])
    },
    watch: {
        period: function (value) {
            this.refresh(value)
        }
    },
    methods: {
        ...mapActions('dashboard', [
            'totalRegistrationsAndActivations'
        ]),
        refresh (period) {
            this.$refs.lineCharts.removeSeries()

            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')

            this.totalRegistrationsAndActivations(period).then(() => {
                lineCharts.getChart().xAxis[0].setCategories(this.totalRegistrationsAndActivationsItems.categories)
                lineCharts.addSeries(this.totalRegistrationsAndActivationsItems.registrations)
                lineCharts.addSeries(this.totalRegistrationsAndActivationsItems.activations)
                lineCharts.hideLoading()
            }).catch(errors => {
                lineCharts.hideLoading()
            })
        }
    },
    mounted () {
        this.refresh(this.period)
    }
}
</script>

<style scoped>
    .settings {
        position: absolute;
        z-index: 111111;
        margin-top: -20px;
    }
</style>
