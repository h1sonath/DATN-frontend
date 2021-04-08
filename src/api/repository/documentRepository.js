import Repository from '@/api/core'
// import {BASE_URL} from './constants'

const fetch = params => {
	return Repository('http://localhosr:5000/uploads/').fetch(params)
}
const upload = params => {
	return Repository('http://localhost:5000/file/upload').updateCurrent(params)
}

export default {
	fetch,
  upload
}
