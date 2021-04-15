<template>
	<v-card class="rounded-0 elevation-0 pa-3" height="100%">
		<div class="d-flex flex-column justify-space-between">
			<div>
				<v-card-text class="pa-8 rounded-0">
					<div class="pa-3">
						<div class="headline font-weight-bold primary--text text-center">
							Đăng ký nguyện vọng kì {{ form.semester }}
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
							:rules="[$rules.required]"
						/>
						<BaseInput
							v-model="form.englishScore"
							label="Điểm tiếng Anh"
							height="20px"
							:rules="[$rules.required]"
						/>
						<BaseInput
							type="number"
							v-model="form.creditDebt"
							label="Số tín chỉ nợ"
							height="20px"
							:rules="[$rules.required]"
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
							:rules="[$rules.required]"
						/>
						<BaseInput label="Ghi chú của sinh viên (Nếu có)" height="65px" />
						<!-- 
						<BaseAutocomplete
							label="Nguyện vọng 1"
							:items="allTopic"
							item-text="topicName"
							item-value="topicID"
							:returnObject="false"
							v-model="form.topicID1"
							:rules="[$rules.required]"
						/>
						<BaseAutocomplete
							label="Nguyện vọng 2"
							:items="allTopic"
							item-text="topicName"
							item-value="topicID"
							:returnObject="false"
							v-model="form.topicID2"
							:rules="[$rules.required]"
						/>
						<BaseAutocomplete
							label="Nguyện vọng 3"
							:items="allTopic"
							item-text="topicName"
							item-value="topicID"
							:returnObject="false"
							v-model="form.topicID3"
							:rules="[$rules.required]"
						/> -->
						<div class="mb-3">
							<div class="subtitle-1 font-weight-bold" v-if="topic1">
								Nguyện vọng 1: <a>{{ topic1.topicName }} </a>
								<a @click="$router.push('/topicList')" class="has-underline"
									>Chọn lại</a
								>
							</div>
							<div class="subtitle-1 font-weight-bold" v-else>
								Nguyện vọng 1:
								<a @click="$router.push('/topicList')">Chọn đề tài tại đây</a>
							</div>
						</div>
						<div class="mb-3">
							<div class="subtitle-1 font-weight-bold" v-if="topic2">
								Nguyện vọng 2: <a>{{ topic2.topicName }} </a>
								<a @click="$router.push('/topicList')" class="has-underline"
									>Chọn lại</a
								>
							</div>
							<div class="subtitle-1 font-weight-bold" v-else>
								Nguyện vọng 2:
								<a @click="$router.push('/topicList')">Chọn đề tài tại đây</a>
							</div>
						</div>
						<div class="mb-3">
							<div class="subtitle-1 font-weight-bold" v-if="topic3">
								Nguyện vọng 3: <a>{{ topic3.topicName }} </a>
								<a @click="$router.push('/topicList')" class="has-underline"
									>Chọn lại</a
								>
							</div>
							<div class="subtitle-1 font-weight-bold" v-else>
								Nguyện vọng 3:
								<a @click="$router.push('/topicList')">Chọn đề tài tại đây</a>
							</div>
						</div>

						<div class="d-flex justify-center">
							<BaseButton text="Đăng ký" @click="createRequest" />
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
		await this.fetchAllTopicID()
	},
	computed: {
		...mapGetters({
			allTopic: 'topic/getAllTopicsShortInfo',
			user: 'auth/getUser',
			getTopicRegis1: 'topic/getTopicRegis1',
			getTopicRegis2: 'topic/getTopicRegis2',
			getTopicRegis3: 'topic/getTopicRegis3'
		}),
		topic1() {
			return this.allTopic.find(topic => {
				return topic.topicID === this.form.topicID1
			})
		},
		topic2() {
			return this.allTopic.find(topic => {
				return topic.topicID === this.form.topicID2
			})
		},
		topic3() {
			return this.allTopic.find(topic => {
				return topic.topicID === this.form.topicID3
			})
		}
	},
	data() {
		return {
			form: {
				topicID1: '',
				topicID2: '',
				topicID3: '',
				note: '',
				SIS_status: '',
				workTime: '',
				semester: '20201',
				englishScore: '',
				creditDebt: ''
			}
		}
	},
	methods: {
		...mapActions({
			fetchAllTopicID: 'topic/fetchAllTopicID',
			createProjectRegistration: 'projectRegistration/createProjectRegistration'
		}),
		async createRequest() {
			if (!this.$refs.form.validate()) return
			if (
				this.form.topicID1 === this.form.topicID2 ||
				this.form.topicID2 === this.form.topicID3 ||
				this.form.topicID3 === this.form.topicID1
			) {
				this.$message.error('Không được đăng ký nguyện vọng trùng đề tài')
				return
			} else {
				try {
					await this.createProjectRegistration({
						studentID: this.user.studentID,
						note: 'Đồ án',
						topicID1: this.form.topicID1,
						topicID2: this.form.topicID2,
						topicID3: this.form.topicID3,
						timeType: this.form.workTime,
						SIS_status: this.form.SIS_status,
						englishScore: this.form.englishScore,
						creditDebt: this.form.creditDebt,
						semester: this.form.semester
					})
					this.$message.success('Đã tạo bản đăng ký nguyện vọng thành công')
					this.$router.push('/projectList')
				} catch (error) {
					this.$message.error(error)
				}
			}
		}
	},
	watch: {
		getTopicRegis1: {
			handler(val) {
				if (val) {
					this.form.topicID1 = val
				}
			},
			immediate: true
		},
		getTopicRegis2: {
			handler(val) {
				if (val) {
					this.form.topicID2 = val
				}
			},
			immediate: true
		},
		getTopicRegis3: {
			handler(val) {
				if (val) {
					this.form.topicID3 = val
				}
			},
			immediate: true
		}
	}
}
</script>
