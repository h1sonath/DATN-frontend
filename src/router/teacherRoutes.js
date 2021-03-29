function lazyLoad(view) {
	return () => import(`@/pages/${view}.vue`)
}
export default [
	{
		path: '/manageProjectRegistration',
		name: 'Quản lý danh sách nguyện vọng',
		component: lazyLoad('ProjectRegistrationManagement')
	},
	{
		path: '/manageProjectList',
		name: 'Quản lý danh sách đồ án',
		component: lazyLoad('ProjectManagement')
	},
	{
		path: '/manageTopicList',
		name: 'Quản lý danh sách đề tài',
		component: lazyLoad('ProjectManagement')
	},
	{
		path: '/manageCompanyList',
		name: 'Quản lý danh sách công ty',
		component: lazyLoad('ProjectManagement')
	}
]
