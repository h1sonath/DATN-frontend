<template>
	<div class="pa-3">
		<v-card>
			<v-card-title>
				Danh sách doanh nghiệp/công ty
				<v-spacer></v-spacer>
			</v-card-title>
			<div class="search-input pa-3"> 
				<BaseInput
					v-model="textSearch"
					label="Tìm kiếm theo tên doanh nghiệp/công ty"
					height="20px"
					prepend-inner-icon="mdi-magnify"
				/>
			</div>

			<v-data-table
				:headers="headers"
				:items="companies"
				disable-sort
				:search="textSearch"
				class="has-border"
			>
				<template v-slot:[`item.companyName`]="{item}">
					<div class="font-weight-bold">
						{{ item.companyName }}
					</div>
				</template>
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
		</v-card>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			textSearch: '',
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
		await this.fetchCompanies({size: 100})
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
<style scoped>
.search-input {
	width: 30%;
}
</style>
