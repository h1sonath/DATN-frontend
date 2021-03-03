<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="data"
			disable-sort
			hide-default-footer
			class="has-border"
		>
			<template v-slot:[`item.name`]="{item}">
				<BaseTitleTable @click="$router.push(`/detail-student/${item.id}`)">{{
					item.name
				}}</BaseTitleTable>
			</template>
		</v-data-table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			data: [
				{
					semester: '20201',
					courseCode: 159
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
