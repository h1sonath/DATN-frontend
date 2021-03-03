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
				{text: 'Mã học phần', value: 'courseCode', align: 'start', sortable: false},
        {text: 'Tên học phần', value: 'courseName', align: 'start', sortable: false},
        {text: 'Hạn đăng ký', value: 'deadline', align: 'start', sortable: false},
        {text: 'Giảng viên hướng dẫn', value: 'teacher', align: 'start', sortable: false},
        {text: 'Kết quả', value: 'status', align: 'start', sortable: false},
        {text: 'Thao tác', value: 'actions', align: 'start', sortable: false}
			]
		}
	}
}
</script>
