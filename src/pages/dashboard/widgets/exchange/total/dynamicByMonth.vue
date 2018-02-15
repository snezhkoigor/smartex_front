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
                    type: 'spline'
                },
                title: {
                    text: 'Exchanges dynamic'
                },
                subtitle: {
                    text: 'users exchanges by last month'
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
        VueHighcharts
    },
    computed: {
        ...mapGetters('dashboard', [
            'exchangesDynamicItems', 'exchangesDynamicPending'
        ])
    },
    watch: {
        period: function (value) {
            this.refresh(value)
        }
    },
    methods: {
        ...mapActions('dashboard', [
            'exchangesDynamic'
        ]),
        refresh (period) {
            this.$refs.lineCharts.removeSeries()

            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')

            this.exchangesDynamic(period).then(() => {
                lineCharts.getChart().xAxis[0].setCategories(this.exchangesDynamicItems.categories)
                lineCharts.addSeries(this.exchangesDynamicItems.finished)
                lineCharts.addSeries(this.exchangesDynamicItems.not)
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
    }
</style>
