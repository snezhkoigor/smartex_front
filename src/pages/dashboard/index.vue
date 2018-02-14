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
                <div class="row sm-gutter">
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

export default {
    name: 'PageDashboard',
    components: {
        ActivationsComponent,
        RegistrationsComponent
    },
    data () {
        return {}
    }
}
</script>

<style scoped>
</style>
