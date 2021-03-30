
import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Project = RepositoryFactory.get('project')
const namespaced = true

const state = {
	project: {},
	projects: [],
}

const actions = {
	async createproject({commit}, data) {
		const project = await Project.create(data)
		commit('addProject', project.data)
		return project.data
	},
	async fetchprojects({commit}, params = {}) {
		const res = await Project.fetch({
			...params
		})
		commit('setProjects', res.data || [])
		return res.data
	},
	async fetchproject({commit}, id) {
		const project = await Project.fetchOne(id)
		commit('setProjectData', project.data)
		return project.data
	},
	async updateproject({commit}, {id, ...project}) {
		const res = await Project.update(id, project)
		commit('setProjectData', res.data)
		return res.data
	},
	async removeproject({commit}, item) {
		const res = await Project.remove(item.id)
		commit('removeProject', item.id)
		return res.data
	},
	async setproject({commit}, project) {
		return commit('setProjectData', project)
	}
}

const mutations = {
	addProject(state, project) {
		state.projects.push(project)
	},
	setProjectData(state, project) {
		return (state.project = project)
	},
	setProjects(state, projects) {
		return (state.projects = projects)
	},
	removeProject(state, id) {
		state.projects = state.projects.filter(project => project.id !== id)
		state.project = {}
	}
}

const getters = {
	getAllProject: state => {
		return state.projects
	},
	getOneProjectById: state => {
		return state.project
	}
}

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
