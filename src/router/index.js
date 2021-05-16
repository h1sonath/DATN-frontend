import Vue from 'vue'
import VueRouter from 'vue-router'
import AccountLayout from '@/templates/layout/AccountLayout'
import AccountTeacherLayout from '@/templates/layout/AccountTeacherLayout'
import navigationRoutes from '@/router/navigationRoutes'
import teacherRoutes from '@/router/teacherRoutes'
import AuthFilter from '@/router/authFilter'

Vue.use(VueRouter)
function lazyLoad(view) {
	return () => import(`@/pages/${view}.vue`)
}
const routes = [
	{
		path: '/',
		redirect: '/projectList'
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
		path: '/signUp',
		name: 'Sign Up',
		component: lazyLoad('SignUp'),
		meta: {
			title: 'Đăng ký tài khoản'
		}
	},
	{
		path: '/projectList',
		beforeEnter: AuthFilter,
		component: AccountLayout,
		children: navigationRoutes
	},
	{
		path: '/manageProjectList',
		beforeEnter: AuthFilter,
		component: AccountTeacherLayout,
		children: teacherRoutes
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
