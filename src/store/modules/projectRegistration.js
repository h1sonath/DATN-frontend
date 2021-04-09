
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
	async fetchProjectRegistrationsFromStudent({commit}, params = {}) {
		const res = await ProjectRegistration.studentFetch({
			...params
		})
		commit('setProjectRegistrations', res.data.data || [])
		return res.data.data
	},
  async fetchProjectRegistrationsFromTeacher({commit}, params = {}) {
		const res = await ProjectRegistration.teacherFetch({
			...params
		})
		commit('setProjectRegistrations', res.data.data || [])
		return res.data.data
	},
	async fetchProjectRegistration({commit}, id) {
		const projectRegistration = await ProjectRegistration.fetchOne(id)
		commit('setProjectRegistrationData', projectRegistration.data)
		return projectRegistration.data
	},
	async updateProjectRegistration({commit}, {id, ...projectRegistration}) {
		const res = await ProjectRegistration.update(id, projectRegistration)
		commit('setProjectRegistrationData', res.data.data)
		return res.data
	},
	async removeProjectRegistration({commit}, item) {
		const res = await ProjectRegistration.remove(item.id)
		commit('removeProjectRegistration', item.id)
		return res.data
	},
	async setProjectRegistration({commit}, projectRegistration) {
		return commit('setProjectRegistrationData', projectRegistration)
	},
  async acceptProjectRegistration({commit}, params){
    const res = await ProjectRegistration.accept(params)
		commit('setProjectRegistrationData', {})
		return res
  },
  async rejectProjectRegistration({commit}, params){
    const res = await ProjectRegistration.reject(params)
		commit('setProjectRegistrationData', {})
		return res
  }
}

const mutations = {
	addProjectRegistration(state, projectRegistration) {
		state.projectRegistrations.push(projectRegistration)
	},
	setProjectRegistrationData(state, projectRegistration) {
		return (state.projectRegistration = projectRegistration)
	},
	setProjectRegistrations(state, projectRegistrations) {
		return (state.projectRegistrations = projectRegistrations)
	},
	removeProjectRegistration(state, id) {
		state.projectRegistrations = state.projectRegistrations.filter(projectRegistration => projectRegistration.id !== id)
		state.projectRegistration = {}
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
