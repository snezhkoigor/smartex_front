<template>
	<v-container fluid grid-list-md class="hidden-md-and-up">
		<v-layout row wrap>
			<v-flex>
				<v-card class="card--flex-toolbar">
					<router-view />
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>