<template>
	<span class="outlined">
		<v-autocomplete
			class="body-2"
			v-bind="$attrs"
			:items="items"
			:loading="isLoading"
			:search-input.sync="search"
			label="Chọn khóa học"
			placeholder="Tìm kiếm khóa học"
			:item-text="itemText"
			:item-value="itemValue"
			:value="value"
      :multiple="isMultipleSelect"
      :chips="isMultipleSelect"
			return-object
			dense
			outlined
			@change="(value) => onSelected(value)"
		>
			<template v-if="isMultipleSelect" v-slot:selection="data">
        <v-chip
					small
          v-if="!data.item.disabled"
          v-bind="data.attrs"
          :input-value="data.selected"
        >
          {{ data.item.title }}
        </v-chip>
      </template>
		</v-autocomplete>
	</span>
</template>

<script>
import {debounce} from 'lodash'
import {mapActions} from 'vuex'
export default {
	props: {
		type: {
			type: String,
			default: 'online',
		},
		itemText: String,
		itemValue: String,
		isMultipleSelect: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => {}
    }
	},
	data() {
		return {
			listSelected: [],
			isLoading: false,
			search: '',
			items: [],
		}
	},
	mounted() {
		this.fetchCourses()
	},
	methods: {
		...mapActions({
			fetch: 'onlineCourse/fetchCourses',
		}),
		onSelected(selected) {
			if (this.isMultipleSelect) {
        this.listSelected = selected
      } else {
        this.listSelected = selected ? [selected] : []
      }
      this.$emit('change', this.isMultipleSelect ? this.listSelected : selected)
      this.$emit('input', this.isMultipleSelect ? this.listSelected : selected)
		},
		async fetchCourses(searchString) {
			try {
				this.items = await this.fetch({
					type: this.type,
					_limit: 10,
          _skip: 0,
          tags_contain: searchString || ''
				})
				if (this.listSelected && this.listSelected.length) {
          this.items = this.items.concat(
            this.listSelected ? this.listSelected : []
          )
        }
				this.hanlerData(this.items)
			} catch (error) {
				this.$message.error(error)
			}
			this.isLoading = false
		},
		hanlerData(items) {
			if (this.isMultipleSelect) {
        this.items = items.map(course => {
          let courseSelected = this.value.find(v => v.id === course.id)
          return {
            ...course,
            disabled: courseSelected ? courseSelected.disabled : false
          }
        })
      }
			this.items.sort((a, b) => {
				let nameA = a.title.toUpperCase()
				let nameB = b.title.toUpperCase()
				if (nameA < nameB) return -1
				if (nameA > nameB) return 1
				return 0
			})
		},
		debounce: debounce(function() {
      this.fetchCourses(this.tags)
    }, 1000),
	},
	computed: {
		tags() {
			return this.search ? this.$utils.clearUnicode(this.search) : ''
		},
	},
	watch: {
		tags() {
			if (this.isLoading) return
			this.isLoading = true
			this.debounce()
		},
	},
}
</script>
<style lang="scss" scoped>
::v-deep .v-list-item--disabled {
  opacity: 0.5;
}
</style>