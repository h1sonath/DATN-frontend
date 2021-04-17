import Repository from '@/api/core'
// import {BASE_URL} from './constants'

const fetch = params => {
	return Repository('http://codedidungso.me:5000/uploads/' + params).fetch()
}
const upload = params => {
	return Repository('http://codedidungso.me:5000/file/upload').upload(params)
}

export default {
	fetch,
	upload
}
