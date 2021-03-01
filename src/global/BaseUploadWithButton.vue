<template>
	<BaseUploadDragger
		:type="type"
		:maxFilesize="maxFilesize"
		@onUploadSuccess="(data) => onUploadSuccess(data)"
	>
		<div id="wrapper" class="has-dashed full-width d-flex justify-center">
			<div class="d-flex flex-column justify-center">
				<div class="subtitle-1 font-weight-bold text-align-center">Kéo thả tệp tại đây...</div>
				<v-btn class="subtitle-2 mt-2 text-capitalize" rounded color="primary">Chọn tệp trên máy</v-btn>
			</div>
		</div>
	</BaseUploadDragger>
</template>
<script>
export default {
	props: {
		maxFilesize: {
			type: Number,
			default: 3750,
		},
		type: String,
	},
	methods: {
		onUploadSuccess(data) {
			this.$emit('onUploadSuccess', data)
		},
	},
}
</script>
<style lang="scss" scoped>
#wrapper {
	background: #f8f8f8;
	height: 125px;
}
#wrapper .dz-message {
	display: none;
}
</style>