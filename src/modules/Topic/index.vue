<template>
	<div class="pa-3">
		<v-card>
			<v-card-title>
				Danh sách đề tài
				<v-spacer></v-spacer>
			</v-card-title>
			<BaseInput
				v-model="textSearch"
				label="Tìm kiếm theo tên giảng viên hoặc theo tên đề tài"
				height="20px"
			/>
			<v-data-table
				:headers="headers"
				:items="allTopics"
				class="has-border"
				disable-sort
				:search="textSearch"
			>
				<template v-slot:[`item.teacherName`]="{item}">
					<div>
						Tên:
						<span class="font-weight-bold text-left">
							{{ item.teacherName }}
						</span>
					</div>
					<div>Bộ môn: {{ item.departmentName }}</div>
					<div>Liên lạc: {{ item.phone }}</div>
					<div>Email: {{ item.email }}</div>
				</template>
				<template v-slot:[`item.topicName`]="{item}">
					<div class="table-text">
						{{ item.topicName }}
					</div>
					<div>
						Số SV: <span class="table-text">{{ item.maxStudent }} </span>
					</div>
					<div>
						{{ item.description }}
					</div>
					<div hidden>
						{{ item.description }}
					</div>
				</template>
			</v-data-table>
		</v-card>
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
		})
	},
	computed: {
		...mapGetters({
			allTopics: 'topic/getAllTopics'
		})
	},
	data() {
		return {
			textSearch: '',
			headers: [
				{
					text: 'Giảng viên hướng dẫn',
					align: 'start',
					value: 'teacherName',
					width: '35%'
				},
				{
					text: 'Đề tài',
					value: 'topicName',
					align: 'start',
					width: '65%'
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
