<template>
    <!-- Configure "view" prop for QLayout -->
    <q-layout>
        <router-view />
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
        }
    }
</script>

<style>
    body {
        background-color: white !important;
    }
    .error-container {
		max-width: 600px !important;
		padding: 0px 9px !important;
		margin: 50px auto !important;
		position: relative;
	}
	.errors-container {
		padding: 20px;
	}
	.error-container .error-gif {
		text-align: right;
	}
	.error-container .error-title {
		text-align: left;
		margin-top: 20px;
	}
	.error-container .error-text {
		text-align: justify;
		margin-top: 20px;
        margin-bottom: 20px;
	}
</style>
