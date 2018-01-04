
<template>
	<div>
		<div class="settings">
			<v-menu bottom class="mr-3">
				<v-btn icon slot="activator">
					<v-icon>mdi-calendar-range</v-icon>
				</v-btn>
				<v-list>
					<v-list-tile v-for="period in periodItems" :key="period.value" @click="setPeriod(period)">
						<v-list-tile-title>{{ period.name }}</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>
			<v-btn icon @click.native="refresh()">
				<v-icon>refresh</v-icon>
			</v-btn>
		</div>
		<div class="chart-box">
			<vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
		</div>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import VueHighcharts from 'vue2-highcharts';

    export default {
        data () {
            return {
                period: {
                    name: 'последняя неделя',
                    value: 'week'
                },
                periodItems: [
					{
					    name: 'последняя неделя',
						value: 'week'
					},
                    {
                        name: 'последние 12 месяцев',
                        value: 'month'
                    },
                    {
                        name: 'за все время',
                        value: 'year'
                    }
				],
                options: {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Регистрации и активации'
                    },
                    subtitle: {
                        text: 'Все регистрации и активации относительно периода'
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
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
            ...mapGetters('Dashboard', [
                'totalRegistrationsAndActivationsItems', 'totalRegistrationsAndActivationsPending'
            ])
        },
        methods: {
            ...mapActions('Dashboard', [
                'totalRegistrationsAndActivations'
            ]),
            refresh() {
                this.$refs.lineCharts.removeSeries();

                let lineCharts = this.$refs.lineCharts;
                lineCharts.delegateMethod('showLoading', 'Загрузка...');

                this.totalRegistrationsAndActivations(this.period.value).then(() => {
					lineCharts.getChart().xAxis[0].setCategories(this.totalRegistrationsAndActivationsItems.categories);
					lineCharts.addSeries(this.totalRegistrationsAndActivationsItems.registrations);
					lineCharts.addSeries(this.totalRegistrationsAndActivationsItems.activations);
					lineCharts.hideLoading();
                }).catch(errors => {
                    lineCharts.hideLoading();
                });
            },
            setPeriod(period) {
				this.period = period;
				this.refresh();
            }
        },
        mounted() {
            this.refresh();
        }
    }
</script>

<style>
	.settings {
		float: right;
	}
</style>