<template>
	<div class="pa-3">
		<v-data-table
			:headers="headers"
			:items="companies"
			disable-sort
			class="has-border"
		>
			<template v-slot:[`item.contact`]="{item}">
				<div class="font-weight-bold">
					{{ item.contactName }}
				</div>
				<div>
					{{ item.phone }}
				</div>
				<div>
					{{ item.email }}
				</div>
			</template>
		</v-data-table>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			data: [],
			headers: [
				{
					text: 'Tên công ty',
					align: 'start',
					sortable: false,
					value: 'companyName'
				},
				{
					text: 'Website',
					value: 'website',
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
					text: 'Số project',
					value: 'countProject',
					align: 'start',
					sortable: false
				},
				{
					text: 'Liên hệ',
					value: 'contact',
					align: 'start',
					sortable: false
				}
			]
		}
	},
	async created() {
		await this.fetchCompanies()
	},
	methods: {
		...mapActions({
			fetchCompanies: 'company/fetchCompanies'
		})
	},
	computed: {
		...mapGetters({
			companies: 'company/getAllCompany'
		})
	}
}
</script>
