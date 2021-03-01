function lazyLoad(view) {
  return () => import(`@/pages/${view}.vue`)
}
export default [
  {
    path: "/projectList",
    name: "Danh sách đồ án",
    component: lazyLoad('ProjectList'),
  },
]
