<template>
	<span class="outlined">
		<v-autocomplete
			class="body-2"
			v-bind="$attrs"
			:items="items"
			:loading="isLoading"
			:search-input.sync="search"
			label="Chọn khóa học"
			placeholder="Nhập để tìm kiếm"
			:item-text="itemText"
			:item-value="itemValue"
			return-object
			dense
			outlined
			@change="(value) => $emit('change', value)"
		></v-autocomplete>
	</span>
</template>

<script>
import {mapActions} from 'vuex'
export default {
	props: {
		type: {
			type: String,
			default: 'offline',
		},
		itemText: String,
		itemValue: String,
	},
	data() {
		return {
			search: '',
			items: [],
			isLoading: false,
		}
	},
	methods: {
		...mapActions({
			fetch: 'offlineCourse/fetchAll',
		}),
		async fetchCourses() {
			try {
				this.items = await this.fetch({
					type: this.type,
				})
			} catch (error) {
				this.$message.error(error)
			}
		},
	},
	computed: {
		tags() {
			return this.search ? this.$utils.clearUnicode(this.search) : ''
		},
	},
	watch: {
		async search() {
			if (this.items.length > 0) return
			if (this.isLoading) return
			this.isLoading = true
			await this.fetchCourses()
			this.isLoading = false
		},
	},
}
</script>