<template>
	<div class="pa-3">
		<div v-if="!allProjects"></div>
		<div v-else>
			<v-data-table
				:headers="headers"
				:items="allProjects"
				disable-sort
				class="has-border"
			>
				<template v-slot:[`item.student`]="{item}">
					<div class="font-weight-bold text-left">{{ item.studentName }}</div>
					<div>{{item.studentNumber}}</div>
				</template>
				<template v-slot:[`item.topic`]="{item}">
					<div class="font-weight-bold text-left">{{ item.topicName }}</div>
					<div>{{ item.description || 'Mô tả đề tài' }}</div>
				</template>
				<template v-slot:[`item.teacherComment`]="{item}">
					<a @click="openCommentDialog(item)">
						Mở đánh giá
					</a>
				</template>
				<template v-slot:[`item.reportFile`]="{item}">
					<div v-if="item.reportFile">
						<a @click="download(item.reportFile)">Báo cáo</a>
					</div>
					<div v-else>
						Sinh viên chưa nộp báo cáo
					</div>
				</template>
			</v-data-table>
			<ModalTeacherComment
				@saveComment="project => saveComment(project)"
				ref="dialog-control"
			/>
		</div>
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
			updateTeacherProject: 'project/updateTeacherProject',
			getFile: 'document/fetchDocument'
		}),
		async download(reportFile) {
			await this.getFile(reportFile)
			window.open('http://codedidungso.me:5000' + reportFile)
		},
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
					text: 'Sinh viên',
					value: 'student',
					align: 'start',
					sortable: false
				},
				{
					text: 'Tên học phần',
					value: 'course',
					align: 'start',
					sortable: false
				},
				{
					text: 'Đề tài',
					value: 'topic',
					align: 'start',
					sortable: false,
					width: '30%'
				},
				{
					text: 'Link báo cáo',
					value: 'reportFile',
					align: 'start',
					sortable: false,
					width: '20%'
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
