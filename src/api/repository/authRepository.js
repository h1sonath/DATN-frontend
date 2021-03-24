import Repository from '@/api/core'
// const baseURL = process.env.VUE_APP_API_AUTH
const APIHelper = () => ({
	signin: params => {
		return Repository('http://localhost:5000/auth/login').create(params)
	},
  signup: params => {
    return Repository('http://localhost:5000/auth/register-student').create(params)
  }
})
export const Auth = APIHelper()
export default {
	Auth
}
