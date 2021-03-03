<template>
	<v-footer>
		<div class="footer pa-3">
			<div class="footer__full-width-background pa-3"></div>
			<div class="footer__main">
				<div ph0>
					<v-row>
						<v-col cols="12" :sm="9" :md="8">
							<div>
								<div class="footer__navigation-group-title">
									<div class="d-flex flex-row">
										<div class="mr-3">
											<img
												src="https://www.hust.edu.vn/documents/21257/147855/BVP-logo+bk-rgb.jpg/c2f94a78-f713-4af1-b9f0-7f6c4cb94438?t=1483699000000&download=true"
												width="35px"
											/>
										</div>
										<div class="body-2 white--text" inline no-margin>
											HỆ THỐNG DO TRƯỜNG Trường Đại học Bách Khoa Hà Nội THIẾT
											KẾ & PHÁT TRIỂN. Để hỗ trợ vui lòng gửi mail đến
											<span class="font-weight-medium"
												>hung.nguyenthanh2@hust.edu.vn</span
											>
											<div>
												09.77.86.33.11
											</div>
										</div>
									</div>
								</div>
							</div>
						</v-col>
						<v-col cols="12" :sm="3" :md="4">
							<div>
								<div class="footer__navigation-group-title white--text">
									<div class="body-2 " inline no-margin>
										Số 1 Đại Cồ Việt, Phường Bách Khoa, Quận Hai Bà Trưng, Thành
										phố Hà Nội
									</div>
								</div>
							</div>
						</v-col>
					</v-row>
				</div>
			</div>
		</div>
	</v-footer>
</template>
<script></script>
<style lang="scss" scoped>
footer {
	display: contents;
	position: relative;
	z-index: inherit;
}
.footer {
	display: flex;
	margin: 0 auto;
	position: relative;
	width: 100%;
	flex-direction: column;
	max-width: 100%;
	padding: 0;
	background-color: white;
	border-top: 1px solid black;
	color: black;
	z-index: 2;
	.footer__full-width-background {
		background: #9b0504;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100vw;
		max-width: 100%;
		height: calc(100% + 1px);
		border-top: 1px solid;
		z-index: -1;
	}
	.footer__main,
	.footer__main {
		.footer__navigation-group-title {
			text-transform: uppercase;
		}
		.footer__logo {
			display: flex;
			justify-content: center;
			cursor: pointer;
			img {
				width: auto;
				height: auto;
				max-width: 168px;
				max-height: 56px;
			}
		}
		.navigation-item {
			.navigation-item__media {
				height: auto !important;
			}
		}
	}
}
</style>
