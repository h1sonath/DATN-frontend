<template>
	<div class="pa-3">
		<div class="pb-6 d-flex justify-end">
			<BaseButton text="Tạo đề tài mới" @click="openCreateDialogTopic" />
			<ModalCreateTopic
				ref="create-dialog-control"
				:teacherID="topics.teacherID"
			/>
		</div>
		<div class="search-input">
			<BaseInput
				v-model="textSearch"
				label="Tìm kiếm theo tên đề tài"
				height="20px"
				prepend-inner-icon="mdi-magnify"
			/>
		</div>
		<v-data-table
			disable-sort
			:headers="headers"
			:items="teacherTopics"
			class="has-border"
			:search="textSearch"
		>
			<!-- <template v-slot:[`item.teacher`]="{item}">
				<div class="font-weight-bold text-left">{{ item.teacherName }}</div>
				<div>{{ item.phone || 'Sđt: Cần cập nhật' }}</div>
				<div>{{ item.email || 'Email: Cần cập nhật' }}</div>
			</template> -->
			<template v-slot:[`item.topicName`]="{item}">
				<div class="font-weight-bold text-left">{{ item.topicName }}</div>
				<div>{{ item.description || 'Mô tả đề tài' }}</div>
			</template>
			<template v-slot:[`item.actions`]="{item}">
				<a @click="openEditDialogTopic(item)">Chỉnh sửa</a>
			</template>
		</v-data-table>
		<ModalEditTopic ref="edit-dialog-control" :allCompany="allCompany" />
	</div>
</template>
<script>
import ModalCreateTopic from '@/modules/Topic/ModalCreateTopic'
import ModalEditTopic from '@/modules/Topic/ModalEditTopic'
import {mapActions, mapGetters} from 'vuex'
export default {
	components: {
		ModalCreateTopic,
		ModalEditTopic
	},
	async created() {
		await this.fetchTeacherTopic()
		await this.fetchCompanies()
	},
	methods: {
		...mapActions({
			fetchTeacherTopic: 'topic/fetchTeacherTopic',
			fetchCompanies: 'company/fetchCompanies'
		}),
		openCreateDialogTopic() {
			this.$refs['create-dialog-control'].openDialog()
		},
		openEditDialogTopic(item) {
			this.$refs['edit-dialog-control'].openDialog(item)
		}
	},
	computed: {
		...mapGetters({
			teacherTopics: 'topic/getAllTopics',
			allCompany: 'company/getAllCompany'
		})
	},
	data() {
		return {
			textSearch: '',
			topics: [],
			headers: [
				{
					text: 'Đề tài',
					value: 'topicName',
					align: 'start',
					width: '30%'
				},
				{
					text: 'Số nguyện vọng tối đa',
					value: 'maxStudent',
					align: 'center',
					width: '20%'
				},
				{
					text: 'Thao tác',
					value: 'actions',
					align: 'center',
					width: '25%'
				}
			]
		}
	},
	watch: {
		teacherTopics: {
			handler(val) {
				if (val) {
					this.topics = val
				}
			},
			immediate: true
		}
	}
}
</script>
<style scoped>
.table-content {
	padding: 9px 0px;
}
.table-text {
	color: blue;
	font-weight: bold;
}
.search-input {
	width: 30%;
}
</style>
