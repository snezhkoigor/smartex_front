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
                    type: 'column'
                },
                title: {
                    text: 'Payment systems'
                },
                subtitle: {
                    text: 'favorites payment systems by last month'
                },
                yAxis: {
                    title: {
                        text: ''
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
            'favoritesPaymentSystemsItems', 'favoritesPaymentSystemsPending'
        ])
    },
    watch: {
        period: function (value) {
            this.refresh(value)
        }
    },
    methods: {
        ...mapActions('dashboard', [
            'favoritesPaymentSystemsByLastMonth'
        ]),
        refresh (period) {
            this.$refs.lineCharts.removeSeries()

            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')

            this.favoritesPaymentSystemsByLastMonth(period).then(() => {
                lineCharts.getChart().xAxis[0].setCategories(this.favoritesPaymentSystemsItems.categories)
                lineCharts.addSeries(this.favoritesPaymentSystemsItems.data)
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
