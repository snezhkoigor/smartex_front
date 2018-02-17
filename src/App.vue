<template>
    <div id="q-app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    mounted () {
        this.$store.dispatch('user/resetPending')
        this.$store.dispatch('payment/resetPending')
        this.$store.dispatch('commission/resetPending')
        this.$store.dispatch('course/resetPending')
        this.$store.dispatch('exchange/resetPending')
        this.$store.dispatch('log/resetPending')
        this.$store.dispatch('news/resetPending')
        this.$store.dispatch('wallet/resetPending')
    }
}
</script>

<style>
</style>
