const AUTH_USER_STORAGE_NAME = 'ol-credentials-auth-user'
import Base64 from '@/helpers/encodeBase64.js'
function _loadAuthUser() {
	let authUserEncoded = localStorage.getItem(AUTH_USER_STORAGE_NAME)
	try {
		return authUserEncoded ? JSON.parse(Base64.decode(authUserEncoded)) : null
	} catch (err) {
		console.log(err)
		return null
	}
}

const AuthFilter = async (to, from, next) => {
	const authUser = _loadAuthUser()
	if (authUser && authUser.role === 'STUDENT') {
		next()
	} else if (authUser && authUser.role === 'TEACHER') {
		next('/manageProjectList')
	} else {
		next('/login')
	}
}
export default AuthFilter
