<template>
	<div class="">
		<v-card
			class="background flex-column  d-flex justify-center"
			height="100vh"
		>
			<div class="display-2 text-center" style="font-weight: 700">
				HỆ THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN
			</div>
			<v-card-text class="d-flex flex-column align-center justify-center">
				<v-form ref="form" class="signup-form d-flex flex-column">
					<div class="title">
						Email trường
					</div>
					<v-text-field
						dense
						ref="username"
						placeholder="Nhập email trường"
						:rules="[$rules.required, $rules.email]"
						v-model.trim="form.username"
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
						placeholder="Nhập mật khẩu"
						ref="password"
						outlined
					></v-text-field>
					<div class="title">
						Nhập lại mật khẩu
					</div>
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
				<div class="d-flex justify-center pa-3">
					<a @click="goToLogIn()">Bạn đã có tài khoản? Đăng nhập tại đây</a>
				</div>
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
	created() {
		this.form.name = ''
		this.form.email = ''
		this.form.password = ''
		this.form.rePassword = ''
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
		goToLogIn() {
			this.$router.push('/login')
		},
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
