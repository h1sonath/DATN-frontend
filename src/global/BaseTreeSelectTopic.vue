<template>
	<v-container>
		<v-row>
			<v-col>
				<v-treeview
					v-model="selection"
					:items="items"
					:selection-type="selectionType"
					selectable
					return-object
					item-key="id"
					item-text="title"
					open-all
				></v-treeview>
			</v-col>
			<v-divider vertical></v-divider>
			<v-col class="pa-6" cols="6">
				<template v-if="!selection.length"
					>Không có chủ đề nào được chọn.
				</template>
				<template v-else>
					<div v-for="node in selection" :key="node.id">
						{{ node.title }}
					</div>
				</template>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	props: {
		selectionType: {
			type: String,
			default: 'independent',
		},
	},
	async created() {
		await this.fetchTopics()
		this.convertedData()
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
			interests: 'interest/getInterests',
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
						rootTopics[topic.parentId].children.push(topic)
					}
				}
			})
			this.items = Object.values(rootTopics)
		},
	},
	watch: {
		interests: {
			handler(interests) {
				if (interests && interests.length) {
					// this.selection = interests.map((interest) => {
					// 	return interest.topic
					// })
				}
			},
			immediate: true,
		},
	},
}
</script>