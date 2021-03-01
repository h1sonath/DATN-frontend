<template>
	<span>
		<v-autocomplete
			class="body-2"
			v-bind="this.$attrs"
			:items="items"
			:value="value"
			:item-text="itemText"
			:label="label"
			:placeholder="placeholder"
			:item-value="itemValue"
			:multiple="isMultipleSelect"
      :chips="isMultipleSelect"
			outlined
			return-object
			dense
			@change="(value) => onChangeValue(value)"
		>
			<template v-if="isMultipleSelect" v-slot:selection="data">
        <v-chip
					small
          v-if="!data.item.disabled"
          v-bind="data.attrs"
          :input-value="data.selected"
        >
         {{data.item.title}}
        </v-chip>
      </template>
		</v-autocomplete>
	</span>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	props: {
		value: [ String, Array ],
		itemText: String,
		itemValue: String,
		type: String,
		isMultipleSelect: {
      type: Boolean,
      default: false,
    },
		placeholder: {
			type: String,
			default: 'Nhập tên nhóm cần thêm',
		},
		label: {
			type: String,
			default: 'Chọn nhóm học viên',
		},
	},
	async created() {
		await this.fetchGroups()
	},
	data() {
		return {
			items: [],
		}
	},
	methods: {
		...mapActions({
			fetchGroups: 'group/fetchGroups',
		}),
		onChangeValue(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    }
	},
	computed: {
		...mapGetters({
			groups: 'group/getGroups',
		}),
	},
	watch: {
		groups: {
			handler(value) {
				if (this.isMultipleSelect) {
          this.items = value.map(group=>{
            let groupSelected = this.value.find(v=>v.id === group.id)
            return {
              ...group,
              disabled: groupSelected ? groupSelected.disabled : false
            }
          })
        } else this.items = [...value]
        this.items.sort((a, b) => {
          let nameA = a.title.toUpperCase()
          let nameB = b.title.toUpperCase()
          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          return 0
        });
			},
			immediate: true
		},
	},
}
</script>
<style lang="scss" scoped>
::v-deep .v-list-item--disabled {
  opacity: 0.5;
}
</style>