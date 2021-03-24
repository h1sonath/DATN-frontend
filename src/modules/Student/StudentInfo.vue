<template>
	<div>
		<div class="text-h6 font-weight-medium mb-3">
			Tên-MSSV
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
	data() {
		return {
			studentInfo: [
				{title: 'Hệ:', info: 'SIE'},
				{title: 'Khóa:'},
				{title: 'Email:'},
				{title: 'Điện thoại:'},
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
