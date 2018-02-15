<template>
    <div>
        <q-card color="secondary">
            <q-card-title>
                <span class="q-headline">
                    New exchanges:
                </span>
            </q-card-title>
            <q-card-main>
                <span class="q-caption">total:</span> <span class="q-headline">{{totalNewExchangesItems.all}}</span>, <span class="q-caption">no income:</span> <span class="q-headline">{{totalNewExchangesItems.finished}}</span>, <span class="q-caption">conv:</span> <span class="q-headline">{{totalNewExchangesItems.conversion}}%</span>
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
            'totalNewExchangesItems', 'totalNewExchangesPending'
        ])
    },
    methods: {
        ...mapActions('dashboard', [
            'totalNewExchanges'
        ]),
        refresh () {
            this.totalNewExchanges()
        }
    },
    mounted () {
        this.refresh()
    }
}
</script>

<style scoped>
</style>
