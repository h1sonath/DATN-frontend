<template>
	<div>
		<BaseResourceAutoComplete label="Chọn từ thư viện" v-model="resource" :filter="filterResource()" />
		<div class="subtitle-1 mb-2">{{ subtitle }}</div>
		<BaseUploadWithButton
			:maxFilesize="maxFilesize"
			:type="type"
			@onUploadSuccess="(file) => onUploadSuccess(file)"
		/>
	</div>
</template>
<script>
export default {
	props: {
		subtitle: {
			type: String,
			default: '',
		},
		initResource: Object,
		maxFilesize: Number,
		type: String,
	},
	data() {
		return {
			resource: undefined,
		}
	},
	methods: {
		filterResource() {
			if (this.type === 'vimeo' || this.type === 'video') {
				return {type: 'video'}
			} else {
				return this.type ? {subType: this.type} : {}
			}
		},
		onUploadSuccess(file) {
			this.resource = file[0]
		},
		getValue() {
			return this.resource
		},
	},
	watch: {
		initResource: {
			handler(initResource) {
				if (initResource) {
					this.resource = initResource
				} else this.resource = undefined
			},
			immediate: true,
		},
		resource() {
			this.$emit('change', this.resource)
		}
	},
}
</script>