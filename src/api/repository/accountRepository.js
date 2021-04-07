import Repository from '@/api/core'

const fetch = params => {
	return Repository('http://codedidungso.me:5000/account/current').fetch(params)
}

const update = params => {
	return Repository('http://codedidungso.me:5000/account').updateCurrent(params)
}
export default {
	fetch,
	update
}
