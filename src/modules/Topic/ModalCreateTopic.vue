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

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="closeDialog">
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
	// props: {
	// 	project: Object
	// },
	data() {
		return {
			dialog: false,
			description: '',
      topicName: '',
      maxStudent: 10
		}
	},
	methods: {
		...mapActions({
			createTopic: 'topic/createTopic'
		}),
		openDialog() {
			this.dialog = true
		},
		closeDialog() {
			this.dialog = false
		}
	}
}
</script>
