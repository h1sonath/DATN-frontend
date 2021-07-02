<template>
	<div class="pa-3">
		<v-row>
			<v-col lg="9">
				<div>
					<div class="tit text-h6 font-weight-medium mb-3">
						Nguyện vọng chờ phê duyệt
					</div>
					<RegistrationList :studentRegistrations="studentRegistrations" />
					<br />
					<div class="tit text-h6 font-weight-medium mb-3">Danh sách đồ án</div>
					<AllProjectTable :studentProjects="studentProjects" />
					<br />
					<!-- <div class="text-h6 font-weight-medium mb-3">Đồ án kì hiện tại</div>
					<CurrentProjectTable /> -->
				</div>
			</v-col>
			<v-col lg="3">
				<StudentInfo v-if="user" :student="user.student" />
			</v-col>
		</v-row>
	</div>
</template>
<script>
import AllProjectTable from '@/modules/ProjectList/AllProjectTable'
// import CurrentProjectTable from '@/modules/ProjectList/CurrentProjectTable'
import StudentInfo from '@/modules/Student/StudentInfo'
import RegistrationList from '@/modules/ProjectList/RegistrationList'
import {mapActions, mapGetters} from 'vuex'
export default {
	components: {
		AllProjectTable,
		// CurrentProjectTable,
		StudentInfo,
		RegistrationList
	},
	async created() {
		await this.setTopicID1(null)
		await this.setTopicID2(null)
		await this.setTopicID3(null)
		await this.fetchAllStudentProjects()
		await this.fetchProjectRegistrationsFromStudent()
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/getUser',
			studentProjects: 'project/getAllProject',
			studentRegistrations: 'projectRegistration/getAllProjectRegistration'
		})
	},
	methods: {
		...mapActions({
			setTopicID1: 'topic/setTopicID1',
			setTopicID2: 'topic/setTopicID2',
			setTopicID3: 'topic/setTopicID3',
			fetchAllStudentProjects: 'project/fetchAllStudentProjects',
			fetchProjectRegistrationsFromStudent:
				'projectRegistration/fetchProjectRegistrationsFromStudent'
		})
	}
}
</script>
<style scoped>
</style>
