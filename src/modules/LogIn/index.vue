<template>
	<div>
		<v-card
			class="background flex-column  d-flex justify-center"
			height="100vh"
		>
			<div class="display-2 text-center" style="font-weight: 700">
				HỆ THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN
			</div>
			<div class="d-flex flex-column justify-center">
				<div>
					<v-card-text
						class="pa-8 rounded-0 d-flex flex-column align-center justify-center"
					>
						<v-form ref="form" class="login-form d-flex flex-column ">
							<div class="title">
								Tài khoản
							</div>
							<v-text-field
								dense
								ref="account"
								placeholder="Nhập tài khoản"
								:rules="[$rules.required, $rules.email]"
								v-model.trim="form.account"
								@keyup.native.enter="logIn"
								outlined
							></v-text-field>
							<div class="title">
								Mật khẩu
							</div>
							<v-text-field
								dense
								type="password"
								hint="Mậu khẩu chứa ít nhất 6 ký tự"
								:rules="[$rules.required, $rules.minLength(6)]"
								v-model.trim="form.password"
								placeholder="Mật khẩu"
								@keyup.native.enter="logIn"
								ref="password"
								outlined
							></v-text-field>
						</v-form>
						<div class="d-flex justify-center pa-3">
							<a @click="goToSignUp()"
								>Bạn chưa có tài khoản? Đăng ký tại đây</a
							>
						</div>
						<div class="d-flex justify-end align-center">
							<BaseButton
								class="elevation-0"
								type="submit"
								text="Đăng nhập"
								@click="logIn"
								color="primary"
								icon="mdi-account-arrow-right"
							/>
						</div>
					</v-card-text>
				</div>
			</div>
		</v-card>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			form: {
				account: '',
				password: ''
			}
		}
	},
	computed: {
		...mapGetters({
			authUser: 'auth/getUser'
		})
	},
	methods: {
		...mapActions({
			signIn: 'auth/signIn'
		}),
		async logIn() {
			// if (!this.$refs.form.validate()) return
			try {
				await this.signIn({
					username: this.form.account,
					password: this.form.password
				})
				if (
					this.authUser &&
					(this.authUser.role === 'STUDENT' || this.authUser.role === 'NORMAL')
				) {
					this.$message.success('Đăng nhập thành công')
					this.$router.push('/projectList')
				} else if (
					this.authUser &&
					(this.authUser.role === 'ADMIN' || this.authUser.role === 'TEACHER')
				) {
					this.$message.success('Đăng nhập thành công')
					this.$router.push('/manageProjectRegistration')
				} else {
					this.$message.error(
						'Đã xảy ra lỗi trong quá trình đăng nhập, vui lòng thử lại sau'
					)
				}
			} catch (error) {
				this.$message.error(
					'Đã xảy ra lỗi trong quá trình đăng nhập, vui lòng thử lại'
				)
			}
		},
		goToSignUp() {
			this.$router.push('/signUp')
		}
	}
}
</script>
<style scoped>
.login-form {
	width: 500px;
}
.background {
	background-image: url('../../assets/untitled.png');
	background-size: cover;
	background-position: center;
}
</style>
