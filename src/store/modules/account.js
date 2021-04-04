import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Account = RepositoryFactory.get('account')
const namespaced = true

const state = {
	account: {}
}

const actions = {
	async fetchAccount({commit}, id) {
		const account = await Account.fetchOne(id)
		commit('setaccountData', account.data)
		return account.data
	},
	async updateAccount({commit}, {...data}) {
		const res = await Account.update(data)
		commit('setAccountData', {})
		return res
	},
	async setAccount({commit}, account) {
		return commit('setAccountData', account)
	}
}

const mutations = {
	setAccountData(state, account) {
		return (state.account = account)
	}
}

const getters = {
	getCurrentAccount: state => {
		return state.account
	}
}

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
