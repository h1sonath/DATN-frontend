<template>
	<div class="pa-3">
		<v-data-table :headers="headers" :items="data" class="has-border">
			<template v-slot:[`item.teacher`]="{item}">
				<div class="table-content">
					<span class="font-weight-bold">{{ item.teacher.name }} </span>
					<br />

					{{ item.teacher.department }}
					<br />
					{{ item.teacher.email }}
					<br />
					{{ item.teacher.phone }}
				</div>
			</template>
			<template v-slot:[`item.topic`]="{item}">
				<div class="table-content">
					<span class="table-text">
						{{ item.topic.title }}
					</span>
					<br />
					Loại đồ án:
					<span class="table-text">
						{{ item.topic.type }}
					</span>
					<br />
					Số SV:<span class="table-text">
						{{ item.topic.maxStudents }}
					</span>
					<br />
					Hệ:<span class="table-text">
						{{ item.topic.program.toString() }}
					</span>
				</div>
			</template>
		</v-data-table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			data: [
				{
					teacher: {
						name: 'Nguyễn Tiến Thành',
						department: 'CNPM',
						email: 'thanh@gmail.com',
						phone: '0123456789'
					},
					topic: {
						title: 'Tóm tắt văn bản tóm lược và trích rút',
						type: 'ĐATN',
						program: [
							'KSCQ',
							'SIE',
							'KSTN',
							'CTTT',
							'CNKH',
							'Viet-Phap',
							'KSCLC',
							'CNCN',
							'HEDSPI'
						],
						maxStudents: '5'
					}
				},
				{
					teacher: {
						name: 'Nguyễn Tiến Thành',
						department: 'CNPM',
						email: 'thanh@gmail.com',
						phone: '0123456789'
					},
					topic: {
						title: 'Chowi ddien tu',
						type: 'ĐATN',
						program: [
							'KSCQ',
							'SIE',
							'KSTN',
							'CTTT',
							'CNKH',
							'Viet-Phap',
							'KSCLC',
							'CNCN',
							'HEDSPI'
						],
						maxStudents: '10'
					}
				}
			],
			headers: [
				{
					text: 'Giảng viên hướng dẫn',
					align: 'start',
					sortable: false,
					value: 'teacher'
				},
				{
					text: 'Đề tài',
					value: 'topic',
					align: 'start',
					sortable: false
				}
			]
		}
	}
}
</script>
<style scoped>
.table-content {
	padding: 9px 0px;
}
.table-text {
	color: blue;
	font-weight: bold;
}
</style>
