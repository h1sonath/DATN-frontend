<template>
	<div class="pa-3">
		<v-card>
			<v-card-title>
				Danh sách đề tài
				<v-spacer></v-spacer>
				<!-- <v-text-field
					v-model="textSearch"
					append-icon="mdi-magnify"
					label="Tìm kiếm"
					single-line
					hide-details
				></v-text-field> -->
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="allTopics"
				class="has-border"
				disable-sort
			>
				<template v-slot:[`item.teacher`]="{item}">
					<div class="font-weight-bold text-left">{{ item.teacherName }}</div>
					<div>{{ item.departmentName }}</div>
					<div>{{ item.phone }}1</div>
					<div>{{ item.email }}2</div>
				</template>
				<template v-slot:[`item.topic`]="{item}">
					<div class="table-text">
						{{ item.topicName }}
					</div>
					<div>
						Số SV: <span class="table-text">{{ item.maxStudent }} </span>
					</div>
					<div>
						{{ item.description }}
					</div>
					<div>
						{{ item.description }}
					</div>
				</template>
				<template v-slot:[`item.topicRegis1`]="{item}">
					<div>
						<a @click="goToRegistraion1(item)">Đăng ký</a>
					</div>
				</template>
				<template v-slot:[`item.topicRegis2`]="{item}">
					<div>
						<a @click="goToRegistraion2(item)">Đăng ký</a>
					</div>
				</template>
				<template v-slot:[`item.topicRegis3`]="{item}">
					<div>
						<a @click="goToRegistraion3(item)">Đăng ký</a>
					</div>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	async created() {
		await this.fetchTopics()
	},
	methods: {
		...mapActions({
			fetchTopics: 'topic/fetchTopics',
			setTopicID1: 'topic/setTopicID1',
			setTopicID2: 'topic/setTopicID2',
			setTopicID3: 'topic/setTopicID3'
		}),
		async goToRegistraion1(topic) {
			await this.setTopicID1(topic.topicID)
			this.$router.push('/projectRegistration')
		},
		async goToRegistraion2(topic) {
			await this.setTopicID2(topic.topicID)
			this.$router.push('/projectRegistration')
		},
		async goToRegistraion3(topic) {
			await this.setTopicID3(topic.topicID)
			this.$router.push('/projectRegistration')
		}
	},
	computed: {
		...mapGetters({
			allTopics: 'topic/getAllTopics'
		})
	},
	data() {
		return {
			// textSearch: '',
			headers: [
				{
					text: 'Giảng viên hướng dẫn',
					align: 'start',
					value: 'teacher',
					width: '20%'
				},
				{
					text: 'Đề tài',
					value: 'topic',
					align: 'start',
					width: '35%'
				},
				{
					text: 'Đăng ký nguyện vọng 1',
					value: 'topicRegis1',
					align: 'start',
					width: '15%'
				},
				{
					text: 'Đăng ký nguyện vọng 2',
					value: 'topicRegis2',
					align: 'left',
					width: '15%'
				},
				{
					text: 'Đăng ký nguyện vọng 3',
					value: 'topicRegis3',
					align: 'left',
					width: '15%'
				}
			]
		}
	}
}
</script>
<style scoped>
.table-text {
	color: blue;
	font-weight: bold;
}
</style>
