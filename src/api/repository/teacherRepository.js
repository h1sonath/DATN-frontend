import Repository from '@/api/core'
import CONSTANT from './constants'
const fetch = (params) => {
  return Repository(CONSTANT.BASE_URL+ 'teacher').fetch(params)
}

const fetchOne = (id) => {
  return Repository(CONSTANT.BASE_URL+ 'teacher').fetchOne(id)
}

const create = (params) => {
  return Repository(CONSTANT.BASE_URL+ 'teacher').create(params)
}

const update = (id, params) => {
  return Repository(CONSTANT.BASE_URL+ 'teacher').update(id, params)
}

const remove = (id) => {
  return Repository(CONSTANT.BASE_URL+ 'teacher').delete(id)
}


export default {
  fetch,
  fetchOne,
  create,
  update,
  remove,
}