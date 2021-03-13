<template>
	<v-card class="rounded-0 elevation-0 pa-3" height="100%">
		<div class="d-flex flex-column justify-space-between">
			<div>
				<v-card-text class="pa-8 rounded-0">
					<div class="pa-3">
						<div class="headline font-weight-bold primary--text text-center">
							Đăng ký nguyện vọng kì {{ semester }}
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
						<BaseAutocomplete
							label="Chọn nguyện vọng"
							:items="topics"
							item-text="title"
							item-value="id"
							:returnObject="false"
							v-model="topics"
						/>
						<BaseAutocomplete
							label="Hệ đào tạo"
							:items="programs"
							item-text="name"
							item-value="id"
							:returnObject="false"
						/>
						<BaseAutocomplete
							label="Môn đồ án"
							:items="courses"
							item-text="title"
							item-value="id"
							:returnObject="false"
						/>
						<BaseAutocomplete
							label="Trạng thái đăng ký trên SIS"
							:items="statusSIS"
							item-text="status"
							item-value="id"
							:returnObject="false"
						/>
						<BaseAutocomplete
							label="Thời gian"
							:items="workTime"
							item-text="timeType"
							item-value="id"
							:returnObject="false"
						/>
						<BaseInput label="Ghi chú của sinh viên (Nếu có)" height="65px" />
						<BaseAutocomplete
							label="Nguyện vọng 1"
							:items="registration"
							item-text="name"
							item-value="id"
							:returnObject="false"
						/>
						<BaseAutocomplete
							label="Nguyện vọng 2"
							:items="registration"
							item-text="name"
							item-value="id"
							:returnObject="false"
						/>
						<BaseAutocomplete
							label="Nguyện vọng 3"
							:items="registration"
							item-text="name"
							item-value="id"
							:returnObject="false"
						/>
						<div class="d-flex justify-center">
							<BaseButton text="Lưu" @click="log" />
						</div>
					</v-form>
				</v-card-text>
			</div>
		</div>
	</v-card>
</template>
<script>
// import BaseWrapper from '@/templates/wrapper/BaseWrapper'
export default {
	// components: {
	// 	BaseWrapper
	// },
	data() {
		return {
			form: {
				email: '',
				password: ''
			},
			semester: '20202',
			topics: ['Thực tập', 'Môn đồ án'],
			programs: ['SIE', 'KSTN', 'Thạc sĩ'],
			courses: [
				'IT1111-Thực tập doanh nghiệp',
				'IT1234-Thực tập kĩ thuật',
				'IT4321-Thực tập chuyên ngành'
			],
			statusSIS: ['Đã đăng ký', 'Chưa đăng ký'],
			workTime: ['Bán thời gian', 'Toàn thời gian'],
			registration: [{name: 'nguyện vọng 1'}, {name: 'nguyện vọng 2'}]
		}
	},
	methods: {
		log() {
			console.log(
				'Hien thi ra la bam nut luu thnah cong, sau nay goi API vao day'
			)
		}
	}
}
</script>
