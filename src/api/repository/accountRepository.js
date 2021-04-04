import Repository from '@/api/core'

const fetchOne = id => {
	return Repository('http://codedidungso.me:5000/account').fetchOne(id)
}

const update = params => {
	return Repository('http://codedidungso.me:5000/account').updateCurrent(params)
}
export default {
	fetchOne,
	update
}
