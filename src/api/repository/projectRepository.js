import Repository from '@/api/core'
import CONSTANT from './constants'
const fetch = (params) => {
  return Repository(CONSTANT.BASE_URL+ 'project').fetch(params)
}

const fetchOne = (id) => {
  return Repository(CONSTANT.BASE_URL+ 'project').fetchOne(id)
}

const create = (params) => {
  return Repository(CONSTANT.BASE_URL+ 'project').create(params)
}

const update = (id, params) => {
  return Repository(CONSTANT.BASE_URL+ 'project').update(id, params)
}

const remove = (id) => {
  return Repository(CONSTANT.BASE_URL+ 'project').delete(id)
}


export default {
  fetch,
  fetchOne,
  create,
  update,
  remove,
}