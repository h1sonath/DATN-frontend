import Repository from '@/api/core'
import CONSTANT from './constants'

const fetch = (params) => {
  return Repository(CONSTANT.BASE_URL+ 'company').fetch(params)
}

const fetchOne = (id) => {
  return Repository(CONSTANT.BASE_URL+ 'company').fetchOne(id)
}

const create = (params) => {
  return Repository(CONSTANT.BASE_URL+ 'company').create(params)
}

const update = (id, params) => {
  return Repository(CONSTANT.BASE_URL+ 'company').update(id, params)
}

const remove = (id) => {
  return Repository(CONSTANT.BASE_URL+ 'teacompanycher').delete(id)
}


export default {
  fetch,
  fetchOne,
  create,
  update,
  remove,
}