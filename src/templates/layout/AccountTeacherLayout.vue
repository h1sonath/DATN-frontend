<template>
	<div class=" pb-0">
		<div class="main_layout pa-8">
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
							<div v-if="teacher" class="d-flex align-center">
								<v-menu open-on-hover bottom offset-y>
									<template v-slot:activator="{on, attrs}">
										<div
											class="d-flex align-center user-name "
											v-bind="attrs"
											v-on="on"
										>
											<v-icon color="#255cc2" class="mx-2" large
												>mdi-account</v-icon
											>
											{{ teacher.teacherName }}
										</div>
									</template>

									<v-list>
										<v-list-item>
											<v-list-item-title
												><div
													class="cursor-pointer"
													@click="goToChangeTeacherInfo"
												>
													<v-icon class="mx-2">mdi-pencil</v-icon>

													Thông tin cá nhân
												</div>
											</v-list-item-title>
										</v-list-item>
										<v-list-item>
											<v-list-item-title
												><div
													class="cursor-pointer"
													@click="goToChangePassword"
												>
													<v-icon class="mx-2">mdi-lock-open</v-icon>

													Đổi mật khẩu
												</div>
											</v-list-item-title>
										</v-list-item>
										<v-list-item>
											<v-list-item-title
												><div class="cursor-pointer" @click="logOut">
													<v-icon class="mx-2">mdi-exit-to-app</v-icon>

													Đăng xuất
												</div>
											</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
							</div>
							<div v-else-if="user" class="d-flex align-center">
								<v-menu open-on-hover bottom offset-y>
									<template v-slot:activator="{on, attrs}">
										<div class="d-flex align-center" v-bind="attrs" v-on="on">
											{{ user ? user.userName : 'Khách' }}
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
							</div>
						</v-col>
					</v-row>
				</v-card>
				<v-tabs
					class="pa-3"
					background-color="#9b0504"
					center-active
					show-arrows
					dark
					hide-slider
					v-model="tab"
				>
					<v-tab @click="goToManageProjectRegistration">
						<div>
							Nguyện vọng sinh viên
						</div>
					</v-tab>
					<v-tab @click="goToManageProjectList">
						<div>
							Danh sách đồ án
						</div></v-tab
					>
					<v-tab @click="goToManageTopicList">
						<div>
							Quản lý đề tài
						</div></v-tab
					>
					<v-tab @click="goToManageCompanyList">
						<div>
							Doanh nghiệp/Công ty
						</div></v-tab
					>

					<!-- <v-tab @click="goToCompanyList">
					<div>
						Danh sách doanh nghiệp
					</div></v-tab
				> -->
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
			tab: null
		}
	},
	async created() {
		await this.fetchTeacher(this.user.teacher.teacherID)
	},
	computed: {
		...mapGetters({
			user: 'auth/getUser',
			teacher: 'teacher/getOneTeacherById'
		})
	},
	methods: {
		...mapActions({
			signOut: 'auth/signOut',
			fetchTeacher: 'teacher/fetchTeacher'
		}),
		goToChangeTeacherInfo() {
			console.log('123')
		},
		goToChangePassword() {
			this.$refs['dialog-control'].openDialog()
		},
		goToManageProjectRegistration() {
			if (this.$route.path !== '/manageProjectRegistration')
				this.$router.push('/manageProjectRegistration')
		},
		goToManageProjectList() {
			if (this.$route.path !== '/manageProjectList')
				this.$router.push('/manageProjectList')
		},
		goToManageTopicList() {
			if (this.$route.path !== '/manageTopicList')
				this.$router.push('/manageTopicList')
		},

		goToManageCompanyList() {
			if (this.$route.path !== '/manageCompanyList')
				this.$router.push('/manageCompanyList')
		},
		async logOut() {
			await this.signOut()
			this.$router.push('/login')
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	min-height: calc(100vh - 70px);
}
.user-name {
	color: #255cc2;
	font-size: 18px;
	line-height: 27px;
	font-weight: 500;
}
.footer {
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
</style>
