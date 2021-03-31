import Repository from '@/api/core'

const fetch = (params) => {
  return Repository('http://localhost:5000/topic').fetch(params)
}
const fetchAllTopicID = (params) => {
  return Repository('http://localhost:5000/system/all-topic-id').fetch(params)
}
const fetchOne = (id) => {
  return Repository('http://localhost:5000/topic').fetchOne(id)
}

const create = (params) => {
  return Repository('http://localhost:5000/topic').create(params)
}

const update = (id, params) => {
  return Repository('http://localhost:5000/topic').update(id, params)
}

const remove = (id) => {
  return Repository('http://localhost:5000/topic').delete(id)
}


export default {
  fetchAllTopicID,
  fetch,
  fetchOne,
  create,
  update,
  remove,
}