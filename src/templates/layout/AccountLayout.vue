<template>
	<div class=" pb-0">
		<div class="main_layout background pa-8">
			<div class="accout-layout_header">
				<v-card tile flat class="pa-3">
					<v-row>
						<v-col cols="12" lg="8">
							<div class="d-flex flex-row">
								<div class="d-flex flex-xs-row flex-lg-column align-center">
									<div class="black--text display-1 font-weight-medium">
										HỆ THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN
										<br />
										<span class="header-subtitle black--text title">
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
							<div v-if="student" class="d-flex align-center">
								<v-menu open-on-hover bottom offset-y>
									<template v-slot:activator="{on, attrs}">
										<div
											class="user-name d-flex align-center"
											v-bind="attrs"
											v-on="on"
										>
											<v-icon color="#255cc2" class="mx-2" large>mdi-account</v-icon>
											<div class="mt-1">{{ student.studentName }}</div>
										</div>
									</template>

									<v-list>
										<v-list-item>
											<v-list-item-title class="cursor-pointer"
												><div @click="goToChangeStudentInfo">
													<v-icon class="mx-2">mdi-pencil</v-icon>
													Thông tin cá nhân
												</div>
											</v-list-item-title>
										</v-list-item>
										<v-list-item>
											<v-list-item-title class="cursor-pointer"
												><div @click="goToChangePassword">
													<v-icon class="mx-2">mdi-lock-open</v-icon>
													Đổi mật khẩu
												</div>
											</v-list-item-title>
										</v-list-item>
										<v-list-item>
											<v-list-item-title class="cursor-pointer"
												><div @click="logOut">
													<v-icon class="mx-2">mdi-exit-to-app</v-icon>
													Đăng xuất
												</div>
											</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
							</div>
							<div v-else class="d-flex align-center">
								<v-menu open-on-hover bottom offset-y>
									<template v-slot:activator="{on, attrs}">
										<div class="d-flex align-center" v-bind="attrs" v-on="on">
											{{ user ? user.userName : 'Khách' }}
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
						</v-col>
					</v-row>
				</v-card>
				<v-tabs
					class="pa-3"
					background-color="#9b0504"
					center-active
					show-arrows
					hide-slider
					dark
					v-model="tab"
				>
					<v-tab @click="goToProjectList">
						<div>
							Đồ án
						</div>
					</v-tab>
					<v-tab @click="goToProjectRegistration">
						<div>
							Nguyện vọng
						</div></v-tab
					>
					<v-tab @click="goToTopicList">
						<div>
							Đề tài
						</div></v-tab
					>
					<v-tab @click="goToCompanyList">
						<div>
							Doanh nghiệp/Công ty
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
		<div class="pr-11 pl-11 pb-0 account-layout_footer">
			<BaseFooter />
		</div>
		<ModalChangePassword ref="dialog-control" />
	</div>
</template>
<script>
import ModalChangePassword from '@/modules/Student/ModalChangePassword'
import {mapActions, mapGetters} from 'vuex'
export default {
	components: {
		ModalChangePassword
	},
	data() {
		return {
			tab: null,
			items: ['Thông tin cá nhân', 'Đổi mật khẩu', 'Đăng xuất']
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/getUser',
			student: 'student/getOneStudentById'
		})
	},
	async created() {
		await this.fetchStudent(this.user.student.studentID)
	},
	methods: {
		...mapActions({
			signOut: 'auth/signOut',
			fetchStudent: 'student/fetchStudent'
		}),
		goToChangePassword() {
			this.$refs['dialog-control'].openDialog()
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
.user-name {
	color: #255cc2;
	font-size: 18px;
	line-height: 27px;
	font-weight: 500;
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
