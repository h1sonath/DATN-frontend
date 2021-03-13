<template>
	<div class="d-flex justify-center">
		<v-card class="rounded-0 elevation-0 pa-8" height="100%">
			<div class="d-flex flex-row pa-8">
				<v-row>
					<v-col sm="3" md="2">
						<img
							src="https://www.hust.edu.vn/documents/21257/147855/BVP-logo+bk-rgb.jpg/c2f94a78-f713-4af1-b9f0-7f6c4cb94438?t=1483699000000&download=true"
							width="80px"
						/>
					</v-col>
					<v-col sm="9" md="10">
						<div class="display-1 font-weight-bold primary--text ">
							HỆ THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN VÀ DỊCH VỤ TRỰC TUYẾN
						</div>
					</v-col>
				</v-row>
			</div>

			<div class="d-flex flex-column justify-space-between">
				<div>
					<v-card-text class="pa-8 rounded-0">
						<v-form ref="form">
							<v-text-field
								dense
								ref="account"
								placeholder="Nhập tài khoản"
								:rules="[$rules.required]"
								v-model.trim="form.account"
								outlined
							></v-text-field>
							<v-text-field
								dense
								type="password"
								hint="Mậu khẩu chứa ít nhất 6 ký tự"
								:rules="[$rules.required, $rules.minLength(6)]"
								v-model.trim="form.password"
								placeholder="Mật khẩu"
								ref="password"
								outlined
							></v-text-field>
						</v-form>
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
			try {
				await this.signIn({
					username: this.form.account,
					password: this.form.password
				})
				if (this.authUser) {
					this.$message.success('Đăng nhập thành công')
          this.$router.push("/projectList")
				} else {
					this.$message.error(
						'Đã xảy ra lỗi trong quá trình đăng nhập, vui lòng thử lại sau'
					)
				}
			} catch (error) {
				this.$message.error(error)
			}
		}
	}
}
</script>
<style scoped></style>
