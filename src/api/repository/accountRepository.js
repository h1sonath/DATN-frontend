import Repository from '@/api/core'
import CONSTANT from './constants'
const fetch = params => {
	return Repository(CONSTANT.BASE_URL + 'account/current').fetch(params)
}

const update = params => {
	return Repository(CONSTANT.BASE_URL+ 'account').updateCurrent(params)
}
export default {
	fetch,
	update
}
