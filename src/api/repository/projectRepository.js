import Repository from '@/api/core'

const fetch = (params) => {
  return Repository('http://localhost:5000/project').fetch(params)
}

const fetchOne = (id) => {
  return Repository('http://localhost:5000/project').fetchOne(id)
}

const create = (params) => {
  return Repository('http://localhost:5000/project').create(params)
}

const update = (id, params) => {
  return Repository('http://localhost:5000/project').update(id, params)
}

const remove = (id) => {
  return Repository('http://localhost:5000/project').delete(id)
}


export default {
  fetch,
  fetchOne,
  create,
  update,
  remove,
}