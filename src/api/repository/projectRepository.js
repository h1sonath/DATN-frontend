import Repository from '@/api/core'
import CONSTANT from './constants'
const fetch = params => {
	return Repository(CONSTANT.BASE_URL + 'project').fetch(params)
}
const fetchStudentProjects = params => {
	return Repository(CONSTANT.BASE_URL + 'project/student').fetch(params)
}
const fetchTeacherProjects = params => {
	return Repository(CONSTANT.BASE_URL + 'project/teacher').fetch(params)
}
const fetchOne = id => {
	return Repository(CONSTANT.BASE_URL + 'project').fetchOne(id)
}

const create = params => {
	return Repository(CONSTANT.BASE_URL + 'project').create(params)
}

const updateStudentProject = (id, params) => {
	return Repository(CONSTANT.BASE_URL + 'project/student').update(id, params)
}
const updateTeacherProject = (id, params) => {
	return Repository(CONSTANT.BASE_URL + 'project/teacher').update(id, params)
}

const remove = id => {
	return Repository(CONSTANT.BASE_URL + 'project').delete(id)
}

export default {
	fetchTeacherProjects,
	fetchStudentProjects,
	fetch,
	fetchOne,
	create,
	updateTeacherProject,
	updateStudentProject,
	remove
}
