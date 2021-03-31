import {Auth} from '@/api/repository/authRepository'
const namespaced = true
import Base64 from '@/helpers/encodeBase64.js'
const AUTH_USER_STORAGE_NAME = 'ol-credentials-auth-user'
const state = {
	user: {},
	users: [],
	confirmCode: '',
  authenticated: false,
  isRunning: false
}

const actions = {
	async initAuthen({commit, dispatch}) {
		let authUser = await _loadAuthUser()
		if (authUser) {
			dispatch('validateAuthUser', {authUser})
		} else commit('setUser', null)
	},
	async signIn({commit}, data) {
		const res = await Auth.signin(data)
		localStorage.setItem('encode', Base64.encode(data.password))
		_saveAuthUser(res.data)
		commit('setUser', res.data)
		return res.data || {}
	},
	async validateAuthUser({commit, dispatch}, payload) {
		const {authUser} = payload
		let now = Date.now()
		let {accessTokenExpiredAt} = authUser
		if (accessTokenExpiredAt < now) {
			await dispatch('refreshToken', authUser)
		} else {
			commit('setUser', authUser)
			commit('setAuthenticated', true)
			_saveAuthUser(authUser)
		}
	},
	async refreshToken({commit, dispatch}, authUser) {
		const newTokens = await Auth.refreshToken(authUser, authUser.accessToken)
		const newAuthUser = {
			...authUser,
			...newTokens
		}
		dispatch('setAuth', newAuthUser)
		commit('setAuthenticated', true)
		_saveAuthUser(newAuthUser, newAuthUser.vendorId)
  },
  refreshTokenSingleton({dispatch, state, commit}) {
		if (state.isRunning) return
		commit('setIsRunning', true)
		setInterval(async () => {
			let authUserEncoded = localStorage.getItem('ol-credentials-auth-user')
			if (authUserEncoded) {
				let authUser = JSON.parse(
					Base64.decode(authUserEncoded)
				)
				await dispatch('refreshToken', authUser)
			}
		}, 24 * 60 * 60 * 1000)
  },
  setAuth({dispatch, commit}, authuser) {
		if (authuser) dispatch('refreshTokenSingleton')
		commit('setUser', authuser)
	},
  async signOut({commit}) {
		commit('setUser', null)
		commit('setAuthenticated', false)
		_removeAuthUser()
	},

	async signUp({commit}, data) {
		const res = await Auth.signup(data)
		commit('setUser', res.data)
		return res.data || {}
	},
}

const mutations = {
	setUser(state, user) {
		state.user = user
	},
	setAuthenticated(state, status) {
		state.authenticated = status
	}
}

const getters = {
	getUser: state => {
		return state.user
	},
}

function _saveAuthUser(authUser) {
	let authUserEncoded = Base64.encode(JSON.stringify(authUser))
	return window.localStorage.setItem(AUTH_USER_STORAGE_NAME, authUserEncoded)
}
function _loadAuthUser() {
	let authUserEncoded = localStorage.getItem(AUTH_USER_STORAGE_NAME)
	try {
		return authUserEncoded ? JSON.parse(Base64.decode(authUserEncoded)) : null
	} catch (err) {
		console.log(err)
		return null
	}
}
function _removeAuthUser() {
	window.localStorage.removeItem('encode')
	return window.localStorage.removeItem(AUTH_USER_STORAGE_NAME)
}


export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
