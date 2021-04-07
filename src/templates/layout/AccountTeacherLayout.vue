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
						<v-col cols="12" lg="4">
							<div
								v-if="user && user.teacher && user.teacher.teacherName"
								class="d-flex align-center"
							>
								<img src="/admin-static/avatar-default-icon.png" width="40px" />
								{{ user.teacher.teacherName }}
							</div>
							<div v-else class="d-flex align-center">
								{{ user.username }}
								<img src="/admin-static/avatar-default-icon.png" width="40px" />
							</div>
							<div class="d-flex justify-center">
								<BaseButton text="Đăng xuất" @click="logOut" />
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
					<v-tab @click="goToManageProjectRegistration">
						<div>
							Danh sách nguyện vọng
						</div>
					</v-tab>
					<v-tab @click="goToManageProjectList">
						<div>
							Danh sách đồ án
						</div></v-tab
					>
					<v-tab @click="goToManageTopicList">
						<div>
							Danh sách đề tài
						</div></v-tab
					>
					<v-tab @click="goToManageCompanyList">
						<div>
							Danh sách công ty
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
			tab: null
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
			this.$router.push('/login')
			await this.signOut()
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	min-height: calc(100vh - 70px);
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
