import axios from 'axios'

const Repository = BASE_URL => ({
  count: (params, option) =>
    axios.get(
      BASE_URL + '-count',
      {
        params: { ...params, },
      },
      option
    ),
  fetch: (params, option) =>
    axios.get(
      BASE_URL,
      { params: { ...params, } },
      option
    ),
  fetchOne: (id, option) =>
    axios.get(
      BASE_URL + '/' + id,
      { params: { } },
      option
    ),
  create: (params, options) =>
    axios.post(
      BASE_URL,
      { ...params },
      options
    ),
    createMany: (params, options) =>
    axios.post(
      BASE_URL + '/create-many',
      { ...params, },
      options
    ),
  update: (id, params, option) =>
    axios.put(
      BASE_URL + `/${id}`,
      params,
      {
      },
      option
    ),
  updateWithoutAccessToken: (id, params, option) =>
    axios.put(
      BASE_URL + `/${id}`,
      params,
      option
    ),
  deleteWithoutAccessToken: (id, option) =>
    axios.delete(
      BASE_URL + `/${id}`,
      option
    ),
  delete: (id, option) =>
    axios.delete(
      BASE_URL + `/${id}`,
      {
      },
      option
    ),
  average: (params, option) =>
    axios.get(
      BASE_URL + `-average`,
      { params: { ...params, } },
      option
    )
})

export default Repository
