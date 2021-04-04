<template>
	<div class="pa-3">
		<v-data-table
			:headers="headers"
			:items="allProjectRegistration"
			disable-sort
			class="has-border"
		>
			<template v-slot:[`item.studentInfo`]="{item}">
				{{item.teacherID}}{{ item.studentID }}
			</template>
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
		await this.fetchProjectRegistrationsFromTeacher()
	},
	methods: {
		...mapActions({
			updateProjectRegistration:
				'projectRegistration/updateProjectRegistration',
			fetchProjectRegistrationsFromTeacher:
				'projectRegistration/fetchProjectRegistrationsFromTeacher'
		})
	},
	computed: {
		...mapGetters({
			user: 'auth/getUser',
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
					value: 'name',
					width: '10%'
				},
				{
					text: 'Mã lớp',
					value: 'classNumber',
					align: 'start',
					sortable: false,
					width: '5%'
				},
				{
					text: 'Hệ',
					value: 'program',
					align: 'start',
					sortable: false,
					width: '5%'
				},
				{
					text: 'Sinh viên',
					value: 'studentInfo',
					align: 'start',
					sortable: false,
					width: '25%'
				},
				{
					text: 'Nguyện vọng 1',
					value: 'topicID1',
					align: 'start',
					sortable: false,
					width: '20%'
				},
				{
					text: 'Phê duyệt',
					value: 'actions',
					align: 'start',
					sortable: false,
					width: '15%'
				},
				{
					text: 'Tên học phần',
					value: 'courseName',
					align: 'start',
					sortable: false,
					width: '20%'
				},
			]
		}
	}
}
</script>
