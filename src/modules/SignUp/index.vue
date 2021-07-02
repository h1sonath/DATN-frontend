<template>
	<div class="">
		<v-card
			class="background flex-column  d-flex justify-center"
			height="100vh"
		>
			<!-- <div class="d-flex flex-row pa-8">
				<v-row>
					<v-col sm="3" md="2">
						<img src="/admin-static/logo.png" width="80px" />
					</v-col>
					<v-col sm="9" md="10">
						<div class="display-1 font-weight-bold primary--text ">
							HỆ THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN VÀ DỊCH VỤ TRỰC TUYẾN
						</div>
						<div class="display-1 primary--text ">
							TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI
						</div>
					</v-col>
				</v-row>
			</div> -->
			<div class="display-2 text-center" style="font-weight: 700">
				HỆ THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN
			</div>
			<v-card-text
				class="pa-8 rounded-0 d-flex flex-column align-center justify-center"
			>
				<v-form ref="form" class="signup-form d-flex flex-column">
					<v-text-field
						dense
						ref="username"
						placeholder="Nhập email trường"
						:rules="[$rules.required, $rules.email]"
						v-model.trim="form.username"
						outlined
					></v-text-field>
					<v-text-field
						dense
						type="password"
						hint="Mậu khẩu chứa ít nhất 6 ký tự"
						:rules="[$rules.required, $rules.minLength(6)]"
						v-model.trim="form.password"
						placeholder="Nhập mật khẩu"
						ref="password"
						outlined
					></v-text-field>
					<v-text-field
						dense
						type="password"
						hint="Mậu khẩu chứa ít nhất 6 ký tự"
						:rules="[
							$rules.required,
							$rules.minLength(6),
							$rules.confirmPassword(form.password, form.rePassword)
						]"
						v-model.trim="form.rePassword"
						placeholder="Nhập lại mật khẩu"
						@keyup.native.enter="signUp"
						ref="password"
						outlined
					></v-text-field>
				</v-form>
				<div class="d-flex justify-end">
					<BaseButton
						icon="mdi-account-plus"
						depressed
						text="Đăng ký"
						@click="signUp"
						color="primary"
					/>
				</div>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	data() {
		return {
			form: {
				name: '',
				email: '',
				password: '',
				rePassword: ''
			}
		}
	},
	computed: {
		...mapGetters({
			getUser: 'auth/getUser'
		})
	},
	methods: {
		...mapActions({
			userSignUp: 'auth/signUp'
		}),
		async signUp() {
			if (!this.$refs.form.validate()) return
			try {
				await this.userSignUp({
					username: this.form.username,
					password: this.form.password,
					rePassword: this.form.rePassword
				})
				if (this.getUser) {
					await this.$confirm.show({
						title: 'Chúc mừng bạn đã đăng ký thành công',
						okText: 'Tiếp tục',
						done: () => {
							this.$router.push('/login')
						}
					})
				}
			} catch (error) {
				this.$message.error(error)
			}
		}
	}
}
</script>
<style scoped>
.signup-form {
	width: 500px;
}
.background {
	background-image: url('../../assets/untitled.png');
	background-size: cover;
	background-position: center;
}
</style>
