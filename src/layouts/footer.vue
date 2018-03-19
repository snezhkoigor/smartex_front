<template>
    <q-toolbar slot="footer" color="white" class="bg-footer footer vertical-middle">
        <span class="copyright">Copyright © {{ new Date().getFullYear() }} Smartex</span>
    </q-toolbar>
</template>

<script>
export default {
    name: 'LayoutFooter',
    data () {
        return {}
    }
}
</script>

<style scoped>
    .bg-footer {
        margin-top: 2px;
        background-color: white;
    }
    .footer {
        width: 100%;
        padding-top: 10px;
        box-shadow: 0 0 !important;
        padding-right: 0px;
        justify-content: center;
    }
    .copyright {
        color: #a2a2a2;
        font-size: 13px;
    }
</style>
