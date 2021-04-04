<template>
	<div class="pa-3">
		<v-data-table :headers="headers" :items="allTopics" class="has-border">
			<template v-slot:[`item.teacher`]="{item}">
				<div class="table-content">
					<div class="font-weight-bold">{{ item.teacherName }}</div>
					<div>{{ item.departmentName }}</div>
					<div>{{ item.phone }}1</div>
					<div>{{ item.email }}2</div>
				</div>
			</template>
			<template v-slot:[`item.topic`]="{item}">
				<div class="table-content">
					<div class="table-text">
						{{ item.topicName }}
					</div>
					<div>
						Số SV: <span class="table-text">{{ item.maxStudent }} </span>
					</div>
					<div>
						{{ item.description }}
					</div>
					<div>
						{{ item.description }}
					</div>
				</div>
			</template>
		</v-data-table>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	async created() {
		await this.fetchTopics()
	},
	methods: {
		...mapActions({
			fetchTopics: 'topic/fetchTopics'
		}),
		changeShowStatus() {
			this.showDesciption = !this.showDesciption
		}
	},
	computed: {
		...mapGetters({
			allTopics: 'topic/getAllTopics'
		})
	},
	data() {
		return {
			showDesciption: false,
			headers: [
				{
					text: 'Giảng viên hướng dẫn',
					align: 'left',
					sortable: false,
					value: 'teacher',
					width: '30%'
				},
				{
					text: 'Đề tài',
					value: 'topic',
					align: 'left',
					sortable: false
				}
			]
		}
	}
}
</script>
<style scoped>
.table-text {
	color: blue;
	font-weight: bold;
}
</style>
