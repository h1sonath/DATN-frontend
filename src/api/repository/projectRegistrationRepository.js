import Repository from '@/api/core'

const studentFetch = params => {
	return Repository('http://codedidungso.me:5000/request/student').fetch(params)
}
const teacherFetch = params => {
	return Repository('http://codedidungso.me:5000/request/teacher').fetch(params)
}
const fetchOne = id => {
	return Repository('http://codedidungso.me:5000/request').fetchOne(id)
}
const create = params => {
	return Repository('http://codedidungso.me:5000/request').create(params)
}

const update = (id, params) => {
	return Repository('http://codedidungso.me:5000/request').update(id, params)
}

const remove = id => {
	return Repository('http://codedidungso.me:5000/request').delete(id)
}

export default {
	studentFetch,
  teacherFetch,
	fetchOne,
	create,
	update,
	remove
}
