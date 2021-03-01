<template>
	<div class="custom-file-name">
		<div class="text-title text-file">
			<v-tooltip top>
				<template v-slot:activator="{on, attrs}">
					<span v-bind="attrs" v-on="on" class="tooltip-file-wrap">
						<span class="ellipsis-one-line">{{
							getFileName(name).fullname
						}}</span>
					</span>
				</template>
				<span class="black--text">{{ getFileName(name).fullname }}</span>
			</v-tooltip>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		name: {
			type: String,
			default: '',
		},
	},
	methods: {
		getFileName(file = '') {
			if (!file) return {}
			const name = file.match('.*\\.')[0] || 'Tệp không có tiêu đề'
			const type = file.replace(/.*\./g, '')
			return {
				name,
				type,
				fullname: file,
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.tooltip-file-wrap {
	display: flex;
	color: #3552ba;
}
</style>

