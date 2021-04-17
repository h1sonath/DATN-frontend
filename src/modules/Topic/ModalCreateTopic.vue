<template>
	<div class="text-center">
		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Đánh giá kết quả môn học
				</v-card-title>
				<div class="pa-3">
					<div class="body-1 font-weight-bold">
						Tên đề tài
					</div>
					<v-text-field dense v-model="topicName"> </v-text-field>
				</div>
				<div class="pa-3">
					<div class="body-1 font-weight-bold">
						Mô tả đề tài
					</div>
					<v-text-field dense v-model="description"> </v-text-field>
				</div>
				<div class="pa-3">
					<div class="body-1 font-weight-bold">
						Số nguyện vọg tối đa
					</div>
					<v-text-field dense v-model="maxStudent"> </v-text-field>
				</div>
				<div class="pa-3">
					<div class="body-1 font-weight-bold">
						Công ty hướng dẫn
					</div>
					<v-autocomplete
						dense
						:items="allCompany"
						item-text="companyName"
						item-value="companyID"
						:returnObject="false"
						v-model="companyID"
					>
					</v-autocomplete>
				</div>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="createNewTopic">
						Tạo
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	props: {
		teacherID: String
	},
	data() {
		return {
			dialog: false,
			description: '',
			topicName: '',
			maxStudent: 10,
			companyID: ''
		}
	},
	async created() {
		await this.fetchCompanies()
	},
	computed: {
		...mapGetters({
			allCompany: 'company/getAllCompany'
		})
	},
	methods: {
		...mapActions({
			fetchCompanies: 'company/fetchCompanies',
			createTopic: 'topic/createTopic'
		}),
		openDialog() {
			this.dialog = true
		},
		async createNewTopic() {
			await this.createTopic({
				description: this.description,
				topicName: this.topicName,
				maxStudent: this.maxStudent,
				teacherID: this.teacherID,
				companyID: this.companyID
			})
			this.dialog = false
			this.$message.success('Tạo đề tài mới thành công')
			location.reload()
		}
	}
}
</script>
