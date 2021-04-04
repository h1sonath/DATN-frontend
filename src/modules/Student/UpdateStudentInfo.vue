<template>
	<div class="pa-3">
		<v-card class="rounded-0 elevation-0 pa-3" height="100%">
			<v-form ref="form">
				<v-row>
					<v-col sm="9" md="9" xs="12">
						<div class="headline font-weight-bold primary--text pa-3">
							Cập nhật thông tin
						</div>
						<v-row class="pa-3">
							<v-col sm="6" md="6" xs="12">
								<div class="black--text">
									Hệ (*)
									<v-text-field
										dense
										ref="schoolName"
										:rules="[$rules.required]"
										v-model.trim="program.schoolName"
										outlined
										disabled
									></v-text-field>
								</div>
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
								<div class="black--text">
									Email cá nhân (*)
								</div>
								<v-text-field
									dense
									:rules="[$rules.required, $rules.email]"
									v-model.trim="form.email"
									ref="email"
									outlined
								></v-text-field>
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
							<v-col
								sm="6"
								md="6"
								xs="12"
								style="border-right: 1px solid black"
							>
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
								<div class="black--text">
									Điện thoại (*)
								</div>
								<v-text-field
									dense
									ref="phone"
									:rules="[$rules.required, $rules.phone]"
									v-model.trim="form.phone"
									outlined
								></v-text-field>
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
					<v-col sm="3" md="3" xs="12">
						<StudentInfo v-if="user" :student="user.student" />
					</v-col>
				</v-row>
			</v-form>
			<BaseButton text="Cập nhật" @click="updateStudentInfomation" />
		</v-card>
	</div>
</template>
<script>
import StudentInfo from '@/modules/Student/StudentInfo'
import {mapActions, mapGetters} from 'vuex'
export default {
	components: {
		StudentInfo
	},
	async created() {
		await this.fetchProgram(this.user.student.programID)
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
				address: '',
				email: '',
				phone: ''
			}
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/getUser',
			program: 'program/getOneProgramById'
		})
	},
	methods: {
		...mapActions({
			updateStudent: 'student/updateStudent',
			updateAccount: 'account/updateAccount',
			fetchProgram: 'program/fetchProgram'
		}),
		async updateStudentInfomation() {
			await this.updateStudent({
				id: this.user.student.studentID,
				programID: this.user.student.programID,
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
			await this.updateAccount({
				phone: this.form.phone,
				email: this.form.email
			})
		}
	},
	watch: {
		user: {
			handler(val) {
				if (val) {
					this.form.studentName = val.student.studentName
					this.form.studentNumber = val.student.studentNumber
					this.form.gender = val.student.gender
					this.form.schoolEmail = val.student.schoolEmail
					this.form.facebookLink = val.student.facebookLink
					this.form.cvLink = val.student.cvLink
					this.form.country = val.student.country
					this.form.province = val.student.province
					this.form.address = val.address
					if (
						val.student.phone === null ||
						val.student.email === null ||
						val.student.email === undefined ||
						val.student.phone === undefined
					) {
						this.form.phone = ''
						this.form.email = ''
					} else {
						this.form.phone = val.student.phone
						this.form.email = val.student.email
					}
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
