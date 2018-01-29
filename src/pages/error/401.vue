<template>
    <!-- if you want automatic padding use "layout-padding" class -->
    <div class="error-container justify-center">
        <!-- your content -->
        <div class="row">
            <div class="col-xs-12 col-sm-2 col-md-2 error-gif gt-lg">
                <img height="150px" src="../../statics/error.gif">
            </div>
            <div class="col-xs-12 col-sm-8 col-md-8 error-title">
                <div class="display-1">401</div>
                    <div class="subheading">
                        You do not have permission to this page
                    </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 error-text">
                Ooops! Looks like we took a wrong turn somewhere. Please try going back to Dashboard, and if that doesn't help – click the 'Log Out' button below to relogin.
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <q-btn color="secondary"
                    @click="singOut"
                    :disable="pending"
                >
                    Log Out
                </q-btn>
                <q-btn color="secondary"
                    @click="goBackToDashboard()"
                    :disabled="pending"
                >
                    Dashboard
                </q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {}
    },
    computed: {
        ...mapGetters('User', [
            'pending'
        ])
    },
    methods: {
        ...mapActions('User', [
            'logout'
        ]),
        goBackToDashboard () {
            this.$router.push({
                name: 'dashboard'
            })
        },
        singOut () {
            this.$refName.App.$refs.ajaxBar.start()
            this.logout().then(() => {
                this.$refName.App.$refs.ajaxBar.stop()
            }).catch(errors => {
                this.$refName.App.$refs.ajaxBar.stop()
            })
        }
    }
}
</script>

<style>
</style>
