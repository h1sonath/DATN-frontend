import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Topic = RepositoryFactory.get('topic')
const namespaced = true

const state = {
	topic: {},
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
	}
}

const mutations = {
  setTopicsShortInfo(state, topics){
    state.topicsShortInfo = topics
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
	}
}

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
