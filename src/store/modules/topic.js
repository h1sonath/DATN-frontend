import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Topic = RepositoryFactory.get('topic')
const namespaced = true

const state = {
	topic: {},
	topicID1: '',
	topicID2: '',
	topicID3: '',
	topics: [],
	topicsShortInfo: []
}

const actions = {
	async fetchAllTopicID({commit}, params = {}) {
		const res = await Topic.fetchAllTopicID({
			...params
		})
		commit('setTopicsShortInfo', res.data.data || [])
		return res.data.data
	},
	async createTopic({commit}, data) {
		const topic = await Topic.create(data)
		commit('addTopic', topic.data)
		return topic.data
	},
	async fetchTopics({commit}, params = {}) {
		const res = await Topic.fetch({
			...params
		})
		commit('setTopics', res.data.data || [])
		return res.data.data
	},
	async fetchTeacherTopic({commit}, params = {}) {
		const res = await Topic.fetchTeacherTopic({
			...params
		})
		commit('setTopics', res.data.data || [])
		return res.data.data
	},
	async fetchTopic({commit}, id) {
		const res = await Topic.fetchOne(id)
		commit('setTopicData', res.data.data)
		return res.data.data
	},

	async updateTopic({commit}, {id, ...topic}) {
		const res = await Topic.update(id, topic)
		commit('setTopicData', res.data.data)
		return res.data.data
	},
	async removeTopic({commit}, item) {
		const res = await Topic.remove(item.id)
		commit('removeTopic', item.id)
		return res.data.data
	},
	async setTopic({commit}, topic) {
		return commit('setTopicData', topic)
	},
	async setTopicID1({commit}, id) {
		return commit('setTopicID1', id)
	},
	async setTopicID2({commit}, id) {
		return commit('setTopicID2', id)
	},
	async setTopicID3({commit}, id) {
		return commit('setTopicID3', id)
	}
}

const mutations = {
	setTopicsShortInfo(state, topics) {
		state.topicsShortInfo = topics
	},
	setTopicID1(state, id) {
		state.topicID1 = id
	},
	setTopicID2(state, id) {
		state.topicID2 = id
	},
	setTopicID3(state, id) {
		state.topicID3 = id
	},
	addTopic(state, topic) {
		state.topics.push(topic)
	},
	setTopicData(state, topic) {
		return (state.topic = topic)
	},
	setTopics(state, topics) {
		return (state.topics = topics)
	},
	removeTopic(state, id) {
		state.topics = state.topics.filter(topic => topic.id !== id)
		state.topic = {}
	}
}

const getters = {
	getAllTopicsShortInfo: state => {
		return state.topicsShortInfo
	},
	getAllTopics: state => {
		return state.topics
	},
	getOneTopicById: state => {
		return state.topic
	},
	getTopicRegis1: state => {
		return state.topicID1
	},
	getTopicRegis2: state => {
		return state.topicID2
	},
	getTopicRegis3: state => {
		return state.topicID3
	}
}

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
