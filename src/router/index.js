import Vue from 'vue'
import VueRouter from 'vue-router'
import AccountLayout from '@/templates/layout/AccountLayout'
import navigationRoutes from '@/router/navigationRoutes'
import AuthFilter from '@/router/authFilter'

Vue.use(VueRouter)
function lazyLoad(view) {
	return () => import(`@/pages/${view}.vue`)
}
const routes = [
	{
		path: '/',
    redirect: '/login'
	},
	{
		path: '/login',
		name: 'Sign In',
		component: lazyLoad('LogIn'),
		meta: {
			title: 'Đăng nhập'
		}
	},
	{
		path: '/projectList',
		beforeEnter: AuthFilter,
		component: AccountLayout,
		children: navigationRoutes
	}
]

const router = new VueRouter({
	mode: 'history',
	scrollBehavior() {
		return {x: 0, y: 0}
	},
	routes
})

export default router
