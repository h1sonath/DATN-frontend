<template>
	<div class="pa-3">
		<v-row>
			<v-col lg="9">
				<div style="border-right:1px ridge black">
					<div class="text-h6 font-weight-medium mb-3">Danh sách đồ án</div>
					<AllProjectTable />
					<br />
					<div class="text-h6 font-weight-medium mb-3">Đồ án kì hiện tại</div>
					<CurrentProjectTable />
				</div>
			</v-col>
			<v-col lg="3">
				<StudentInfo />
			</v-col>
		</v-row>
	</div>
</template>
<script>
import AllProjectTable from '@/modules/ProjectList/AllProjectTable'
import CurrentProjectTable from '@/modules/ProjectList/CurrentProjectTable'
import StudentInfo from '@/modules/Student/StudentInfo'
export default {
	components: {
		AllProjectTable,
		CurrentProjectTable,
		StudentInfo
	}
}
</script>
