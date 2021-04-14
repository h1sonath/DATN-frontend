import Repository from '@/api/core'
import CONSTANT from './constants'
const fetch = (params) => {
  return Repository(CONSTANT.BASE_URL+ 'topic').fetch(params)
}
const fetchAllTopicID = (params) => {
  return Repository(CONSTANT.BASE_URL + 'system/all-topic-id').fetch(params)
}
const fetchOne = (id) => {
  return Repository(CONSTANT.BASE_URL+ 'topic').fetchOne(id)
}
const fetchTeacherTopic = params => {
  return Repository(CONSTANT.BASE_URL + 'topic/current-teacher').fetch(params)
}

const create = (params) => {
  return Repository(CONSTANT.BASE_URL+ 'topic').create(params)
}

const update = (id, params) => {
  return Repository(CONSTANT.BASE_URL+ 'topic').update(id, params)
}

const remove = (id) => {
  return Repository(CONSTANT.BASE_URL+ 'topic').delete(id)
}


export default {
  fetchTeacherTopic,
  fetchAllTopicID,
  fetch,
  fetchOne,
  create,
  update,
  remove,
}