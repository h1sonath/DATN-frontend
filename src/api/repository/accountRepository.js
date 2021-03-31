import Repository from '@/api/core'

const fetchOne = id => {
	return Repository('http://localhost:5000/account').fetchOne(id)
}

const update = (id, params) => {
	return Repository('http://localhost:5000/account').update(id, params)
}
export default {
	fetchOne,
	update
}
