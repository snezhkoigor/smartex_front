<template>
    <div>
        <q-card class="shadow-1">
            <q-card-title>
            </q-card-title>
            <q-card-main>
                <div class="chart-box">
                    <vue-highcharts :options="options" ref="lineCharts" />
                </div>
            </q-card-main>
        </q-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueHighcharts from 'vue2-highcharts'

export default {
    data () {
        return {
            options: {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: 'Total registrations'
                },
                subtitle: {
                    text: 'All client registrations by countries'
                },
                plotOptions: {
                    pie: {
                        innerSize: 30,
                        depth: 25
                    }
                },
                credits: {
                    enabled: false
                },
                series: []
            }
        }
    },
    components: {
        VueHighcharts
    },
    computed: {
        ...mapGetters('dashboard', [
            'totalRegistrationsItems', 'totalRegistrationPending'
        ])
    },
    methods: {
        ...mapActions('dashboard', [
            'totalRegistrations'
        ]),
        refresh () {
            this.$refs.lineCharts.removeSeries()

            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')

            this.totalRegistrations().then(() => {
                lineCharts.addSeries(this.totalRegistrationsItems)
                lineCharts.hideLoading()
            }).catch(errors => {
                lineCharts.hideLoading()
            })
        }
    },
    mounted () {
        this.refresh()
    }
}
</script>

<style scoped>
    .settings {
        float: right
    }
</style>
