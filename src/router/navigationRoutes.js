function lazyLoad(view) {
	return () => import(`@/pages/${view}.vue`)
}
export default [
	{
		path: '/projectList',
		name: 'Danh sách đồ án',
		component: lazyLoad('ProjectList')
	},
	{
		path: '/topicList',
		name: 'Danh sách đề tài',
		component: lazyLoad('TopicList')
	},
	{
		path: '/companyList',
		name: 'Danh sách doanh nghiệp',
		component: lazyLoad('CompanyList')
	},
	{
		path: '/projectRegistration',
		name: 'Đăng ký nguyện vọng',
		component: lazyLoad('ProjectRegistration')
	},
  {
		path: '/projectDetail/:id',
		name: 'Chi tiết đồ án',
		component: lazyLoad('ProjectDetail')
	},
  {
		path: '/changeStudentInfo',
		name: 'Cập nhật thông tin sinh viên',
		component: lazyLoad('UpdateStudentInfo')
	},  
]
