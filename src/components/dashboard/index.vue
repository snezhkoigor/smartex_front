<template>
    <div class="dashboard">
        <q-card-title>
            {{ this.$router.currentRoute.meta.title }}
            <span slot="subtitle">{{ this.$router.currentRoute.meta.subtitle }}</span>
        </q-card-title>
        <q-card-main>
            <!-- if you want automatic padding use "layout-padding" class -->
            <div class="pull-left">
                <!-- your content -->
            </div>
        </q-card-main>
    </div>
</template>

<script>
    import {
        QCard,
        QCardTitle,
        QCardSeparator,
        QCardMain
    } from 'quasar'

    export default {
        data () {
            return {}
        },
        components: {
            QCard,
            QCardTitle,
            QCardSeparator,
            QCardMain
        }
    }
</script>

<style>
</style>
