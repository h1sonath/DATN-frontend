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
			<template v-slot:[`item.topicName`]="{item}">
				<div class="font-weight-bold">Tên đề tài: {{ item.topicName }}</div>
				<div>Mô tả: {{ item.description }}</div>
			</template>
			<template v-slot:[`item.actions`]="{item}">
				<div v-if="!item.hidden" class="d-flex flex-row">
					<BaseButton
						text="Duyệt"
						@click="acceptRegistration(item.requestID)"
						class="action-hover cursor-pointer mr-3"
					/>
					<BaseButton
						text="Từ chối"
						@click="rejectRegistration(item.requestID)"
						class="action-hover cursor-pointer"
						color="rgb(155, 5, 4)"
					/>
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
			this.$router.push('/manageProjectList')
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
			headers: [
				// {
				// 	text: 'Hệ',
				// 	value: 'program',
				// 	align: 'start',
				// 	width: '10%'
				// },
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
					width: '15%'
				},
				{
					text: 'Đề tài',
					value: 'topicName',
					align: 'start',
					width: '25%'
				},
				{
					text: 'Nguyện vọng',
					value: 'nguyenvong',
					align: 'start',
					width: '10%'
				},
				{
					text: 'Trạng thái',
					value: 'trangthai',
					align: 'start',
					width: '15%'
				},
				{
					text: 'Phê duyệt',
					value: 'actions',
					align: 'start',
					width: '25%'
				}
			]
		}
	}
}
</script>
