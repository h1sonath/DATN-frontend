
import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Project = RepositoryFactory.get('project')
const namespaced = true

const state = {
	project: {},
	projects: [],
}

const actions = {
	async createProject({commit}, data) {
		const project = await project.create(data)
		commit('addProject', Project.data)

		return project.data
	},
	async fetchProjects({commit}, params = {}) {
		const res = await Project.fetch({
			...params
		})
		commit('setProjects', res.data.data || [])
		return res.data.data
	},
	async fetchProject({commit}, id) {
		const project = await Project.fetchOne(id)
		commit('setProjectData', project.data)
		return project.data
	},
	async updateProject({commit}, {id, ...project}) {
		const res = await Project.update(id, project)
		commit('setProjectData', res.data.data)
		return res.data
	},
	async removeProject({commit}, item) {
		const res = await Project.remove(item.id)
		commit('removeProject', item.id)
		return res.data
	},
	async setProject({commit}, project) {
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
	getAllproject: state => {
		return state.projects
	},
	getOneprojectById: state => {
		return state.projects
	}
}

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
