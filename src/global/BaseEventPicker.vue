<template>
	<span class="outlined">
		<v-autocomplete
			class="body-2"
			v-bind="this.$attrs"
			:items="events"
			:search-input.sync="search"
			:value="eventId"
			:item-text="itemText"
			label="Chọn sự kiện"
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
			eventId: '',
		}
	},
	async mounted() {
		this.$message.loading('Đang lấy sự kiện ...')
		await this.fetchAllEvents()
	},
	methods: {
		...mapActions({
			fetchAllEvents: 'event/fetchAllEvents',
		}),
	},
	computed: {
		...mapGetters({
			events: 'event/getAllEvents',
		}),
	},
}
</script>