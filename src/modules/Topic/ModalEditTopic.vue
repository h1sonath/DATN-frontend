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
					<v-btn color="primary" text @click="updateCurrentTopic">
						Lưu
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
	props: {
		allCompany: Array
	},
	data() {
		return {
			currentTopic: {},
			dialog: false,
			description: '',
			topicName: '',
			maxStudent: 10,
			companyID: ''
		}
	},
	methods: {
		...mapActions({
			updateTopic: 'topic/updateTopic'
		}),
		openDialog(currentTopic) {
			this.currentTopic = currentTopic
			this.dialog = true
		},
		async updateCurrentTopic() {
			await this.updateTopic({
				id: this.currentTopic.topicID,
				description: this.description,
				topicName: this.topicName,
				maxStudent: this.maxStudent,
				teacherID: this.currentTopic.teacherID,
				companyID: this.companyID
			})
			this.dialog = false
			this.$message.success('Lưu chỉnh sửa đề tài thành công')
			location.reload()
		}
	},
	watch: {
		currentTopic: {
			handler(val) {
				if (val) {
					this.description = val.description
					this.maxStudent = val.maxStudent
					this.topicName = val.topicName
					this.companyID = val.companyID
				}
			},
			immediate: true
		}
	}
}
</script>
