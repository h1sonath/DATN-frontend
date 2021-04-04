
import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Program = RepositoryFactory.get('program')
const namespaced = true

const state = {
	program: {},
	programs: [],
}

const actions = {
	async createProgram({commit}, data) {
		const program = await Program.create(data)
		commit('addProgram', program.data)

		return program.data
	},
	async fetchPrograms({commit}, params = {}) {
		const res = await Program.fetch({
			...params
		})
		commit('setPrograms', res.data.data || [])
		return res.data.data
	},
	async fetchProgram({commit}, id) {
		const program = await Program.fetchOne(id)
		commit('setProgramData', program.data.data)
		return program.data.data
	},
	async updateProgram({commit}, {id, ...program}) {
		const res = await Program.update(id, program)
		commit('setProgramData', res.data.data)
		return res.data.data
	},
	async removeProgram({commit}, item) {
		const res = await Program.remove(item.id)
		commit('removeProgram', item.id)
		return res.data.data
	},
	async setProgram({commit}, program) {
		return commit('setProgramData', program)
	}
}

const mutations = {
	addProgram(state, program) {
		state.programs.push(program)
	},
	setProgramData(state, program) {
		return (state.program = program)
	},
	setPrograms(state, programs) {
		return (state.programs = programs)
	},
	removeProgram(state, id) {
		state.programs = state.programs.filter(program => program.id !== id)
		state.program = {}
	}
}

const getters = {
	getAllProgram: state => {
		return state.programs
	},
	getOneProgramById: state => {
		return state.program
	}
}

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
