import Repository from '@/api/core'

const fetch = (params) => {
  return Repository('http://codedidungso.me:5000/program').fetch(params)
}

const fetchOne = (id) => {
  return Repository('http://codedidungso.me:5000/program').fetchOne(id)
}

const create = (params) => {
  return Repository('http://codedidungso.me:5000/program').create(params)
}

const update = (id, params) => {
  return Repository('http://codedidungso.me:5000/program').update(id, params)
}

const remove = (id) => {
  return Repository('http://codedidungso.me:5000/program').delete(id)
}


export default {
  fetch,
  fetchOne,
  create,
  update,
  remove,
}