import Repository from '@/api/core'

const fetch = params => {
	return Repository('http://localhost:5000/request').fetch(params)
}
const fetchOne = id => {
	return Repository('http://localhost:5000/request').fetchOne(id)
}
const create = params => {
	return Repository('http://localhost:5000/request').create(params)
}

const update = (id, params) => {
	return Repository('http://localhost:5000/request').update(id, params)
}

const remove = id => {
	return Repository('http://localhost:5000/request').delete(id)
}

export default {
	fetch,
	fetchOne,
	create,
	update,
	remove
}
