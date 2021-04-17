<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="data"
			disable-sort
			class="has-border"
      :items-per-page="5"
		>
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
					code: 159
				}
			],
			headers: [
				{
					text: 'Kì học',
					align: 'start',
					sortable: false,
					value: 'semester'
				},
        {text: 'Tên học phần', value: 'courseName', align: 'start', sortable: false},
        {text: 'Giảng viên hướng dẫn', value: 'teacher', align: 'start', sortable: false},
        {text: 'Kết quả', value: 'status', align: 'start', sortable: false},
        {text: 'Thao tác', value: 'actions', align: 'start', sortable: false}
			]
		}
	}
}
</script>
