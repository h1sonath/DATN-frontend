<template>
	<BaseUploadDragger
		class="cursor-pointer"
		:type="type"
		:maxFilesize="maxFilesize"
		@onUploadSuccess="(data) => onUploadSuccess(data)"
	>
		<div class="wrapper">
			<span class="select-file text-body-2">Chọn tệp</span>
			<span class="file-name" ref="file-name">
				<BaseFileName :name="name" v-if="name" />
				<span v-else style="opacity: 0.6" class="text-body-2">{{ placeholder }}</span>
			</span>
		</div>
	</BaseUploadDragger>
</template>
<script>
export default {
	data() {
		return {
			name: '',
		}
	},
	props: {
		maxFilesize: {
			type: Number,
			default: 3750,
		},
		type: String,
		fileName: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
	},
	methods: {
		onUploadSuccess(data) {
			this.$emit('onUploadSuccess', data)
		},
	},
	watch: {
		fileName: {
			handler(val) {
				this.name = val
			},
			immediate: true,
		},
	},
}
</script>
<style lang="scss" scoped>
.wrapper {
	width: 100%;
	display: flex;
	border: 1px solid #dddddd;
	border-radius: 4px;
}
.select-file {
	padding: 8px 12px;
	border-radius: 4px;
	background: #eeeeee;
	border-right: 1px solid #dddddd;
}
.file-name {
	padding: 8px 12px;
	flex: 1;
	width: 1px;
}
</style>