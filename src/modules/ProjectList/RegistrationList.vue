<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="studentRegistrations"
			disable-sort
			class="has-border"
			:items-per-page="5"
		>
		</v-data-table>
	</div>
</template>
<script>
export default {
	props: {
		studentRegistrations: Array
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
					text: 'Giáo viên hướng dẫn',
					value: 'teacherName',
					align: 'start',
					sortable: false,
					width: '20%'
				},
				{
					text: 'Công ty',
					value: 'company',
					align: 'start',
					sortable: false,
					width: '20%'
				}
			]
		}
	}
}
</script>
