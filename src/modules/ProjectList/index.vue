<template>
	<div class="pa-3">
		<v-row>
			<v-col lg="9">
				<div class="text-h6 font-weight-medium mb-3">Danh sách đồ án</div>
				<AllProjectTable />
				<br />
				<div class="text-h6 font-weight-medium mb-3">Đồ án kì hiện tại</div>
				<CurrentProjectTable />
			</v-col>
			<v-col lg="3">
				<div class="text-h6 font-weight-medium mb-3">
					Thông tin sinh viên
				</div>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import AllProjectTable from '@/modules/ProjectList/AllProjectTable'
import CurrentProjectTable from '@/modules/ProjectList/CurrentProjectTable'
export default {
	components: {
		AllProjectTable,
		CurrentProjectTable
	}
}
</script>
