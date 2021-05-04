<template>
	<div class="container pb-0">
		<div class="main_layout">
			<div class="accout-layout_header">
				<v-card tile flat class="pa-3">
					<v-row>
						<v-col cols="12" lg="8">
							<div class="d-flex flex-row">
								<span class="mr-3">
									<img src="/admin-static/logo.png" width="55px" />
								</span>
								<div
									class="d-flex flex-xs-row flex-lg-column justify-end align-end"
								>
									<div class="black--text subtitle-1 font-weight-medium">
										HỆ THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN VÀ DỊCH VỤ TRỰC TUYẾN
										<br />
										<span class="header-subtitle black--text subtitle-1">
											TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI - VIỆN CÔNG NGHỆ THÔNG TIN
											VÀ TRUYỀN THÔNG
										</span>
									</div>
								</div>
							</div>
						</v-col>
						<v-col
							cols="12"
							lg="4"
							class="d-flex flex-column align-end justify-end"
						>
							<div
								v-if="user && user.student && user.student.studentName"
								class="d-flex align-center"
							>
								<v-menu open-on-hover bottom offset-y>
									<template v-slot:activator="{on, attrs}">
										<div class="d-flex align-center" v-bind="attrs" v-on="on">
											<img
												src="/admin-static/avatar-default-icon.png"
												width="40px"
											/>
											{{ user.student.studentName }}
										</div>
									</template>

									<v-list>
										<v-list-item>
											<v-list-item-title
												><div @click="goToChangeStudentInfo">
													Thông tin cá nhân
												</div>
											</v-list-item-title>
										</v-list-item>
										<v-list-item>
											<v-list-item-title
												><div @click="goToChangePassword">Đổi mật khẩu</div>
											</v-list-item-title>
										</v-list-item>
										<v-list-item>
											<v-list-item-title
												><div @click="logOut">Đăng xuất</div>
											</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
							</div>
							<div v-else class="d-flex align-center">
								<v-menu open-on-hover bottom offset-y>
									<template v-slot:activator="{on, attrs}">
										<div class="d-flex align-center" v-bind="attrs" v-on="on">
											<img
												src="/admin-static/avatar-default-icon.png"
												width="40px"
											/>
											{{ user.userName || 'Khách' }}
										</div>
									</template>

									<v-list>
										<v-list-item>
											<v-list-item-title
												><div @click="goToChangeTeacherInfo">
													Thông tin cá nhân
												</div>
											</v-list-item-title>
										</v-list-item>
										<v-list-item>
											<v-list-item-title
												><div @click="goToChangePassword">Đổi mật khẩu</div>
											</v-list-item-title>
										</v-list-item>
										<v-list-item>
											<v-list-item-title
												><div @click="logOut">Đăng xuất</div>
											</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
								<img src="/admin-static/avatar-default-icon.png" width="40px" />
							</div>
						</v-col>
					</v-row>
				</v-card>
				<v-tabs
					class="pa-3"
					background-color="#444"
					center-active
					show-arrows
					dark
					hide-slider
					v-model="tab"
				>
					<v-tab @click="goToProjectList">
						<div>
							Danh sách đồ án
						</div>
					</v-tab>
					<v-tab @click="goToProjectRegistration">
						<div>
							Đăng ký nguyện vọng
						</div></v-tab
					>
					<v-tab @click="goToTopicList">
						<div>
							Danh sách đề tài
						</div></v-tab
					>
					<v-tab @click="goToCompanyList">
						<div>
							Danh sách doanh nghiệp
						</div></v-tab
					>
				</v-tabs>
			</div>
			<div class="accout-layout_content">
				<v-main>
					<router-view></router-view>
				</v-main>
			</div>
		</div>
		<div class="pa-3 pb-0 account-layout_footer">
			<BaseFooter />
		</div>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			tab: null,
			items: ['Thông tin cá nhân', 'Đổi mật khẩu', 'Đăng xuất']
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/getUser'
		})
	},
	methods: {
		...mapActions({
			signOut: 'auth/signOut'
		}),
		goToChangePassword() {
			console.log('đổi mật khẩu')
		},
		goToChangeStudentInfo() {
			if (this.$route.path !== '/changeStudentInfo')
				this.$router.push('/changeStudentInfo')
		},
		goToProjectList() {
			if (this.$route.path !== '/projectList') this.$router.push('/projectList')
		},
		goToTopicList() {
			if (this.$route.path !== '/topicList') this.$router.push('/topicList')
		},
		goToProjectRegistration() {
			if (this.$route.path !== '/projectRegistration')
				this.$router.push('/projectRegistration')
		},
		goToCompanyList() {
			if (this.$route.path !== '/companyList') this.$router.push('/companyList')
		},
		async logOut() {
			await this.signOut()
			this.$router.push('/login')
		}
	}
}
</script>

<style lang="scss" scoped>
.main_layout {
	min-height: calc(100vh - 70px);
}
.accout-layout_footer {
	height: 50px;
}
::v-deep .theme--dark.v-list-item--active:before,
.theme--light.v-list-item--:before,
.theme--light.v-list-item:focus:before {
	opacity: 0;
}
::v-deep .v-list-item--active.is-minimized {
	background-color: white;
	& .v-list-item__icon {
		color: #255cc2;
	}
}
::v-deep.v-toolbar--dense .v-toolbar__content,
.v-toolbar--dense .v-toolbar__extension {
	padding: 0 !important;
}
@media screen and (max-width: 600px) {
	.header-subtitle {
		display: none;
	}
}
</style>
