<template>
	<div>
		<v-data-table class="has-border" :headers="headers" :items="data" disable-sort>
			<template v-slot:[`item.courseName`]="{item}">
				<div>
					<a @click="$router.push(`/projectDetail/${item.id}`)">{{ item.courseName }}</a>
				</div>
			</template>
			<!-- <template v-slot:[`item.teacher`]="{item}"> </template> -->
		</v-data-table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			data: [
				{
          id: '1',
					semester: '20201',
					courseCode: 159,
					courseName: 'Thực tập doanh nghiệp'
				},
				{
					semester: '20201',
					courseCode: 153
				},
				{
					semester: '20201',
					courseCode: 152
				}
			],
			headers: [
				{
					text: 'Kì học',
					align: 'start',
					sortable: false,
					value: 'semester'
				},
				{
					text: 'Mã học phần/Mã lớp',
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
					value: 'teacher',
					align: 'start',
					sortable: false
				},
				{text: 'Công ty', value: 'company', align: 'start', sortable: false}
			]
		}
	}
}
</script>
