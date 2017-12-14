<template>
	<v-container grid-list-md text-xs-center>
		<v-layout row wrap class="hidden-md-and-down">
			<v-flex xs6>
				<div class="access-denied-main-text display-4">
					Oops!
				</div>
				<div class="display-1">
					Web server is not feeling well.<br/>
					We will fix this issue for you.
				</div>
			</v-flex>
			<v-flex xs6>
				<img data-v-2e32034a src="../../../static/img/401.gif">
			</v-flex>
		</v-layout>
		<v-layout row wrap class="hidden-lg-and-up">
			<v-flex>
				<div class="access-denied-main-text display-2">
					Oops!
				</div>
				<div class="headline">
					The web server is not feeling well.<br/>
					We will fix this issue for you.
				</div>
			</v-flex>
			<v-flex>
				<img data-v-2e32034a src="../../../static/img/401.gif">
			</v-flex>
		</v-layout>
	</v-container>
</template>

<style>
	.access-denied-main-text {
		padding-bottom: 70px;
		padding-top: 50px;
	}
</style>