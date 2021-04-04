import Repository from '@/api/core'

const fetch = params => {
	return Repository('http://localhosr:5000/uploads/').fetch(params)
}
const upload = params => {
	return Repository('http://localhost:5000/file/upload').upload(params)
}

export default {
	fetch,
  upload
}
