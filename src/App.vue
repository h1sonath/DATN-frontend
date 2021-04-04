<template>
	<v-app id="app">
		<router-view />
		<BaseMessage />
		<BaseConfirm />
	</v-app>
</template>
<script>
import {mapActions} from 'vuex'
export default {
	methods: {
		...mapActions({
			initAuthen: 'auth/initAuthen'
		})
	},
	async created() {
			await this.initAuthen()
	}
}
</script>

<style lang="scss">
#app {
	font-family: Roboto, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
table {
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td, th {
  text-align: left;
  line-height: 2;
}
</style>
