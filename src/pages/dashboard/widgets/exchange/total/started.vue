<template>
    <div>
        <q-card color="secondary">
            <q-card-title>
                <span class="q-headline">
                    Started exchanges:
                </span>
            </q-card-title>
            <q-card-main>
                <span class="q-caption">total:</span> <span class="q-headline">{{totalFinishedInPaymentsItems.all}}</span>, <span class="q-caption">has income:</span> <span class="q-headline">{{totalFinishedInPaymentsItems.finished}}</span>, <span class="q-caption">conv:</span> <span class="q-headline">{{totalFinishedInPaymentsItems.conversion}}%</span>
            </q-card-main>
        </q-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {}
    },
    components: {},
    computed: {
        ...mapGetters('dashboard', [
            'totalFinishedInPaymentsItems', 'totalFinishedInPaymentsPending'
        ])
    },
    watch: {
        period: function (value) {
            this.refresh(value)
        }
    },
    methods: {
        ...mapActions('dashboard', [
            'totalFinishedInPayments'
        ]),
        refresh () {
            this.totalFinishedInPayments()
        }
    },
    mounted () {
        this.refresh()
    }
}
</script>

<style scoped>
</style>
