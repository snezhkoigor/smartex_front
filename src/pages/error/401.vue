<template>
    <!-- if you want automatic padding use "layout-padding" class -->
    <q-layout>
        <q-page-container>
            <q-page class="flex flex-center">
                <div class="error-container gutter-sm">
                    <!-- your content -->
                    <div class="row">
                        <div class="col-xs-12 col-sm-2 col-md-2 error-gif gt-lg gutter-sm">
                            <img height="150px" src="../../statics/error.gif">
                        </div>
                        <div class="col-xs-12 col-sm-8 col-md-8 error-title gutter-sm">
                            <div class="q-display-2">401</div>
                                <div class="subheading">
                                    You do not have permission to this page
                                </div>
                        </div>
                    </div>
                    <div class="row gutter-sm">
                        <div class="col-12 error-text">
                            Ooops! Looks like we took a wrong turn somewhere. Please try going back to Dashboard, and if that doesn't help – click the 'Log Out' button below to relogin.
                        </div>
                    </div>
                    <div class="row gutter-sm">
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
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {}
    },
    computed: {
        ...mapGetters('user', [
            'pending'
        ])
    },
    methods: {
        ...mapActions('user', [
            'logout'
        ]),
        goBackToDashboard () {
            this.$router.push({
                name: 'dashboard'
            })
        },
        singOut () {
            this.logout().then(() => {
                this.$router.push({
                    name: 'login'
                })
            })
        }
    }
}
</script>

<style scoped>
    .error-container {
        max-width: 600px;
        margin: 20px;
    }
    .error-container .error-gif {
        margin-right: 20px;
        margin-left: 2px;
    }
</style>
