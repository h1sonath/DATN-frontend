<template>
	<v-layout
		align-center
		justify-center
		class=" full-width full-height"
	>
		<v-flex xs11 md9 lg8>
			<v-layout wrap>
				<v-flex
					xs12
					md6
					class="pa-8 d-flex flex-column justify-space-between primary--text"
				>
					<div class="d-flex justify-center">
					</div>
				</v-flex>
				<v-flex>
					<router-view></router-view>
				</v-flex>
			</v-layout>
		</v-flex>
	</v-layout>
</template>
<style lang="scss" scoped>
</style>
