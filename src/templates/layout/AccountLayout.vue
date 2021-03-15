<template>
	<div class="container d-flex flex-column pb-0">
		<div class="content">
			<v-card tile flat class="pa-3">
				<v-row>
					<v-col sm="12" lg="8">
						<div class="d-flex flex-row">
							<div class="mr-3">
								<img src="/admin-static/logo.png" width="55px" />
							</div>
							<div class="d-flex flex-column justify-end">
								<div class="black--text subtitle-1 font-weight-medium">
									HỆ THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN VÀ DỊCH VỤ TRỰC TUYẾN
								</div>
								<div class="black--text subtitle-1">
									TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI - VIỆN CÔNG NGHỆ THÔNG TIN VÀ
									TRUYỀN THÔNG
								</div>
							</div>
						</div>
					</v-col>
					<v-col sm="12" lg="4">
						<div class="d-flex flex-column align-end">
							<div v-if="getUser && getUser.username">
								<v-icon class="mr-2"> mdi-face-profile</v-icon>
								{{ getUser.username }}
							</div>
							<div v-else>
								<v-icon class="mr-2"> mdi-face-profile</v-icon>
							</div>
							<BaseButton text="Đăng xuất" @click="logOut" />
						</div>
					</v-col>
				</v-row>
			</v-card>
			<v-tabs
				class="pa-3"
				background-color="#444"
				center-active
				dark
				hide-slider
			>
				<v-tab class="pa-0"
					><div class="text-center">
						<v-menu open-on-hover offset-y>
							<template v-slot:activator="{on, attrs}">
								<div v-bind="attrs" v-on="on">Đồ án</div>
							</template>
							<v-list>
								<v-list-item v-for="(item, index) in drops" :key="index">
									<v-list-item-title>
										<a
											class="action-hover black--text"
											@click="changePage(item)"
											>{{ item.title }}</a
										>
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</div></v-tab
				>
				<v-tab>Lịch học</v-tab>
				<v-tab>Biểu mẫu</v-tab>
				<v-tab>Hỏi đáp</v-tab>
			</v-tabs>
			<v-main>
				<router-view></router-view>
			</v-main>
		</div>

		<div class="pa-3 pb-0">
			<BaseFooter />
		</div>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			drops: [
				{title: 'Danh sách đồ án', link: '/projectList'},
				{title: 'Đăng ký nguyện vọng', link: '/projectRegistration'},
				{title: 'Danh sách đề tài', link: '/topicList'},
				{title: 'Danh sách doanh nghiệp', link: '/companyList'}
			],
			tab: null
		}
	},
	computed: {
		...mapGetters({
			getUser: 'auth/getUser'
		})
	},
	methods: {
		...mapActions({
			signOut: 'auth/signOut'
		}),
		changePage(item) {
			if (this.$route.path !== item.link) this.$router.push(`${item.link}`)
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
.theme--light.v-list-item--active:hover:before,
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
