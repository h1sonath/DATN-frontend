<template>
	<span class="outlined">
		<v-autocomplete
			class="body-2"
			v-bind="$attrs"
			:items="items"
			v-model="data"
			outlined
			:label="label"
			:item-text="itemText"
			:placeholder="placeholder"
			:item-value="itemValue"
			:return-object="returnObject"
			:search-input.sync="search"
			dense
		>
			<template v-slot:prepend-item>
				<slot name="pre-item"></slot>
			</template>
		</v-autocomplete>
	</span>
</template>

<script>
import get from 'lodash-es/get'
export default {
	props: {
		returnObject: {
			type: Boolean,
			default: true
		},
		items: {
			type: Array,
			default: () => []
		},
		placeholder: {
			type: String
		},
		label: {
			type: String
		},
		value: [Array, Object, String],
		itemText: {
			type: String,
			default: 'title'
		},
		itemValue: {
			type: String,
			default: 'value'
		},
		actionCustomValue: {
			type: String,
			default: 'action-custom'
		}
	},
	data() {
		return {
			data: null,
			search: ''
		}
	},
	watch: {
		value() {
			this.data = this.value
		},
		data(value, oldValue) {
			if (this.isActionCustomValue(value)) {
				this.$emit('action-custom')
				this.$nextTick(() => {
					this.data = oldValue
					this.$forceUpdate()
				})
			} else {
				this.$emit('input', value)
			}
		},
		search() {
			this.$emit('search', this.search)
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
			return (
				this.actionCustomValue &&
				value instanceof Array &&
				value.includes(this.actionCustomValue)
			)
		}
	}
}
</script>
<style lang="scss" scoped>
* {
	font-size: 14px;
}
.checkbox {
	width: 18px;
	height: 18px;
	border: 2px solid #747474;
	border-radius: 2px;
	&--checked {
		border-color: #82b1ff;
		background: #82b1ff;
		> i.v-icon {
			color: #fff !important;
			margin-left: -1px;
			margin-bottom: 3px;
		}
	}
	&--not-checked {
		background: inherit;
	}
}
</style>
