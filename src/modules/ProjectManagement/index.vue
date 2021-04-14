<template>
	<div class="pa-3">
		<v-data-table
			:headers="headers"
			:items="allProjects"
			disable-sort
			class="has-border"
		>
			<template v-slot:[`item.teacherComment`]="{item}">
				<v-btn @click="openCommentDialog(item)">
					Mở đánh giá
				</v-btn>
			</template>
			<template v-slot:[`item.reportLink`]="{item}">
				<a @click="$router.push(`${item.reportLink}`)">Báo cáo</a>
			</template>
		</v-data-table>
		<ModalTeacherComment
			@saveComment="project => saveComment(project)"
			ref="dialog-control"
		/>
	</div>
</template>
<script>
import ModalTeacherComment from '@/modules/ProjectManagement/ModalTeacherComment'
import {mapActions, mapGetters} from 'vuex'
export default {
	components: {
		ModalTeacherComment
	},
	async created() {
		await this.fetchAllTeacherProjects()
	},
	methods: {
		...mapActions({
			fetchAllTeacherProjects: 'project/fetchAllTeacherProjects',
			updateTeacherProject: 'project/updateTeacherProject'
		}),
		openCommentDialog(project) {
			this.$refs['dialog-control'].openDialog(project)
		},
		async saveComment(project) {
			if (
				project.score === null ||
				project.score === 0 ||
				project.score === undefined
			) {
				await this.updateTeacherProject({
					id: project.projectID,
					...project,
					score: 0,
					teacherComment: project.teacherComment
				})
			} else {
				await this.updateTeacherProject({
					id: project.projectID,
					...project,
					teacherComment: project.teacherComment
				})
			}
		}
	},
	computed: {
		...mapGetters({
			projects: 'project/getAllProject'
		})
	},
	data() {
		return {
			allProjects: [],
			dialog: false,
			headers: [
				{
					text: 'Mã học phần',
					align: 'coureNumber',
					sortable: false,
					value: 'name'
				},
				{
					text: 'Mã số sinh viên',
					value: 'studentNumber',
					align: 'start',
					sortable: false
				},
				{
					text: 'Tên học phần',
					value: 'courseName',
					align: 'start',
					sortable: false
				},
				{
					text: 'Tên đề tài',
					value: 'topicName',
					align: 'start',
					sortable: false,
          width: "30%"
				},
				{
					text: 'Link báo cáo',
					value: 'reportLink',
					align: 'start',
					sortable: false
				},
				{
					text: 'Đánh giá',
					value: 'teacherComment',
					align: 'center',
					sortable: false
				}
			]
		}
	},
	watch: {
		projects: {
			handler(val) {
				if (val) {
					this.allProjects = val
				}
			},
			immediate: true
		}
	}
}
</script>
