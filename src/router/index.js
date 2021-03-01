import Vue from 'vue'
import VueRouter from 'vue-router'
import AccountLayout from '@/templates/layout/AccountLayout'
import navigationRoutes from '@/router/navigationRoutes'

Vue.use(VueRouter)



const routes = [
  {
    path: "/",
    component: AccountLayout,
    children: navigationRoutes,
  },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes
})

export default router
