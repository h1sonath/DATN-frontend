
import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Student = RepositoryFactory.get('student')
const namespaced = true

const state = {
	student: {},
	students: [],
}

const actions = {
	async createStudent({commit}, data) {
		const Student = await Student.create(data)
		commit('addStudent', Student.data)
		return Student.data
	},
	async fetchStudents({commit}, params = {}) {
		const res = await Student.fetch({
			...params
		})
		commit('setStudents', res.data || [])
		return res.data
	},
	async fetchStudent({commit}, id) {
		const Student = await Student.fetchOne(id)
		commit('setStudentData', Student.data)
		return Student.data
	},
	async updateStudent({commit}, {id, ...Student}) {
		const res = await Student.update(id, Student)
		commit('setStudentData', res.data)
		return res.data
	},
	async removeStudent({commit}, item) {
		const res = await Student.remove(item.id)
		commit('removeStudent', item.id)
		return res.data
	},
	async setStudent({commit}, Student) {
		return commit('setStudentData', Student)
	}
}

const mutations = {
	addStudent(state, Student) {
		state.Students.push(Student)
	},
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
