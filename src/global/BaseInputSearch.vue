<template>
	<div class="d-inline-flex">
		<BaseInput
			style="width: 360px"
			prepend-inner-icon="mdi-magnify"
			v-model="textSearch"
			:label="label"
			:placeholder="placeholder"
		></BaseInput>
		<BaseButton
			class="ml-3"
			icon="mdi-magnify"
			style="margin-top: 2px"
			@click="$emit('onSearch', textSearch)"
			:text="buttonText"
		/>
	</div>
</template>
<script>
export default {
	props: {
		value: String,
		label: String,
		placeholder: String,
		buttonText: {
			type: String,
			default: 'Tìm kiếm'
		}
	},
	data() {
		return {
			textSearch: ''
		}
	}
}
</script>
