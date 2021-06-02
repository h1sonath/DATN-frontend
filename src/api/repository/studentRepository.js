import Repository from '@/api/core'
import CONSTANT from './constants'
const fetch = (params) => {
	return Repository(CONSTANT.BASE_URL + 'student').fetch(params)
}

const fetchOne = (id) => {
	return Repository(CONSTANT.BASE_URL + 'student').fetchOne(id)
}

const create = (params) => {
	return Repository(CONSTANT.BASE_URL + 'student').create(params)
}

const update = (id, params) => {
	return Repository(CONSTANT.BASE_URL + 'student').update(id, params)
}
const updatePassword = (params) => {
	return Repository(CONSTANT.BASE_URL + 'auth/change-password').updateCurrent(params)
}


const remove = (id) => {
	return Repository(CONSTANT.BASE_URL + 'student').delete(id)
}


export default {
	fetch,
	fetchOne,
	create,
	update,
	remove,
	updatePassword
}