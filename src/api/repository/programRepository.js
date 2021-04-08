import Repository from '@/api/core'

import CONSTANT from './constants'
const fetch = params => {
	return Repository(CONSTANT.BASE_URL + 'program').fetch(params)
}

const fetchOne = id => {
	return Repository(CONSTANT.BASE_URL + 'program').fetchOne(id)
}

const create = params => {
	return Repository(CONSTANT.BASE_URL + 'program').create(params)
}

const update = (id, params) => {
	return Repository(CONSTANT.BASE_URL + 'program').update(id, params)
}

const remove = id => {
	return Repository(CONSTANT.BASE_URL + 'program').delete(id)
}

export default {
	fetch,
	fetchOne,
	create,
	update,
	remove
}
