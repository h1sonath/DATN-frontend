import {RepositoryFactory} from '@/api/factory/repositoryFactory'
const Resource = RepositoryFactory.get('document')
const namespaced = true

const state = {
	documents: {},
	document: {},
	count: 0
}

const actions = {
	async createDocument({commit}, file) {
		console.log('file', file)
		const res = await Resource.upload(file)
		console.log(res)
		commit('addDocument', document.data)
		return document.data
	},
	async fetchDocuments({commit}, params = {}) {
		const res = await Resource.fetch({
			...params
		})
		commit('setDocuments', res.data || [])
		return res.data
	},
	async countDocuments({commit}, params = {}) {
		const res = await Resource.count({
			...params
		})
		commit('setCount', res.data || 0)
	},
	async updateDocument({commit}, {id, ...document}) {
		const res = await Resource.update(id, document)
		return commit('setDocument', res.data)
	},
	async removeDocument({commit}, item) {
		await Resource.remove(item.id, {
			vendorId: item.vendorId
		})

		return commit('removeDocument', item.id)
	},
	async setDocument({commit}, document) {
		return commit('setDocumentData', document)
	},
	async addDocument({commit}, document) {
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
	setCount(state, count) {
		return (state.count = count)
	},
	addDocument(state, document) {
		state.count = state.count + 1
		return (state.documents = {
			[document.id]: document,
			...state.documents
		})
	},
	setDocumentData(state, document) {
		return (state.document = document)
	},
	appendDocuments(state, documents) {
		return (state.documents = {
			...state.documents,
			...documents.reduce((acc, cur) => ({...acc, [cur.id]: cur}), {})
		})
	},
	setDocuments(state, documents) {
		return (state.documents = documents.reduce(
			(acc, cur) => ({...acc, [cur.id]: cur}),
			{}
		))
	},
	removeDocument(state, id) {
		delete state.documents[id]
		state.documents = {...state.documents}
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

// const generateDocument = (
// 	file,
// 	{link, subType, provider, html, type}
// ) => {
// 	return {
// 		title: file.name,
// 		size: file.size,
// 		createdBy: auth.state.auth.id,
// 		dataType: 'resource',
// 		link,
// 		html,
// 		provider,
// 		type,
// 		origin: {
// 			link,
// 			size: file.size,
// 			type,
// 			html,
// 			mimeType: mimeTypes.lookup(file.name),
// 		},
// 		subType
// 	}
// }

export default {
	namespaced,
	state,
	actions,
	mutations,
	getters
}
