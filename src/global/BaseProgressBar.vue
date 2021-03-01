<template>
	<div class="pa-4" v-if="isLoading">
		<BaseLoadingAllScreen>
			<div slot="object-inside">
				<div class="wrapper-object">
					<v-progress-circular
						:rotate="180"
						:size="100"
						:width="10"
						:value="value"
						color="white"
						>{{ value }}%</v-progress-circular
					>
					<div class="status">
						Đang {{ displayStatus }} {{ entity }} số {{ numberOfQuestion }}
					</div>
				</div>
			</div>
		</BaseLoadingAllScreen>
	</div>
</template>
<script>
export default {
	props: {
		entity: {
			type: String,
			default: 'câu hỏi'
		}
	},
	data() {
		return {
			isLoading: false,
			status: 'update',
			numberOfQuestion: 0,
			height: 2,
			value: 0
		}
	},
	computed: {
		displayStatus() {
			if (this.status === 'update') {
				return 'cập nhật'
			} else if (this.status === 'create') {
				return 'tạo'
			} else if (this.status === 'delete') {
				return 'xoá'
			} else return ''
		}
	},
	methods: {
		changePercentage(status, number, total) {
			this.numberOfQuestion = number + 1
			this.status = status
			const percentage = Math.round((this.numberOfQuestion / total) * 100)
			this.value = percentage
		},
		openLoading() {
			this.isLoading = true
		},
		closeLoading() {
			this.isLoading = false
		}
	}
}
</script>
<style lang="scss" scoped>
.status {
	margin-top: 15px;
	position: relative;
	left: -33px;
	color: white;
}
.wrapper-object {
	width: 200px;
}
</style>
