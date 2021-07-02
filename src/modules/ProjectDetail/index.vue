<template>
	<v-card class="rounded-0 elevation-0 pa-3" height="100%">
		<div class="d-flex flex-column justify-space-between">
			<div>
				<v-card-text class="pa-3 rounded-0">
					<div class="pa-3">
						<div class="headline font-weight-bold primary--text text-center">
							Nộp báo cáo
						</div>
					</div>
					<v-form ref="form" class="pa-3">
						<BaseInput
							v-if="currentProject.teacher"
							disabled
							label="Giảng viên hướng dẫn"
							item-text="name"
							item-value="id"
							v-model="currentProject.teacher.teacherName"
						/>
						<BaseInput
							disabled
							label="Học phần"
							item-text="title"
							item-value="id"
							v-model="currentProject.course"
						/>
						<BaseInput
							v-if="currentProject.topic"
							disabled
							label="Tên đề tài"
							item-text="title"
							item-value="id"
							v-model="currentProject.topic.topicName"
						/>
						<BaseInput
							disabled
							label="Nhận xét của giáo viên"
							item-text="teacherComment"
							item-value="id"
							v-model="currentProject.teacherComment"
						/>
						<template>
							<div class="text-h6">
								Nộp báo cáo
							</div>
							<div >
								<div class="large-12 medium-12 small-12 cell">
									<input
										type="file"
										id="file"
										ref="file"
										v-on:change="handleFileUpload()"
									/>
								</div>
							</div>
						</template>
						<!-- <BaseEditor min-height="150" class="mb-6" /> -->
						<div class="d-flex justify-center">
							<BaseButton icon="mdi-content-save-outline" text="Lưu" @click="saveProject()" />
						</div>
					</v-form>
				</v-card-text>
			</div>
		</div>
	</v-card>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	async created() {
		const id = this.$route.params.id
		await this.fetchProjectByID(id)
	},
	data() {
		return {}
	},
	computed: {
		...mapGetters({
			currentProject: 'project/getOneProjectById',
			getDocument: 'document/document'
		})
	},
	methods: {
		...mapActions({
			updateProject: 'project/updateStudentProject',
			createDocument: 'document/createDocument',
			fetchProjectByID: 'project/fetchProject'
		}),
		async saveProject() {
			await this.updateProject({
				id: this.$route.params.id,
				reportFile: this.getDocument
			})
			this.$message.success('Lưu thành công')
		},
		async handleFileUpload() {
			const formData = new FormData()
			this.$refs.file.files[0].filename = this.$refs.file.files[0].name
			this.file = this.$refs.file.files[0]
			formData.append('file', this.file)
			await this.createDocument(formData)
		}
	},
	watch: {
		getDocument: {
			handler(val) {
				if (val) {
					console.log(val)
				}
			},
			immediate: true
		}
	}
}
</script>
