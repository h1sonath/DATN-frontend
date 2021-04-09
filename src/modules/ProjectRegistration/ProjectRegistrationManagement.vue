<template>
	<div class="pa-3">
		<v-data-table
			:headers="headers"
			:items="allProjectRegistration"
			disable-sort
			class="has-border"
		>
			<template v-slot:[`item.studentInfo`]="{item}">
				<div>Tên: {{ item.studentName }}</div>
				<div>MSSV: {{ item.studentNumber }}</div>
				<div>Điểm tiếng Anh: {{ item.englishScore }}</div>
				<div>CV: {{ item.cvLink }}</div>
			</template>
			<template v-slot:[`item.topicID1`]="{item}">
				{{ item.topicName }}
			</template>
			<template v-slot:[`item.actions`]="{item}">
				<div class="d-flex flex-row">
					<div
						@click="acceptProjectRegistration(item.requestID)"
						class="action-hover cursor-pointer"
					>
						Duyệt
					</div>
					/
					<div @click="rejectProjectRegistration(item.requestID)" class="action-hover cursor-pointer">
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
		await this.fetchProjectRegistrationsFromTeacher({level: 1, status: 'WAIT'})
	},
	methods: {
		...mapActions({
			acceptProjectRegistration:
				'projectRegistration/acceptProjectRegistration',
			rejectProjectRegistration:
				'projectRegistration/rejectProjectRegistration',
			fetchProjectRegistrationsFromTeacher:
				'projectRegistration/fetchProjectRegistrationsFromTeacher',
			fetchStudent: 'student/fetchStudent'
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
					text: 'Hệ',
					value: 'program',
					align: 'start',
					sortable: false,
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
				}
			]
		}
	}
}
</script>
