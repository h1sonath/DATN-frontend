<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="data"
			disable-sort
			hide-default-footer
			class="has-border"
		>
		</v-data-table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			data: [],
			headers: [
				{
					text: 'Tên công ty',
					align: 'start',
					sortable: false,
					value: 'name'
				},
				{
					text: 'Website',
					value: 'siteName',
					align: 'start',
					sortable: false
				},
				{
					text: 'Số đề tài',
					value: 'countTopic',
					align: 'start',
					sortable: false
				},
				{
					text: 'Số nguyện vọng',
					value: 'maxRegistration',
					align: 'start',
					sortable: false
				},
				{text: 'Nguyện vọng', value: 'countRegistration', align: 'start', sortable: false},
				{
					text: 'Liên hệ',
					value: 'contact',
					align: 'start',
					sortable: false
				}
			]
		}
	}
}
</script>
