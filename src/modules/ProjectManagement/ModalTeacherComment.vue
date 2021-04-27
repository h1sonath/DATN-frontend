<template>
	<div class="text-center">
		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Đánh giá kết quả môn học
				</v-card-title>
				<div class="pa-3">
					<div class="body-1 font-weight-bold">
						Nhận xét
					</div>

					<v-text-field dense v-model="currentProject.teacherComment"> </v-text-field>
				</div>
				<div class="pa-3">
					<div class="body-1 font-weight-bold">
						Điểm môn học
					</div>
					<v-text-field type="number" dense v-model="currentProject.score"> </v-text-field>
				</div>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<BaseButton text="Lưu" @click="closeDialog"/>
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
			comment: '',
			dialog: false,
			currentProject: {}
		}
	},
	methods: {
		...mapActions({
			updateTeacherProject: 'project/updateTeacherProject'
		}),
		openDialog(project) {
			this.dialog = true
			this.currentProject = project
		},
		closeDialog() {
			this.dialog = false
			this.$emit('saveComment', this.currentProject)
		}
	}
}
</script>
