import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Project = RepositoryFactory.get('project')
const namespaced = true

const state = {
	project: {},
	projects: []
}

const actions = {
	async createProject({commit}, data) {
		const project = await Project.create(data)
		commit('addProject', Project.data)

		return project.data
	},
	async fetchAllStudentProjects({commit}, params = {}) {
		const res = await Project.fetchStudentProjects({
			...params
		})
		commit('setProjects', res.data.data || [])
		return res.data.data
	},
	async fetchAllTeacherProjects({commit}, params = {}) {
		const res = await Project.fetchTeacherProjects({
			...params
		})
		commit('setProjects', res.data.data || [])
		return res.data.data
	},
	async fetchProject({commit}, id) {
		const project = await Project.fetchOne(id)
		commit('setProjectData', project.data.data)
		return project.data.data
	},
	async updateTeacherProject({commit}, {id, ...project}) {
		const res = await Project.updateTeacherProject(id, project)
		commit('setProjectData', res.data.data)
		return res.data.data
	},
	async updateStudentProject({commit}, {id, ...project}) {
		const res = await Project.updateStudentProject(id, project)
		commit('setProjectData', res.data.data)
		return res.data.data
	},
	async removeProject({commit}, item) {
		const res = await Project.remove(item.id)
		commit('removeProject', item.id)
		return res.data.data
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
	getAllProject: state => {
		return state.projects
	},
	getOneƠrojectById: state => {
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
