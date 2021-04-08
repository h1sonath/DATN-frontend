import Repository from '@/api/core'
import CONSTANT from './constants'
const APIHelper = () => ({
	signin: params => {
    // console.log(CONSTANT.BASE_URL)
		return Repository(CONSTANT.BASE_URL + 'auth/login').createWithoutToken(params)
	},
	signup: params => {
		return Repository(CONSTANT.BASE_URL + 'auth/register-student').createWithoutToken(
			params
		)
	}
})
export const Auth = APIHelper()
export default {
	Auth
}
