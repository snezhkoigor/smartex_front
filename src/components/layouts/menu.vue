<template>
    <div>
        <q-side-link item :to="item.path" v-for="item in $router.options.routes" :key="item.meta.label" v-if="item.meta.menu">
            <!-- using it as QItem in this particular example -->
            <q-item-side>
                <q-icon :name="item.icon" size="20px" />
            </q-item-side>
            <q-item-main :label="item.meta.label" :sublabel="item.meta.labelDescription" />
        </q-side-link>
    </div>
</template>

<script>
    import {
        QItemSide,
        QItemMain,
        QIcon,
        QSideLink
    } from 'quasar'

    export default {
        components: {
            QItemSide,
            QItemMain,
            QIcon,
            QSideLink
        },
        data () {
            return {}
        }
    }
</script>

<style>
    
</style>
