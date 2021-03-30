<template>
	<div class="pa-3">
		<v-data-table
			:headers="headers"
			:items="allProjectRegistration"
			disable-sort
			hide-default-footer
			class="has-border"
		>
		</v-data-table>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	async created() {
		await this.fetchProjectRegistrations()
		console.log(this.allProjectRegistration)
	},
	methods: {
		...mapActions({
			fetchProjectRegistrations: 'projectRegistration/fetchProjectRegistrations'
		})
	},
	computed: {
		...mapGetters({
			allProjectRegistration: 'projectRegistration/getAllProjectRegistration'
		})
	},
	data() {
		return {
			data: [],
			headers: [
				{
					text: 'Mã lớp',
					value: 'classNumber',
					align: 'start',
					sortable: false
				},
				{
					text: 'Tình trạng đăng ký SIS',
					value: 'SIS_status',
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
					text: 'Nguyện vọng 1',
					value: 'topicID1',
					align: 'start',
					sortable: false
				},
				{
					text: 'Nguyện vọng 2',
					value: 'topicID2',
					align: 'start',
					sortable: false
				},
				{
					text: 'Nguyện vọng 3',
					value: 'topicID3',
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
					text: 'Thời gian',
					value: 'timeType',
					align: 'start',
					sortable: false
				}
			]
		}
	}
}
</script>
