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
				<div v-if="!item.hidden" class="d-flex flex-row">
					<div
						@click="acceptRegistration(item.requestID)"
						class="action-hover cursor-pointer"
					>
						Duyệt
					</div>
					/
					<div
						@click="rejectRegistration(item.requestID)"
						class="action-hover cursor-pointer"
					>
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
			acceptProjectRegistration:
				'projectRegistration/acceptProjectRegistration',
			rejectProjectRegistration:
				'projectRegistration/rejectProjectRegistration',
			fetchProjectRegistrationsFromTeacher:
				'projectRegistration/fetchProjectRegistrationsFromTeacher',
			fetchStudent: 'student/fetchStudent'
		}),
		async acceptRegistration(requestID) {
			await this.acceptProjectRegistration(requestID)
			this.$message.success('Đã chấp nhận nguyện vọng của sinh viên')
			// location.reload()
		},
		async rejectRegistration(requestID) {
			await this.rejectProjectRegistration(requestID)
			this.$message.success('Đã từ chối nguyện vọng của sinh viên')
			// location.reload()
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/getUser',
			allProjectRegistration: 'projectRegistration/getAllProjectRegistration'
		})
	},
	data() {
		return {
			allRegis1: [],
			headers: [
				{
					text: 'Hệ',
					value: 'program',
					align: 'start',
					width: '5%'
				},
				{
					text: 'Tên học phần',
					value: 'course',
					align: 'start',
					width: '10%'
				},
				{
					text: 'Sinh viên',
					value: 'studentInfo',
					align: 'start',
					width: '25%'
				},
				{
					text: 'Nguyện vọng',
					value: 'nguyenvong',
					align: 'start',
					width: '25%'
				},
				{
					text: 'Trạng thái',
					value: 'trangthai',
					align: 'start',
					width: '25%'
				},
				{
					text: 'Phê duyệt',
					value: 'actions',
					align: 'start',
					width: '15%'
				}
			]
		}
	}
	// watch: {
	// 	allProjectRegistration: {
	// 		handler(val) {
	// 			if (val) {
	// 				this.allRegis1 = val.filter(v => {
	// 					return v.topicID === v.topicID1
	// 				})
	// 			}
	// 		},
	// 		immediate: true,
	// 		deep: true
	// 	}
	// }
}
</script>
