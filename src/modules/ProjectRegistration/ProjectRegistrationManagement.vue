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
<<<<<<< HEAD
=======
					text: 'Mã học phần',
					align: 'coureNumber',
					sortable: false,
					value: 'name'
				},
				{
>>>>>>> c7763e6cffcf7279b8fd235eb0edbb87f19afa9a
					text: 'Mã lớp',
					value: 'classNumber',
					align: 'start',
					sortable: false
				},
				{
<<<<<<< HEAD
					text: 'Tình trạng đăng ký SIS',
					value: 'SIS_status',
=======
					text: 'Hệ',
					value: 'program',
>>>>>>> c7763e6cffcf7279b8fd235eb0edbb87f19afa9a
					align: 'start',
					sortable: false
				},
				{
<<<<<<< HEAD
					text: 'Tên học phần',
					value: 'courseName',
=======
					text: 'Mã số sinh viên',
					value: 'studentNumber',
>>>>>>> c7763e6cffcf7279b8fd235eb0edbb87f19afa9a
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
<<<<<<< HEAD
					text: 'Nguyện vọng 2',
					value: 'topicID2',
					align: 'start',
					sortable: false
				},
				{
					text: 'Nguyện vọng 3',
					value: 'topicID3',
=======
					text: 'Phê duyệt',
					value: 'actions',
					align: 'start',
					sortable: false,
					width: '30%'
				},
				{
					text: 'Tên học phần',
					value: 'courseName',
>>>>>>> c7763e6cffcf7279b8fd235eb0edbb87f19afa9a
					align: 'start',
					sortable: false
				},
				{
					text: 'Đơn vị',
					value: 'department',
					align: 'start',
					sortable: false
<<<<<<< HEAD
				},
				{
					text: 'Thời gian',
					value: 'timeType',
					align: 'start',
					sortable: false
=======
>>>>>>> c7763e6cffcf7279b8fd235eb0edbb87f19afa9a
				}
			]
		}
	}
}
</script>
