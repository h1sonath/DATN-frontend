<template>
	<v-card class="rounded-0 elevation-0 pa-3" height="100%">
		<div class="d-flex flex-column justify-space-between">
			<div>
				<v-card-text class="pa-8 rounded-0">
					<div class="pa-3">
						<div class="headline font-weight-bold primary--text text-center">
							Đăng ký nguyện vọng kì {{ form.semester }}
						</div>
						<div class="subtitle-2  font-weight-bold primary--text ">
							Lưu ý: Tra cứu Danh sách đề tài
							<span
								class="text-decoration-underline cursor-pointer"
								@click="$router.push('/topicList')"
								>Tại đây</span
							>
						</div>
					</div>

					<v-form ref="form" class="pa-3">
						<!-- <BaseAutocomplete
							label="Chọn nguyện vọng"
							:items="topics"
							item-text="title"
							item-value="id"
							:returnObject="false"
							v-model="topics"
						/> -->
						<!-- <BaseAutocomplete
							label="Hệ đào tạo"
							:items="programs"
							item-text="name"
							item-value="id"
							:returnObject="false"
						/> -->
						<!-- <BaseAutocomplete
							label="Môn đồ án"
							:items="courses"
							item-text="title"
							item-value="id"
							:returnObject="false"
						/> -->
						<BaseAutocomplete
							label="Trạng thái đăng ký trên SIS"
							:items="[
								{title: 'approved', value: 'approved'},
								{title: 'not-approved', value: 'not-approved'}
							]"
							item-text="title"
							item-value="value"
							:returnObject="false"
							v-model="form.SIS_status"
						/>
						<BaseAutocomplete
							label="Thời gian"
							:items="[
								{title: 'part-time', value: 'part-time'},
								{title: 'full-time', value: 'full-time'}
							]"
							item-text="title"
							item-value="value"
							:returnObject="false"
							v-model="form.workTime"
						/>
						<BaseInput label="Ghi chú của sinh viên (Nếu có)" height="65px" />
						<BaseAutocomplete
							label="Nguyện vọng 1"
							:items="getAllTopics"
							item-text="topicName"
							item-value="topicID"
							:returnObject="false"
							v-model="form.topicID1"
						/>
						<BaseAutocomplete
							label="Nguyện vọng 2"
							:items="getAllTopics"
							item-text="topicName"
							item-value="topicID"
							:returnObject="false"
							v-model="form.topicID2"
						/>
						<BaseAutocomplete
							label="Nguyện vọng 3"
							:items="getAllTopics"
							item-text="topicName"
							item-value="topicID"
							:returnObject="false"
							v-model="form.topicID3"
						/>
						<div class="d-flex justify-center">
							<BaseButton text="Lưu" @click="createRequest" />
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
		await this.fetchTopics()
	},
	computed: {
		...mapGetters({
			getAllTopics: 'topic/getAllTopics'
		})
	},
	data() {
		return {
			form: {
				topicID1: '',
				topicID2: '',
				topicID3: '',
				SIS_status: '',
				workTime: '',
				semester: '20201'
			}
		}
	},
	methods: {
		...mapActions({
			fetchTopics: 'topic/fetchTopics',
			createProjectRegistration: 'projectRegistration/createProjectRegistration'
		}),
		log() {
			console.log(
				'Hien thi ra la bam nut luu thnah cong, sau nay goi API vao day'
			)
		},
		async createRequest() {
			await this.createProjectRegistration({
				studentID: '3e7bc42c-bae6-4518-aa62-e8afae5fec67',
				note: 'Đồ án',
				topicID1: this.form.topicID1,
				topicID2: this.form.topicID2,
				topicID3: this.form.topicID3,
				timeType: this.form.workTime,
				SIS_status: this.form.SIS_status,
				englishScore: '850 Toeic',
				creditDebt: '0',
				semester: this.form.semester
			})
		}
	}
}
</script>
