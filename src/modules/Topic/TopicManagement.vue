<template>
	<div class="pa-3">
		<v-data-table :headers="headers" :items="data" class="has-border"> </v-data-table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			headers: [
				{
					text: 'Giảng viên hướng dẫn',
					align: 'start',
					sortable: false,
					value: 'teacher'
				},
				{
					text: 'Đề tài',
					value: 'topic',
					align: 'start',
					sortable: false
				}
			]
		}
	}
}
</script>
<style scoped>
.table-content {
	padding: 9px 0px;
}
.table-text {
	color: blue;
	font-weight: bold;
}
</style>
