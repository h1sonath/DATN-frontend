import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vi from '@/plugins/locale.vi.js'
Vue.use(Vuetify)

const opts = {
	theme: {
		// dark: true,
		themes: {
			light: {
				primary: '#255cc2',
				secondary: '#3c73d9',
				third: '#c8dbff',
				forth: '#01256b',
				anchor: '#8c9eff',
				error: '#ff0b16',
				success: '#00dd51',
				warning: '#ffc900',
				gray: '#cfcdd3',
				purple: '#5955de',
				pink: '#ff004f',
				orange: '#ff8f00',
				'drak-gray': '#908e95',
				'light-gray': '#f2f2f2'
			}
		}
	},
	lang: {
		locales: {vi},
		current: 'vi'
	}
}

export default new Vuetify(opts)
