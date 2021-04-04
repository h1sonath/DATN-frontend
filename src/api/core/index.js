import axios from 'axios'
import auth from '@/store/modules/auth'
const Repository = BASE_URL => ({
	count: (params, option) =>
		axios.get(
			BASE_URL + '-count',
			{
				params: {...params}
			},
			option
		),
	fetch: (params, option) =>
		axios.get(
			BASE_URL,
			{
				params: {...params},
				headers: {
					Authorization: `Bearer ${auth.state.user.token}`
				}
			},
			option
		),
	fetchOne: (id, option) =>
		axios.get(
			BASE_URL + '/' + id,
			{
				params: {},
				headers: {
					Authorization: `Bearer ${auth.state.user.token}`
				}
			},
			option
		),
	create: (params, options) =>
		axios.post(
			BASE_URL,
			{...params},
			{
				headers: {
					Authorization: `Bearer ${auth.state.user.token}`
				}
			},
			options
		),
	createWithoutToken: (params, options) =>
		axios.post(BASE_URL, {...params}, options),
	update: (id, params, option) =>
		axios.put(
			BASE_URL + `/${id}`,
			params,
			{
				headers: {
					Authorization: `Bearer ${auth.state.user.token}`
				}
			},
			option
		),
	updateCurrent: (params, option) => {
		axios.put(
			BASE_URL,
			params,
			{
				headers: {
					Authorization: `Bearer ${auth.state.user.token}`
				}
			},
			option
		)
	},
	upload: (params, option) =>
		axios.put(
			BASE_URL,
			params,
			{
				headers: {
					Authorization: `Bearer ${auth.state.user.token}`
				}
			},
			option
		),
	updateWithoutAccessToken: (id, params, option) =>
		axios.put(BASE_URL + `/${id}`, params, option),
	deleteWithoutAccessToken: (id, option) =>
		axios.delete(BASE_URL + `/${id}`, option),
	delete: (id, option) => axios.delete(BASE_URL + `/${id}`, {}, option),
	average: (params, option) =>
		axios.get(BASE_URL + `-average`, {params: {...params}}, option)
})

export default Repository
