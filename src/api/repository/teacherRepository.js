import Repository from '@/api/core'

const fetch = (params) => {
  return Repository('http://codedidungso.me:5000/teacher').fetch(params)
}

const fetchOne = (id) => {
  return Repository('http://codedidungso.me:5000/teacher').fetchOne(id)
}

const create = (params) => {
  return Repository('http://codedidungso.me:5000/teacher').create(params)
}

const update = (id, params) => {
  return Repository('http://codedidungso.me:5000/teacher').update(id, params)
}

const remove = (id) => {
  return Repository('http://codedidungso.me:5000/teacher').delete(id)
}


export default {
  fetch,
  fetchOne,
  create,
  update,
  remove,
}