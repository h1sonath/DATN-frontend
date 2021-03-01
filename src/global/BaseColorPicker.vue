<template>
	<div class="color-input d-flex align-center">
		<div class="color-input-value">
			{{ stringColorValue }}
		</div>
		<div class="button-selecte-color">
			<div ref="color-picker" class="color-picker"></div>
		</div>
	</div>
</template>
<script>
import '@simonwep/pickr/dist/themes/nano.min.css'
import Pickr from '@simonwep/pickr'
export default {
	props: {
		initData: {
			type: String,
		},
	},
	data() {
		return {
			colorValue: [],
			colorPicker: null,
			colorValueDefault: '42445a',
		}
	},
	computed: {
		stringColorValue() {
			return `#${this.colorValue.join('') || this.colorValueDefault}`
		},
	},
	watch: {
		initData: {
			handler(val) {
				if (val) {
					this.$emit('save', val)
					if (this.colorPicker) {
						this.colorPicker.setColor(val)
					}
				}
			},
		},
	},
	mounted() {
		const colorPicker = Pickr.create({
			el: this.$refs['color-picker'],
			theme: 'nano',
			defaultRepresentation: 'HEX',
			default: `#${this.colorValueDefault}`,
			components: {
				preview: true,
				opacity: true,
				hue: true,
				interaction: {
					hex: true,
					rgba: true,
					input: true,
					save: true,
				},
			},
		})
		colorPicker
			.on('init', (instance) => {
				this.colorPicker = instance
				if (this.initData) {
					this.colorPicker.setColor(this.initData)
				}
			})
			.on('save', (instance) => {
				this.colorValue = instance.toHEXA()
				this.$emit('save', this.colorValue.toString())
			})
			.on('clear', (instance) => {
				// eslint-disable-next-line
				console.log('clear', instance)
			})
			.on('change', (instance) => {
				// eslint-disable-next-line
				console.log('change', instance)
			})
			.on('changestop', (instance) => {
				// eslint-disable-next-line
				console.log('changestop', instance)
			})
	},
}
</script>
<style lang="scss">
.color-input {
	border: 1px solid #dddbda;
	border-radius: 4px;
	background: #ffffff;
	.color-input-value {
		display: inline-block;
		width: calc(100% - 48px);
		padding: 0 10px;
		color: #79797c;
	}
	.button-selecte-color {
		display: inline-block;
		background: #f8f8f8;
		border-radius: 0px 4px 4px 0px;
		padding: 5px 10px;
		.pickr {
			display: inline-block;
		}
	}
}
</style>