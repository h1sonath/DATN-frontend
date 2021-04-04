import Repository from '@/api/core'
// const baseURL = process.env.VUE_APP_API_AUTH
const APIHelper = () => ({
	signin: params => {
		return Repository('http://codedidungso.me:5000/auth/login').createWithoutToken(params)
	},
  signup: params => {
    return Repository('http://codedidungso.me:5000/auth/register-student').createWithoutToken(params)
  }
})
export const Auth = APIHelper()
export default {
	Auth
} 
