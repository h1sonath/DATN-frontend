<template>
	<v-select
		v-bind="this.$attrs"
		v-model="selection"
		:items="items"
		:rules="rules"
		chips
		multiple
		outlined
		class="body-2"
		placeholder="Chọn sự quan tâm"
		dense
		item-text="title"
		return-object
		@change="(value) => $emit('change', value)"
	></v-select>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	async created() {
		await this.fetchTopics()
		this.convertedData()
	},
	props: {
		rules: Array,
	},
	data() {
		return {
			items: [],
			selection: [],
		}
	},
	computed: {
		...mapGetters({
			topics: 'topic/topics',
		}),
	},
	methods: {
		...mapActions({
			fetchTopics: 'topic/fetchTopics',
		}),
		getData() {
			return this.selection
		},
		async convertedData() {
			let rootTopics = {}
			let combinedTopicWithChildren = []
			await this.topics.forEach((topic) => {
				if (!topic.parentId)
					rootTopics[topic.id] = {
						...topic,
						children: [],
					}
			})
			await this.topics.forEach((topic) => {
				if (topic.parentId) {
					if (rootTopics[topic.parentId]) {
						rootTopics[topic.parentId].children.push({
							...topic,
							title: `  --- ${topic.title}`,
						})
					}
				}
			})
			Object.keys(rootTopics).forEach((topic) => {
				combinedTopicWithChildren.push(rootTopics[topic])
				if (rootTopics[topic].children && rootTopics[topic].children.length) {
					combinedTopicWithChildren = combinedTopicWithChildren.concat(
						rootTopics[topic].children
					)
				}
			})
			this.items = combinedTopicWithChildren
		},
	},
}
</script>