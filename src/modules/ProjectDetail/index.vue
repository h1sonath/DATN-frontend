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
							disabled
							label="Giảng viên hướng dẫn"
							item-text="name"
							item-value="id"
							v-model="teacher.name"
						/>
						<BaseInput
							disabled
							label="Học phần"
							item-text="title"
							item-value="id"
							v-model="course.name"
						/>
						<BaseInput
							disabled
							label="Tên đề tài"
							item-text="title"
							item-value="id"
							v-model="topic.name"
						/>
						<template>
							<div class="container">
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
						<BaseEditor min-height="150" class="mb-6" />
						<div class="d-flex justify-center">
							<BaseButton text="Lưu" @click="saveProject()" />
						</div>
					</v-form>
				</v-card-text>
			</div>
		</div>
	</v-card>
</template>
<script>
import {mapActions} from 'vuex'
export default {
	async created() {
		const id = this.$route.params.id
		console.log('goi api fetch ProjectByID' + id)
	},
	data() {
		return {
			file: {},
			teacher: {
				name: 'Nguyễn Tiến Thành'
			},
			course: {
				name: 'IT-1900'
			},
			topic: {
				name: 'Làm web QLĐT'
			}
		}
	},
	methods: {
		...mapActions({
			createDocument: 'document/createDocument'
		}),
		// async saveProject() {},
		async handleFileUpload() {
			this.$refs.file.files[0].filename = this.$refs.file.files[0].name
			this.file = this.$refs.file.files[0]
			await this.createDocument(this.file)
		}
	}
}
</script>
