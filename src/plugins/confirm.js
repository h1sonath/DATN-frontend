import BaseConfirm from '@/global/BaseConfirm.vue'
const _initConfirmData = {
  state: false,
  title: "",
  text: "",
  okText: "Xác nhận",
  persistent: false,
  confirmColor: "",
  cancelText: "Hủy bỏ",
  hideCancel: false,
  hideOk: false,
  done() {},
  cancel() {},
};

const confirm = {
	confirmData: {..._initConfirmData},
	show(dialogData = {}) {
		Object.assign(this.confirmData, {
			state: true,
			...dialogData
		})
	},
	cancel() {
		this.confirmData.state = false
		this.confirmData.cancel()
		setTimeout(() => {
			Object.assign(this.confirmData, _initConfirmData)
		}, 500)
	}
}

export default {
	install(Vue, pluginName = '$confirm') {
		Vue.prototype[pluginName] = confirm
		Vue.component('plugin-confirm', BaseConfirm)
	}
}
export {confirm}
