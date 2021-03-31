<template>
	<div class="pa-3">
		<v-data-table :headers="headers" :items="allTopics" class="has-border">
			<template v-slot:[`item.teacher`]="{item}">
				<div class="table-content">
					<span class="font-weight-bold">{{ item.teacherName }} </span>
					<br />
					<span>{{ item.departmentName }}</span>
					<br />
					<span> {{ item.phone }}</span>
					<br />
					<span>{{ item.email }} </span>
					<br />
				</div>
			</template>
			<template v-slot:[`item.topic`]="{item}">
				<div class="table-content">
					<span class="table-text">
						{{ item.topicName }}
					</span>
					<br />
					<!-- Loại đồ án:
					<span class="table-text">
						{{ item.topic }}
					</span> -->
					<!-- <br /> -->
					Số SV:<span class="table-text">
						{{ item.maxStudent }}
					</span>
					<br />
					<span class="table-text">
						{{ item.description }}
					</span>
					<!-- Hệ:<span class="table-text">
						{{ item.topic.program.toString() }}
					</span> -->
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
		console.log(this.allTopics)
	},
	methods: {
		...mapActions({
			fetchTopics: 'topic/fetchTopics'
		})
	},
	computed: {
		...mapGetters({
			allTopics: 'topic/getAllTopics'
		})
	},
	data() {
		return {
			headers: [
				{
					text: 'Giảng viên hướng dẫn',
					align: 'start',
					sortable: false,
					value: 'teacher',
					width: '40%'
				},
				{
					text: 'Đề tài',
					value: 'topic',
					align: 'start',
					sortable: false
				}
			]
		}
	}
}
</script>
<style scoped>
.table-content {
	padding: 9px 0px;
}
.table-text {
	color: blue;
	font-weight: bold;
}
</style>
