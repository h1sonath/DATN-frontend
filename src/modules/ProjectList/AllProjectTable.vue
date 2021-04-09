<template>
	<div>
		<v-data-table
			class="has-border"
			:headers="headers"
			:items="studentProjects"
			disable-sort
		>
			<template v-slot:[`item.courseName`]="{item}">
				<div>
					<a @click="$router.push(`/projectDetail/${item.projectID}`)">{{
						item.projectID
					}}</a>
				</div>
			</template>
			<!-- <template v-slot:[`item.teacher`]="{item}"> </template> -->
		</v-data-table>
	</div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
	props: {
    studentProjects: Array
  },
	data() {
		return {
			headers: [
				{
					text: 'Kì học',
					align: 'start',
					sortable: false,
					value: 'semester'
				},
				{
					text: 'Mã lớp/HP',
					value: 'courseCode',
					align: 'start',
					sortable: false
				},
				{
					text: 'Tên học phần',
					value: 'courseName',
					align: 'start',
					sortable: false
				},
				{
					text: 'Tên đề tài',
					value: 'topicName',
					align: 'start',
					sortable: false
				},
				{text: 'Điểm', value: 'score', align: 'start', sortable: false},
				{
					text: 'Giáo viên hướng dẫn',
					value: 'teacherName',
					align: 'start',
					sortable: false
				},
				{text: 'Công ty', value: 'company', align: 'start', sortable: false}
			]
		}
	}
}
</script>
