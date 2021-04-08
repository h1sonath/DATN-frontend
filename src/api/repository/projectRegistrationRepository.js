import Repository from '@/api/core'
import CONSTANT from './constants'
const studentFetch = params => {
	return Repository(CONSTANT.BASE_URL + 'request/student').fetch(params)
}
const teacherFetch = params => {
	return Repository(CONSTANT.BASE_URL + 'request/teacher').fetch(params)
}
const accept = (params) => {
  return Repository(CONSTANT.BASE_URL + 'teacher/accept/?requestID=').accept(params)
}
const fetchOne = id => {
	return Repository(CONSTANT.BASE_URL + 'request').fetchOne(id)
}
const create = params => {
	return Repository(CONSTANT.BASE_URL + 'request').create(params)
}

const update = (id, params) => {
	return Repository(CONSTANT.BASE_URL + 'request').update(id, params)
}

const remove = id => {
	return Repository(CONSTANT.BASE_URL + 'request').delete(id)
}

export default {
  accept,
	studentFetch,
  teacherFetch,
	fetchOne,
	create,
	update,
	remove
}
