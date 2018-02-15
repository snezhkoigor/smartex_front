<template>
    <div>
        <q-card>
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
                    text: 'Incomes in Exchanges'
                },
                subtitle: {
                    text: 'what currency do users want to buy most in exchanges'
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
            'currenciesOutPaymentsItems', 'currenciesOutPaymentsPending'
        ])
    },
    watch: {
        period: function (value) {
            this.refresh(value)
        }
    },
    methods: {
        ...mapActions('dashboard', [
            'currenciesOutPayments'
        ]),
        refresh (period) {
            this.$refs.lineCharts.removeSeries()

            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')

            this.currenciesOutPayments(period).then(() => {
                lineCharts.getChart().xAxis[0].setCategories(this.currenciesOutPaymentsItems.categories)
                lineCharts.addSeries(this.currenciesOutPaymentsItems.data)
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
