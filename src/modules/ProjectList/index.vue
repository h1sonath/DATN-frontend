<template>
	<div>
		<div>
			<div class="d-flex justify-space-between">
				<div class="text-h6 font-weight-medium mb-3">Danh sách đồ án</div>
			</div>
			<v-data-table
				:headers="headers"
				:items="data"
				disable-sort
				hide-default-footer
				class="has-border"
			>
				<template v-slot:[`item.name`]="{item}">
					<BaseTitleTable @click="$router.push(`/detail-student/${item.id}`)">{{
						item.name
					}}</BaseTitleTable>
				</template>
			</v-data-table>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			data: [
				{
					semester: '20201',
					code: 159,
				}
			],
			headers: [
				{
					text: 'Kì học',
					align: 'start',
					sortable: false,
					value: 'semester'
				},
				{text: 'Mã học phần', value: 'code', align: 'start', sortable: false}
			]
		}
	}
}
</script>
