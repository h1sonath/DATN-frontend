
import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Company = RepositoryFactory.get('company')
const namespaced = true

const state = {
	company: {},
	companies: [],
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
		commit('setCompanies', res.data.data  || [])
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
		state.companies.push(company)
	},
	setCompanyData(state, company) {
		return (state.company = company)
	},
	setCompanies(state, companies) {
		return (state.companies = companies)
	},
	removeCompany(state, id) {
		state.companies = state.companies.filter(company => company.id !== id)
		state.company = {}
	}
}

const getters = {
	getAllCompany: state => {
		return state.companies
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
