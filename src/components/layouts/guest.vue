<template>
    <!-- Configure "view" prop for QLayout -->
    <q-layout>
        <router-view  :rootRefs="this.rootRefs" />
    </q-layout>
</template>

<script>
    import { QLayout } from 'quasar'

    export default {
        components: {
            QLayout
        },
        data () {
            return {}
        },
        props: ['rootRefs']
    }
</script>

<style>
    body {
        background-color: white !important;
    }
</style>