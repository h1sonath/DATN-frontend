<template>
	<div class="pa-3">
		<v-card class="rounded-0 elevation-0 pa-3" height="100%">
			<div class="pa-3">
				<div class="headline font-weight-bold primary--text">
					Cập nhật thông tin
				</div>
			</div>
			<v-card-text>
				<v-form ref="form">
					<v-row>
						<v-col sm="9" md="9" xs="12">
							<v-row>
								<v-col sm="6" md="6" xs="12">
									<!-- <div class="black--text">
										Viện đào tạo (*)
										<v-text-field
											dense
											ref="schoolName"
											:rules="[$rules.required]"
											v-model.trim="form.schoolName"
											outlined
											disabled
										></v-text-field>
									</div> -->

									<div class="black--text">
										Họ và tên (*)
									</div>
									<v-text-field
										disabled
										ref="studentName"
										dense
										:rules="[$rules.required]"
										v-model.trim="form.studentName"
										outlined
									></v-text-field>
									<!-- <div class="black--text">
										Ngày sinh (*)
									</div> -->
									<!-- <v-text-field
										disabled
										dense
										:rules="[$rules.required]"
										v-model.trim="form.dateOfBirth"
										ref="dateOfBirth"
										outlined
									></v-text-field> -->
									<div class="black--text">
										Giới tính (*)
									</div>
									<v-text-field
										dense
										ref="gender"
										:rules="[$rules.required]"
										v-model.trim="form.gender"
										outlined
									></v-text-field>
								</v-col>
								<v-col sm="6" md="6" xs="12">
									<div class="black--text">
										Email trường (*)
									</div>
									<v-text-field
										dense
										:rules="[$rules.required, $rules.email]"
										v-model.trim="form.schoolEmail"
										ref="schoolEmail"
										outlined
									></v-text-field>
									<div>
										Link facebook (*)
									</div>
									<v-text-field
										dense
										:rules="[$rules.required]"
										v-model.trim="form.facebookLink"
										ref="facebookLink"
										outlined
									></v-text-field>
									<!-- <div class="black--text">
										Điện thoại (*)
									</div> -->
									<!-- <v-text-field
										dense
										ref="phone"
										:rules="[$rules.required]"
										v-model.trim="form.phone"
										outlined
								
									></v-text-field> -->
									<div class="black--text">
										Quốc gia (*)
									</div>
									<v-text-field
										dense
										ref="country"
										:rules="[$rules.required]"
										v-model.trim="form.country"
										outlined
									></v-text-field>
									<div class="black--text">
										Quê quán (*)
									</div>
									<v-text-field
										dense
										ref="province"
										:rules="[$rules.required]"
										v-model.trim="form.province"
										outlined
									></v-text-field>
									<div class="black--text">
										Địa chỉ (*)
									</div>
									<v-text-field
										dense
										ref="address"
										:rules="[$rules.required]"
										v-model.trim="form.address"
										outlined
									></v-text-field>
								</v-col>
							</v-row>
						</v-col>
						<!-- <v-col sm="3" md="3" xs="12">
							<StudentInfo />
						</v-col> -->
					</v-row>
				</v-form>
				<BaseButton text="Cập nhật" @click="updateStudentInfomation" />
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
// import StudentInfo from '@/modules/Student/StudentInfo'
import {mapActions, mapGetters} from 'vuex'
export default {
	// components: {
	// 	StudentInfo
	// },
	async created() {
		await this.fetchStudent(this.user.studentID)
	},
	data() {
		return {
			form: {
				studentName: '',
				studentNumber: '',
				gender: '',
				schoolEmail: '',
				facebookLink: '',
				cvLink: '',
				country: '',
				province: '',
				address: ''
			}
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/getUser',
			student: 'student/getOneStudentById'
		})
	},
	methods: {
		...mapActions({
			fetchStudent: 'student/fetchStudent',
			updateStudent: 'student/updateStudent'
		}),
		async updateStudentInfomation() {
			await this.updateStudent({
				id: this.user.studentID,
        programID: '629deccf-26a9-43f1-a66e-b26d02817822',
        inYear: '1',
				studentName: this.form.studentName,
				studentNumber: this.form.studentNumber,
				gender: this.form.gender,
				schoolEmail: this.form.schoolEmail,
				facebookLink: this.form.facebookLink,
				cvLink: this.form.cvLink,
				country: this.form.country,
				province: this.form.province,
				address: this.form.address
			})
		}
	},
	watch: {
		student: {
			handler(val) {
				if (val) {
					console.log(val)
					this.form.studentName = val.studentName
					this.form.studentNumber = val.studentNumber
					this.form.gender = val.gender
					this.form.schoolEmail = val.schoolEmail
					this.form.facebookLink = val.facebookLink
					this.form.cvLink = val.cvLink
					this.form.country = val.country
					this.form.province = val.province
					this.form.address = val.address
				}
			},
			immediate: true
		}
	}
}
</script>
<style scoped>
.student-info_input {
	width: 250px;
}
</style>
