<template>
	<div>
		<v-data-table
			class="has-border"
			:headers="headers"
			:items="studentProjects"
			disable-sort
			:items-per-page="5"
		>
			<template v-slot:[`item.semester`]="{}">20201</template>/
			<template v-slot:[`item.courseName`]="{item}">
				<div>
					<a @click="$router.push(`/projectDetail/${item.projectID}`)">{{
						item.course
					}}</a>
				</div>
			</template>
			<template v-slot:[`item.topicName`]="{item}">
				{{ item.topic.topicName }}
			</template>
			<template v-slot:[`item.score`]="{item}">
				{{ item.score ? item.score : 'Chưa có điểm' }}
			</template>
					<template v-slot:[`item.teacherName`]="{item}">
				{{ item.teacher.teacherName }}
			</template>
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
					value: 'semester',
					width: '5%'
				},
				{
					text: 'Tên học phần',
					value: 'courseName',
					align: 'start',
					sortable: false,
					width: '20%'
				},
				{
					text: 'Tên đề tài',
					value: 'topicName',
					align: 'start',
					sortable: false,
					width: '20%'
				},
				{
					text: 'Điểm',
					value: 'score',
					align: 'start',
					sortable: false,
					width: '10%'
				},
				{
					text: 'Giáo viên hướng dẫn',
					value: 'teacherName',
					align: 'start',
					sortable: false,
					width: '20%'
				}
			]
		}
	},
	watch: {
		studentProjects: {
			handler(val) {
				if (val) {
					console.log(val)
				}
			},
			immediate: true
		}
	}
}
</script>
