<template>
    <div class="dashboard">
        <q-card-title>
            {{ this.$router.currentRoute.meta.title }}
            <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
        </q-card-title>
        <br />
        <q-card-main>
            <!-- if you want automatic padding use "layout-padding" class -->
            <div class="pull-left">
                <div class="row gutter-sm">
                    <div class="col-sm-4">
                        <total-new-exchanges-component />
                    </div>
                    <div class="col-sm-4">
                        <total-started-exchanges-component />
                    </div>
                    <div class="col-sm-4">
                        <total-finished-exchanges-component />
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div class="row gutter-sm">
                    <div class="col-sm-6">
                        <currencies-out-payments-component />
                    </div>
                    <div class="col-sm-6">
                        <currencies-in-payments-component />
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div class="row gutter-sm">
                    <div class="col-sm-12">
                        <favorites-payment-systems-by-last-month-component />
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div class="row gutter-sm">
                    <div class="col-sm-12">
                        <exchanges-dynamic-by-last-month-component />
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div class="row gutter-sm">
                    <div class="col-sm-6">
                        <activations-component />
                    </div>
                    <div class="col-sm-6">
                        <registrations-component />
                    </div>
                </div>
            </div>
        </q-card-main>
    </div>
</template>

<script>
import ActivationsComponent from './widgets/clients/total/activations'
import RegistrationsComponent from './widgets/clients/total/registrations'
import TotalFinishedExchangesComponent from './widgets/exchange/total/finished'
import TotalNewExchangesComponent from './widgets/exchange/total/new'
import TotalStartedExchangesComponent from './widgets/exchange/total/started'
import CurrenciesInPaymentsComponent from './widgets/payment/currenciesInIncomes'
import CurrenciesOutPaymentsComponent from './widgets/payment/currenciesOutIncomes'
import FavoritesPaymentSystemsByLastMonthComponent from './widgets/paymentSystem/favoritesByLastMonth'
import ExchangesDynamicByLastMonthComponent from './widgets/exchange/total/dynamicByMonth'

export default {
    name: 'PageDashboard',
    components: {
        ActivationsComponent,
        RegistrationsComponent,
        TotalFinishedExchangesComponent,
        TotalNewExchangesComponent,
        TotalStartedExchangesComponent,
        CurrenciesInPaymentsComponent,
        CurrenciesOutPaymentsComponent,
        FavoritesPaymentSystemsByLastMonthComponent,
        ExchangesDynamicByLastMonthComponent
    },
    data () {
        return {}
    }
}
</script>

<style scoped>
</style>
