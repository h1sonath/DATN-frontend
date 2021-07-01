// import { RepositoryFactory } from '@/api/factory/repositoryFactory'
import auth from '@/store/modules/auth'
import axios from 'axios'
// const Resource = RepositoryFactory.get('document')
const namespaced = true

const state = {
	documents: {},
	document: {}
}

const actions = {
	async createDocument({commit}, file) {
		const res = await axios.put(
			"http://codedidungso.me:5000/file/upload",
			file,
			{
				headers: {
					'Content-Type': `multipart/form-data'`,
					Authorization: `Bearer ${auth.state.user.token}`
				}
			},
		)
		commit('setDocumentData', res.data.link)
	},
	async setDocument({ commit }, document) {
		return commit('setDocumentData', document)
	},
	async addDocument({ commit }, document) {
		return commit('setDocument', document)
	}
}

const mutations = {
	setDocument(state, document) {
		return (state.documents = {
			...state.documents,
			[document.id]: document
		})
	},
	setDocumentData(state, document) {
		return (state.document = document)
	},
	appendDocuments(state, documents) {
		return (state.documents = {
			...state.documents,
			...documents.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
		})
	},
	setDocuments(state, documents) {
		return (state.documents = documents.reduce(
			(acc, cur) => ({ ...acc, [cur.id]: cur }),
			{}
		))
	},
	removeDocument(state, id) {
		delete state.documents[id]
		state.documents = { ...state.documents }
	}
}

const getters = {
	documents: state => {
		return Object.values(state.documents)
	},
	count: state => {
		return state.count
	},
	document: state => {
		return state.document
	}
}


export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
