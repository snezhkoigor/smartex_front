<template>
	<div>
		<v-list class="menu">
			<v-list-tile v-for="item in $router.options.routes"
					avatar
					:to="item.path"
					v-if="item.menu && $router.options.can(item.meta)"
					:key="item.meta.menuName"
					:class="{'': $route.name !== item.name, 'selected': $route.name === item.name}"
			>
				<v-list-tile-action>
					<v-icon :class="{'': $route.name !== item.name, 'selected': $route.name === item.name}">{{ item.meta.menuIcon }}</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>
						{{ item.meta.menuName }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data: () => ({
            drawer: false
        }),
        methods: {
            goToMenu(pathName) {
                this.$router.push({
                    name: pathName
                });
            }
        }
    }
</script>

<style>
	.menu {
		text-align: right;
		margin: 6px 8px;
	}
	.menu li {
		width: 188px;
	}
	.menu li.selected {
		color: #009688;
		font-weight: bold;
	}
	.menu button {
		margin-right: -30px;
	}
</style>