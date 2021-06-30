<template>
	<div class="pa-3">
		<v-card class="rounded-0 elevation-0 pa-3" height="100%">
			<v-form ref="form">
				<v-row>
					<v-col sm="12" md="9">
						<div class="headline font-weight-bold primary--text pa-3">
							Cập nhật thông tin
						</div>
						<v-row class="pa-3">
							<v-col sm="6" md="6" xs="12">
								<div class="black--text">
									Hệ (*)
									<BaseAutocomplete
										label="Tên học phần"
										:items="programs"
										item-text="schoolName"
										item-value="programID"
										:returnObject="false"
										v-model="form.programID"
										:rules="[$rules.required]"
									/>
								</div>
								<div class="black--text">
									Họ và tên (*)
								</div>
								<v-text-field
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
								<div class="black--text">
									MSSV
								</div>
								<v-text-field
									dense
									:rules="[$rules.required]"
									v-model.trim="form.studentNumber"
									ref="studentNumber"
									outlined
								></v-text-field>
							</v-col>
							<v-col
								sm="6"
								md="6"
								xs="12"
								style="border-right: 1px solid black"
							>
								<div>
									Link CV
								</div>
								<v-text-field
									dense
									:rules="[$rules.required]"
									v-model.trim="form.cvLink"
									ref="cvLink"
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
									:rules="[$rules.required]"
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
						<div class="d-flex justify-center pa-3">
							<BaseButton text="Cập nhật" @click="updateStudentInfomation" />
						</div>
					</v-col>
					<v-col sm="12" md="3" xs="12">
						<StudentInfo
							v-if="user"
							:student="user.student"
							:accountInfo="currentAccount"
						/>
					</v-col>
				</v-row>
			</v-form>
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
		await this.fetchAccount()
		if (this.user.student.programID) {
			await this.fetchProgram(this.user.student.programID)
		}
		await this.fetchStudent(this.user.student.studentID)
		await this.fetchPrograms()
	},
	data() {
		return {
			form: {
				programID: '',
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
				phone: '',
			}
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/getUser',
			program: 'program/getOneProgramById',
			currentAccount: 'account/getCurrentAccount',
			student: 'student/getOneStudentById',
			programs: 'program/getAllProgram'
		})
	},
	methods: {
		...mapActions({
			fetchPrograms: 'program/fetchPrograms',
			fetchAccount: 'account/fetchAccount',
			updateStudent: 'student/updateStudent',
			updateAccount: 'account/updateAccount',
			fetchProgram: 'program/fetchProgram',
			fetchStudent: 'student/fetchStudent'
		}),
		async updateStudentInfomation() {
			if (!this.$refs.form.validate()) return
			await this.updateStudent({
				id: this.student.studentID,
				programID: this.form.programID,
				// inYear: this.form.inYear,
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
			location.reload()
		}
	},
	watch: {
		student: {
			handler(val) {
				if (val) {
					this.form.programID = val.programID
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
		},
		currentAccount: {
			handler(val) {
				if (val) {
					this.form.phone = val.phone
					this.form.email = val.email
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
