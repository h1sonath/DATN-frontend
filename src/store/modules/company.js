
import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Company = RepositoryFactory.get('company')
const namespaced = true

const state = {
	company: {},
	companys: [],
}

const actions = {
	async createCompany({commit}, data) {
		const company = await Company.create(data)
		commit('addCompany', company.data)
		return company.data
	},
	async fetchCompanys({commit}, params = {}) {
		const res = await Company.fetch({
			...params
		})
		commit('setCompanys', res.data.data  || [])
		return res.data.data 
	},
	async fetchCompany({commit}, id) {
		const company = await Company.fetchOne(id)
		commit('setCompanyData', company.data)
		return company.data
	},
	async updateCompany({commit}, {id, ...company}) {
		const res = await Company.update(id, company)
		commit('setCompanyData', res.data.data )
		return res.data.data 
	},
	async removeCompany({commit}, item) {
		const res = await Company.remove(item.id)
		commit('removeCompany', item.id)
		return res.data.data 
	},
	async setCompany({commit}, company) {
		return commit('setCompanyData', company)
	}
}

const mutations = {
	addCompany(state, company) {
		state.Companys.push(company)
	},
	setCompanyData(state, company) {
		return (state.Company = company)
	},
	setCompanys(state, companys) {
		return (state.companys = companys)
	},
	removeCompany(state, id) {
		state.companys = state.companys.filter(Company => Company.id !== id)
		state.company = {}
	}
}

const getters = {
	getAllCompany: state => {
		return state.companys
	},
	getOneCompanyById: state => {
		return state.company
	}
}

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
