<template>
	<span class="outlined">
		<v-autocomplete
			class="body-2"
			v-bind="this.$attrs"
			:items="books"
			:search-input.sync="search"
			:value="bookId"
			:item-text="itemText"
			label="Chọn tài liệu điện tử"
			:item-value="itemValue"
			return-object
			dense
			outlined
			@change="(value) => $emit('change', value)"
		></v-autocomplete>
	</span>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	props: {
		itemText: String,
		itemValue: String,
	},
	data() {
		return {
			search: '',
			items: [],
			bookId: '',
		}
	},
	async mounted() {
		this.$message.loading('Đang lấy sách điện tử ...')
		await this.fetchEBooks()
	},
	methods: {
		...mapActions({
			fetchEBooks: 'ebook/fetchBooks',
		}),
	},
	computed: {
		...mapGetters({
			books: 'ebook/getBooks',
		}),
	},
}
</script>