
import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Teacher = RepositoryFactory.get('teacher')
const namespaced = true

const state = {
	teacher: {},
	teachers: [],
}

const actions = {
	async createTeacher({commit}, data) {
		const teacher = await Teacher.create(data)
		commit('addTeacher', teacher.data)
		return teacher.data
	},
	async fetchTeachers({commit}, params = {}) {
		const res = await Teacher.fetch({
			...params
		})
		commit('setTeachers', res.data.data  || [])
		return res.data.data 
	},
	async fetchTeacher({commit}, id) {
		const res = await Teacher.fetchOne(id)
		commit('setTeacherData', res.data.data )
		return res.data.data 
	},
	async updateTeacher({commit}, {id, ...teacher}) {
		const res = await Teacher.update(id, teacher)
		commit('setTeacherData', res.data.data )
		return res.data.data 
	},
	async removeTeacher({commit}, item) {
		const res = await Teacher.remove(item.id)
		commit('removeTeacher', item.id)
		return res.data.data 
	},
	async setTeacher({commit}, teacher) {
		return commit('setTeacherData', teacher)
	}
}

const mutations = {
	addTeacher(state, teacher) {
		state.teachers.push(teacher)
	},
	setTeacherData(state, teacher) {
		return (state.teacher = teacher)
	},
	setTeachers(state, teachers) {
		return (state.teachers = teachers)
	},
	removeTeacher(state, id) {
		state.teachers = state.teachers.filter(teacher => teacher.id !== id)
		state.teacher = {}
	}
}

const getters = {
	getAllTeacher: state => {
		return state.teachers
	},
	getOneTeacherById: state => {
		return state.teacher
	}
}

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
