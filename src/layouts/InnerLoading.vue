<template>
    <div class="layout-padding relative-position inner-loading" v-show="pending">
        <q-inner-loading :visible="pending">
            <p>
                <q-spinner-dots :size="innerLoadingConfig.size" :color="innerLoadingConfig.color"></q-spinner-dots>
            </p>
            <p>
                Be patient, processing your request ...
            </p>
        </q-inner-loading>
    </div>
</template>

<script>
import innerLoadingConfig from '../config/innerLoading'

export default {
    props: ['pending'],
    name: 'InnerLoadingLayout',
    data () {
        return {
            innerLoadingConfig: innerLoadingConfig
        }
    }
}
</script>

<style scoped>
    .inner-loading {
        min-height: calc(80vh);
    }
</style>
