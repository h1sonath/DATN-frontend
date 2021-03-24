<template>
	<div class="pa-3">
		<v-data-table
			:headers="headers"
			:items="data"
			disable-sort
			hide-default-footer
			class="has-border"
		>
		</v-data-table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			data: [],
			headers: [
				{
					text: 'Mã học phần',
					align: 'coureNumber',
					sortable: false,
					value: 'name'
				},
				{
					text: 'Mã lớp',
					value: 'classNumber',
					align: 'start',
					sortable: false
				},
				{
					text: 'Mã số sinh viên',
					value: 'studentNumber',
					align: 'start',
					sortable: false
				},
				{
					text: 'Hệ',
					value: 'program',
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
					text: 'Đơn vị',
					value: 'department',
					align: 'start',
					sortable: false
				},
				{
					text: 'Giáo viên hướng dẫn',
					value: 'teacher',
					align: 'start',
					sortable: false
				},
				{
					text: 'Link báo cáo',
					value: 'reportLink',
					align: 'start',
					sortable: false
				}
			]
		}
	}
}
</script>
