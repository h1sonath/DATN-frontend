<template>
	<v-snackbar
		v-model="message.isDisplay"
		:bottom="y === 'bottom'"
		:color="message.color"
		:elevation="5"
		:left="x === 'left'"
		:multi-line="mode === 'multi-line'"
		:right="x === 'right'"
		:timeout="3000"
		:top="y === 'top'"
		:vertical="mode === 'vertical'"
	>
		<div class="d-inline-flex pa-0">
			<v-progress-circular
				v-if="message.color === 'white'"
				class="mr-3"
				indeterminate
				color="primary"
				:size="20"
				:width="1"
			/>
			<span
				:class="
					`${message.color === 'white' ? 'primary--text' : 'white--text'}`
				"
				>{{ message.text }}</span
			>
		</div>
		<template v-slot:action="{attrs}">
			<v-btn elevation="0" class="mr-2" icon v-bind="attrs" @click="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</template>
	</v-snackbar>
</template>
<script>
export default {
	props: {
		mode: String,
		x: String,
		y: {
			type: String,
			default: 'top'
		}
	},
	data() {
		return {
			message: this.$message.messageData
		}
	},
	methods: {
		close() {
			this.$message.close()
		}
	}
}
</script>
