import Repository from '@/api/core'

const fetch = (params) => {
  return Repository('http://localhost:5000/student').fetch(params)
}

const fetchOne = (id) => {
  return Repository('http://localhost:5000/student').fetchOne(id)
}

const create = (params) => {
  return Repository('http://localhost:5000/student').create(params)
}

const update = (id, params) => {
  return Repository('http://localhost:5000/student').update(id, params)
}

const remove = (id) => {
  return Repository('http://localhost:5000/student').delete(id)
}


export default {
  fetch,
  fetchOne,
  create,
  update,
  remove,
}