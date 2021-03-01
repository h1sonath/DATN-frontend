<template>
	<BaseUploadDragger
		:type="type"
		:maxFilesize="maxFilesize"
		:maxFiles="maxFiles"
		:uploadMultiple="uploadMultiple"
		@onUploadSuccess="(data) => onUploadSuccess(data)"
	>
		<div class="relative">
			<img
				class="image-upload"
				:src="
					imageUrl ? $utils.convertURL(imageUrl) : helpers.DEFAULT_IMAGE.banner
				"
			/>
			<v-btn class="button-upload mb-1" depressed dark>Tải ảnh lên</v-btn>
		</div>
	</BaseUploadDragger>
</template>
<script>
import helpers from '@/helpers'
export default {
	props: {
		maxFilesize: {
			type: Number,
			default: 3750,
		},
		type: {
			type: String,
			default: 'image',
		},
		imageUrl: String,
		maxFiles: {
			type: Number,
			default: 1,
		},
		uploadMultiple: Boolean,
	},
	data() {
		return {
			helpers,
		}
	},
	methods: {
		onUploadSuccess(data) {
			this.$emit('onUploadSuccess', data)
		},
	},
}
</script>
<style lang="scss" scoped>
.image-upload {
	width: 100%;
	height: 175px;
	object-fit: cover;
	border-radius: 4px;
}
.image-upload:hover {
	opacity: 0.8;
}
.button-upload {
	opacity: 0.8;
	border-radius: 0px 0px 4px 4px;
	position: absolute;
	bottom: 0px;
	left: 0px;
	width: 100%;
	display: flex;
	padding: 15px;
	justify-content: space-between;
	align-items: center;
}
</style>