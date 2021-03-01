<template>
	<v-card>
		<v-toolbar color="white" dark flat>
			<p class="background-gray">
				Your Dashboard
			</p>
			<v-spacer></v-spacer>

			<template v-slot:extension>
				<v-tabs v-model="tab" align-with-title>
					<v-tabs-slider color="yellow"></v-tabs-slider>

					<v-tab v-for="item in items" :key="item">
						<div class="text-center">
							<v-menu offset-y>
								<template v-slot:activator="{on, attrs}">
									<v-btn color="primary" dark v-bind="attrs" v-on="on">
										{{ item }}
									</v-btn>
								</template>
								<v-list>
									<v-list-item v-for="(drop, index) in drops" :key="index">
										<v-list-item-title
											><v-btn @click="alert()">{{
												drop.title
											}}</v-btn></v-list-item-title
										>
									</v-list-item>
								</v-list>
							</v-menu>
						</div>
					</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>

		<v-tabs-items v-model="tab">
			<v-tab-item v-for="item in items" :key="item">
				<v-card flat>
					<v-card-text v-text="text"></v-card-text>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>
<script>
import navigationRoutes from '@/router/navigationRoutes'
export default {
	data() {
		return {
			drops: [
				{title: 'Click Me'},
				{title: 'Click Me'},
				{title: 'Click Me'},
				{title: 'Click Me 2'}
			],
			navigationRoutes,
			isMinimized: false,
			tab: null,
			items: ['web', 'shopping', 'videos', 'images', 'news'],
			text:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
		}
	},
	methods: {
		alert() {
			this.$message.success('chuyen trang')
		}
	}
}
</script>
<style lang="scss" scoped>
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
</style>
