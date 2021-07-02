<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="studentRegistrations"
			disable-sort
			class="has-border"
			:items-per-page="5"
			:search="textSearch"
		>
			<template v-slot:[`item.nguyenvong`]="{item}">
				{{ item.nguyenvong }}
			</template>
		</v-data-table>
	</div>
</template>
<script>
// import { mapActions } from 'vuex';
export default {
	props: {
		studentRegistrations: Array
	},
	data() {
		return {
			textSearch: '',
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
					value: 'course',
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
					text: 'Nguyện vọng',
					value: 'nguyenvong',
					align: 'start',
					sortable: false,
					width: '20%'
				},
				{
					text: 'Trạng thái',
					value: 'trangthai',
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
