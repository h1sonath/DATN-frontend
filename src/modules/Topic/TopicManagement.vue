<template>
	<div class="pa-3">
		<div class="pb-6 d-flex justify-end">
			<v-btn>Tạo topic mới</v-btn>
		</div>
		<v-data-table :headers="headers" :items="teacherTopic" class="has-border">
			<template v-slot:[`item.teacher`]="{item}">
				<div class="font-weight-bold text-left">{{ item.teacherName }}</div>
				<div>{{ item.phone || 'Sđt: Cần cập nhật' }}</div>
				<div>{{ item.email || 'Email: Cần cập nhật' }}</div>
			</template>
			<template v-slot:[`item.topic`]="{item}">
				<div class="font-weight-bold text-left">{{ item.topicName }}</div>
				<div>{{ item.departmentName }}</div>
				<div>{{ item.description || "Mô tả đề tài"}}</div>
			</template>
			<template v-slot:[`item.actions`]="{}">
				<a>Chỉnh sửa</a>
			</template>
		</v-data-table>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	async created() {
		this.fetchTeacherTopic()
	},
	methods: {
		...mapActions({
			fetchTeacherTopic: 'topic/fetchTeacherTopic'
		})
	},
	computed: {
		...mapGetters({
			teacherTopic: 'topic/getAllTopics'
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
					width: '25%'
				},
				{
					text: 'Đề tài',
					value: 'topic',
					align: 'start',
					sortable: false,
					width: '30%'
				},
				{
					text: 'Số nguyện vọng tối đa',
					value: 'maxStudent',
					align: 'center',
					sortable: false,
					width: '20%'
				},
				{
					text: 'Thao tác',
					value: 'actions',
					align: 'center',
					sortable: false,
					width: '25%'
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
