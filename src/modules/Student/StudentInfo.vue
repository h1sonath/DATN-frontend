<template>
	<div>
		<div class="text-h6 font-weight-medium mb-3">
			{{student.studentName}}-{{student.studentNumber}}
		</div>
		<div v-for="(item, index) in studentInfo" :key="index" class="student-info">
			<v-icon class="mr-2">mdi-file-account-outline</v-icon>
			{{ item.title }} {{ item.info }}
		</div>
		<a class="pt-2 pb-2 action-hover" @click="goToChangeStudentInfo">
			[Cập nhật thông tin]
		</a>
	</div>
</template>
<script>
export default {
	props: {
		student: Object
	},
	data() {
		return {
			studentInfo: [
				{title: 'Hệ:', info: this.student.programID},
				{title: 'Khóa:', info: this.student.inYear},
				{title: 'Email:', info: this.student.schoolEmail},
				{title: 'Điện thoại:', info: this.student.phone},
				{title: 'Lớp:'}
			]
		}
	},
	methods: {
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
