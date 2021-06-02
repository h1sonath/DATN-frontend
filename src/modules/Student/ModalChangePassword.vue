<template>
	<div class="text-center">
		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Đổi mật khẩu
				</v-card-title>
				<div class="pa-3">
					<v-text-field
						label="Mật khẩu cũ"
						ref="oldPass"
						dense
						:rules="[$rules.required]"
						v-model.trim="oldPass"
						outlined
					></v-text-field>
				</div>
				<div class="pa-3">
					<v-text-field
						label="Mật khẩu mới"
						ref="newPass"
						dense
						:rules="[$rules.required]"
						v-model.trim="newPass"
						outlined
					></v-text-field>
				</div>
				<div class="pa-3">
					<v-text-field
						label="Nhập lại mật khẩu mới"
						ref="renewPass"
						dense
						:rules="[$rules.required]"
						v-model.trim="renewPass"
						outlined
					></v-text-field>
				</div>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<BaseButton text="Lưu" @click="closeDialog" />
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
	data() {
		return {
			dialog: false,
			oldPass: '',
			newPass: '',
			renewPass: ''
		}
	},
	methods: {
		...mapActions({
			updatePassword: 'student/changePassword'
		}),
		openDialog(project) {
			this.dialog = true
			this.currentProject = project
		},
		async closeDialog() {
			this.dialog = false
			await this.updatePassword({
				oldPassword: this.oldPass,
				newPassword: this.newPass,
				rePassword: this.renewPass
			})
		}
	}
}
</script>
