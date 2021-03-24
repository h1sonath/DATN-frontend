
import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const ProjectRegistration = RepositoryFactory.get('projectRegistration')
const namespaced = true

const state = {
	projectRegistration: {},
	projectRegistrations: [],
}

const actions = {
	async createProjectRegistration({commit}, data) {
		const projectRegistration = await ProjectRegistration.create(data)
		commit('addProjectRegistration', projectRegistration.data)
		return projectRegistration.data
	},
	async fetchProjectRegistrations({commit}, params = {}) {
		const res = await ProjectRegistration.fetch({
			...params
		})
		commit('setProjectRegistrations', res.data || [])
		return res.data
	},
	async fetchProjectRegistration({commit}, id) {
		const projectRegistration = await ProjectRegistration.fetchOne(id)
		commit('setProjectRegistrationData', projectRegistration.data)
		return projectRegistration.data
	},
	async updateProjectRegistration({commit}, {id, ...projectRegistration}) {
		const res = await ProjectRegistration.update(id, projectRegistration)
		commit('setProjectRegistrationData', res.data)
		return res.data
	},
	async removeProjectRegistration({commit}, item) {
		const res = await ProjectRegistration.remove(item.id)
		commit('removeProjectRegistration', item.id)
		return res.data
	},
	async setProjectRegistration({commit}, projectRegistration) {
		return commit('setProjectRegistrationData', projectRegistration)
	}
}

const mutations = {
	addProjectRegistration(state, projectRegistration) {
		state.ProjectRegistrations.push(projectRegistration)
	},
	setProjectRegistrationData(state, projectRegistration) {
		return (state.ProjectRegistration = projectRegistration)
	},
	setProjectRegistrations(state, projectRegistrations) {
		return (state.ProjectRegistrations = projectRegistrations)
	},
	removeProjectRegistration(state, id) {
		state.projectRegistrations = state.projectRegistrations.filter(ProjectRegistration => ProjectRegistration.id !== id)
		state.ProjectRegistration = {}
	}
}

const getters = {
	getAllProjectRegistration: state => {
		return state.projectRegistrations
	},
	getOneProjectRegistrationById: state => {
		return state.projectRegistrations
	}
}

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
