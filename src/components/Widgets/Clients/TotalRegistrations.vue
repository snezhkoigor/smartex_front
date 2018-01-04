<template>
	<div>
		<div class="settings">
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
                options: {
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45
                        }
                    },
                    title: {
                        text: 'Все регистрации'
                    },
                    subtitle: {
                        text: 'Все регистрации пользователей относительно стран'
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
            ...mapGetters('Dashboard', [
                'totalRegistrationsItems', 'totalRegistrationPending'
            ])
        },
		methods: {
			...mapActions('Dashboard', [
				'totalRegistrations'
			]),
            refresh() {
                this.$refs.lineCharts.removeSeries();

                let lineCharts = this.$refs.lineCharts;
                lineCharts.delegateMethod('showLoading', 'Загрузка...');

                this.totalRegistrations().then(() => {
                    lineCharts.addSeries(this.totalRegistrationsItems);
                    lineCharts.hideLoading();
				}).catch(errors => {
                    lineCharts.hideLoading();
				});
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