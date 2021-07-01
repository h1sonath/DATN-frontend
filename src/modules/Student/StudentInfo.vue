<template>
	<div>
		<div class="text-h6 font-weight-medium mb-3">
			{{ student.studentName }}-{{ student.studentNumber }}
		</div>
		<div v-if="accountInfo">
			<div
				v-for="(item, index) in studentInfo"
				:key="index"
				class="student-info"
			>
				<v-icon class="mr-2">mdi-file-account-outline</v-icon>
				{{ item.title }} {{ item.info }}
			</div>
			<a class="pt-2 pb-2 action-hover" @click="goToChangeStudentInfo">
				[Cập nhật thông tin]
			</a>
		</div>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	props: {
		student: Object
	},
	async created() {
		await this.fetchAccount()
		if (this.student && this.student.programID) {
			await this.fetchProgram(this.student.programID)
		}
	},
	data() {
		return {
			accountInfo: {}
		}
	},
	computed: {
		...mapGetters({
			currentAccount: 'account/getCurrentAccount',
			program: 'program/getOneProgramById'
		}),
		studentInfo() {
			return [
				{title: 'Hệ:', info: this.program.schoolName},
				{title: 'Email:', info: this.student.schoolEmail},
				{title: 'Điện thoại:', info: this.currentAccount.phone}
			]
		}
	},
	methods: {
		...mapActions({
			fetchAccount: 'account/fetchAccount',
			fetchProgram: 'program/fetchProgram'
		}),
		goToChangeStudentInfo() {
			if (this.$route.path !== '/changeStudentInfo')
				this.$router.push('/changeStudentInfo')
		}
	}
}
</script>
<style scoped>
.student-info {
	border-bottom: 1px solid #f4f5f6;
	padding-top: 6px;
	padding-bottom: 6px;
}
</style>
