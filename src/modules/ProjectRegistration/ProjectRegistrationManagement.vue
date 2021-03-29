<template>
	<div class="pa-3">
		<v-data-table
			:headers="headers"
			:items="allProjectRegistration"
			disable-sort
			hide-default-footer
			class="has-border"
		>
			<template v-slot:[`item.topicID1`]="{item}">
				{{ item.topicName }}
			</template>
			<template v-slot:[`item.actions`]="{}">
				<div class="d-flex flex-row">
					<div class="action-hover cursor-pointer">
						Duyệt
					</div>
					/
					<div class="action-hover cursor-pointer">
						Từ chối
					</div>
				</div>
			</template>
		</v-data-table>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	async created() {
		await this.fetchProjectRegistrationsFromTeacher({level: 1})
	},
	methods: {
		...mapActions({
			fetchProjectRegistrationsFromTeacher:
				'projectRegistration/fetchProjectRegistrationsFromTeacher',
			updateProjectRegistration: 'projectRegistration/updateProjectRegistration'
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
					text: 'Hệ',
					value: 'program',
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
					text: 'Nguyện vọng 1',
					value: 'topicID1',
					align: 'start',
					sortable: false
				},
				{
					text: 'Phê duyệt',
					value: 'actions',
					align: 'start',
					sortable: false,
					width: '30%'
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
				}
			]
		}
	}
}
</script>
