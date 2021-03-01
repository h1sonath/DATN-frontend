<template>
	<div class="custom-time-picker">
		<v-menu
			ref="menu"
			v-model="menu"
			:close-on-content-click="false"
			:nudge-right="40"
			:return-value.sync="time"
			transition="scale-transition"
			offset-y
			max-width="290px"
			min-width="290px"
		>
			<template v-slot:activator="{on}">
				<v-text-field
					v-model="time"
					append-icon="mdi-clock-outline"
					readonly
					v-on="on"
					:label="label"
					dense
					outlined
				/>
			</template>
			<v-time-picker
				v-if="menu"
				v-model="time"
				full-width
				@click:minute="$refs.menu.save(time)"
			></v-time-picker>
		</v-menu>
	</div>
</template>
<script>
export default {
	props: {
		label: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: 'text',
		},
		placeholder: {
			type: String,
			default: '',
		},
		value: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			time: '',
			menu: false,
		}
	},
	mounted() {
		this.time = this.value ? this.value : '00:00'
	},
	watch: {
		time(data) {
			if (data) {
				this.$emit('input', data)
			}
		},
		value(data) {
			this.time = data
		},
	},
}
</script>
