
import { RepositoryFactory } from '@/api/factory/repositoryFactory'
const Student = RepositoryFactory.get('student')
const namespaced = true

const state = {
	student: {},
	students: [],
}

const actions = {
	async createStudent({ commit }, data) {
		const student = await Student.create(data)
		commit('addStudent', student.data)
		return student.data
	},
	async fetchStudents({ commit }, params = {}) {
		const res = await Student.fetch({
			...params
		})
		commit('setStudents', res.data.data || [])
		return res.data.data
	},
	async fetchStudent({ commit }, id) {
		const res = await Student.fetchOne(id)
		commit('setStudentData', res.data.data)
		return res.data.data
	},
	async updateStudent({ commit }, { id, ...student }) {
		const res = await Student.update(id, student)
		commit('setStudentData', res.data.data)
		return res.data.data
	},
	async removeStudent({ commit }, item) {
		const res = await Student.remove(item.id)
		commit('removeStudent', item.id)
		return res.data.data
	},
	async setStudent({ commit }, Student) {
		return commit('setStudentData', Student)
	},
	async changePassword({ commit }, { ...data }) {
		const res = await Student.updatePassword(data)
		commit('setData', {})
		return res
	}
}

const mutations = {
	addStudent(state, student) {
		state.Students.push(student)
	},
	setData() { },
	setStudentData(state, student) {
		return (state.student = student)
	},
	setStudents(state, students) {
		return (state.students = students)
	},
	removeStudent(state, id) {
		state.students = state.students.filter(student => student.id !== id)
		state.student = {}
	}
}

const getters = {
	getAllStudent: state => {
		return state.students
	},
	getOneStudentById: state => {
		return state.student
	}
}

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
