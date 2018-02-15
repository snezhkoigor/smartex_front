<template>
    <div>
        <q-card color="secondary">
            <q-card-title>
                <span class="q-headline">
                    Finished exchanges:
                </span>
            </q-card-title>
            <q-card-main>
                <span class="q-caption">total:</span> <span class="q-headline">{{totalFinishedExchangesItems.all}}</span>, <span class="q-caption">finished:</span> <span class="q-headline">{{totalFinishedExchangesItems.finished}}</span>, <span class="q-caption">conv:</span> <span class="q-headline">{{totalFinishedExchangesItems.conversion}}%</span>
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
            'totalFinishedExchangesItems', 'totalFinishedExchangesPending'
        ])
    },
    watch: {
        period: function (value) {
            this.refresh(value)
        }
    },
    methods: {
        ...mapActions('dashboard', [
            'totalFinishedExchanges'
        ]),
        refresh () {
            this.totalFinishedExchanges()
        }
    },
    mounted () {
        this.refresh()
    }
}
</script>

<style scoped>
</style>
