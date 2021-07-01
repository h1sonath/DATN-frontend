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
	if (
		(authUser && authUser.role === 'STUDENT') ||
		(authUser && authUser.role === 'TEACHER')
	) {
		next()
	}
	else {
		alert("Vui lòng đăng nhập")
		next('login')}
}
export default AuthFilter
