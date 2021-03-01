<template>
	<div :to="noHref ? '' : '/'" class="base-logo pa-3">
		<img src="/admin-static/iz-teach-logo.jpg" alt="logo" />
	</div>
</template>
<script>
export default {
	props: {
		large: Boolean,
		noHref: Boolean,
		dark: Boolean,
		mobile: Boolean,
	},
}
</script>

<style lang="scss">
.base-logo {
	width: 100%;
	background: #ffffff;
	text-align: center;
}
</style>
