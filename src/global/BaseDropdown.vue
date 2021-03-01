<template>
	<v-select
		class="text-body-2"
		:items="items"
		:item-text="itemText"
		:item-value="itemValue"
		:disabled="disabled"
		v-bind="$attrs"
		v-model="tempValue"
		outlined
		dense
		:multiple="multiple"
		:label="label"
		:placeholder="placeholder"
	>
		<template slot="item" slot-scope="{item}">
			<template v-if="getValue(item) == actionCustomValue">
				<slot name="action-custom"></slot>
				<template v-if="!$slots['action-custom']">
					{{ getText(item) }}
				</template>
			</template>
			<template v-else>
				{{ getText(item) }}
			</template>
		</template>
	</v-select>
</template>
<script>
import get from 'lodash-es/get'
export default {
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		value: {
			type: String,
			default: '',
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		itemText: {
			type: String,
			default: 'text',
		},
		itemValue: {
			type: String,
			default: 'value',
		},
		actionCustomValue: {
			type: String,
			default: 'action-custom',
		},
		label: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			tempValue: this.value || '',
		}
	},
	methods: {
		getText(item) {
			return item instanceof Object && this.itemText
				? get(item, this.itemText)
				: item
		},
		getValue(item) {
			return item instanceof Object && this.itemValue
				? get(item, this.itemValue)
				: item
		},
		isActionCustomValue(value) {
			return this.actionCustomValue && value == this.actionCustomValue
		},
	},
	watch: {
		tempValue(value, oldValue) {
			if (this.isActionCustomValue(value)) {
				this.$emit('action-custom')
				this.$nextTick(() => (this.tempValue = oldValue))
			} else {
				this.$emit('input', value)
			}
		},
		value: {
			handler(value) {
				this.tempValue = value
			},
			immediate: true,
		},
	},
}
</script>