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
									<div class="black--text">
										Viện đào tạo (*)
										<v-text-field
											dense
											ref="schoolName"
											:rules="[$rules.required]"
											v-model.trim="form.schoolName"
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
										Ngày sinh (*)
									</div>
									<v-text-field
										disabled
										dense
										:rules="[$rules.required]"
										v-model.trim="form.dateOfBirth"
										ref="dateOfBirth"
										outlined
									></v-text-field>
									<div class="black--text">
										Giới tính (*)
									</div>
									<BaseAutocomplete
										dense
										:items="form.gender"
										ref="gender"
										outlined
									/>
									<div class="black--text">
										Hệ đào tạo (*)
									</div>
									<v-text-field
										dense
										ref="programName"
										:rules="[$rules.required]"
										v-model.trim="form.programName"
										outlined
									></v-text-field>
									<div class="black--text">
										Lớp (*)
									</div>
									<BaseAutocomplete
										ref="group"
                    :items="form.group"
										dense
									/>
								</v-col>
								<v-col sm="6" md="6" xs="12">
									<div class="black--text">
										Email trường (*)
									</div>
									<v-text-field
										dense
										:rules="[$rules.required, $rules.email]"
										v-model.trim="form.email"
										ref="email"
										outlined
									></v-text-field>
									<div>
										Link facebook (*)
									</div>
									<v-text-field
										dense
										:rules="[$rules.required]"
										v-model.trim="form.rePassword"
										ref="password"
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
										disabled
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
										disabled
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
										disabled
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
										disabled
									></v-text-field>
								</v-col>
							</v-row>
						</v-col>
						<v-col sm="3" md="3" xs="12">
							<StudentInfo />
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
import StudentInfo from '@/modules/Student/StudentInfo'
export default {
	components: {
		StudentInfo
	},
	data() {
		return {
			form: {
				studentName: 'Vinh',
				schoolName: 'Viện Công nghệ và Thông tin',
				name: '',
				schoolEmail: '',
				dateOfBirth: '02/01/1998',
				gender: ['Nam', 'Nữ'],
				facebookLink: '',
				cvLink: '',
				country: '',
				province: '',
				address: ''
			}
		}
	}
}
</script>
<style scoped>
.student-info_input {
	width: 250px;
}
</style>
