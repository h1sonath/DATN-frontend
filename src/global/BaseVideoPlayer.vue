<template>
	<div class="bg-white relative">
		<BaseLoading
			v-if="loadingVimeo"
			class="loading-video"
			fluid
			color="primary"
		/>
		<div class="flex-center">
			<div v-show="!isFindLink">Không tìm thấy đường dẫn !</div>
		</div>
		<div class="embed-container" ref="player"></div>
	</div>
</template>

<script>
import Vimeo from '@vimeo/player'
export default {
	props: {
		link: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			duration: 0,
			currentTime: 0,
			player: null,
			videoURL: '',
			videoWidth: 400,
			videoHeight: 300,
			loadingVimeo: false,
			isFindLink: true,
			ready: false,
		}
	},
	mounted() {
		this.loadingVimeo = true
		this.updateSrc(this.link)
	},
	beforeDestroy() {
		this.player.destroy()
	},
	methods: {
		validateLink(link) {
			if (!link || !link.includes('vimeo')) {
				this.loadingVimeo = false
				this.isFindLink = false
				const player = this.$refs['player']
				if (player && player.shadowRoot) {
					player.shadowRoot.innerHTML = ''
				}
				return false
			} else {
				this.isFindLink = true
				return true
			}
		},
		updateSrc(link) {
			// dont delete this file
			// protect video from coc coc
			if (!this.validateLink(link)) return
			if (this.$refs['player']) {
				const player = this.$refs['player']
				let root = null
				if (player.shadowRoot) {
					player.shadowRoot.innerHTML = ''
					root = player.shadowRoot
				} else {
					root = player.attachShadow({mode: 'open'})
				}
				const vimeoPlayerDom = document.createElement('DIV')
				const style = document.createElement('style')
				style.innerHTML = `
        :host iframe,
        :host object,
        :host embed {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }`
				root.appendChild(style)
				root.appendChild(vimeoPlayerDom)
				this.player = new Vimeo(vimeoPlayerDom, {
					url: link.replace('vimeo.com/', 'player.vimeo.com/video/'),
					title: false,
					byline: false,
					portrait: false,
					badge: false,
				})

				this.player
					.ready()
					.then(() => {
						this.loadingVimeo = false
					})
					.catch((err) => {
						this.loadingVimeo = false
						this.isFindLink = false
						this.$message.error(err && err.message)
					})
				this.player.on('ended', (data) => this.$emit('ended', data))
			}
		},
	},
	watch: {
		link: {
			handler(val) {
				this.loadingVimeo = true
				this.updateSrc(val)
			},
			immediate: true,
		},
	},
}
</script>

<style lang="scss" scope>
.embed-container {
	position: relative;
	padding-bottom: 56.25%;
	height: 0;
	overflow: hidden;
	max-width: 100%;
	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}
.flex-center {
	display: flex;
	justify-content: center;
}
.loading-video {
	position: absolute;
  z-index: 1;
  top: 0;
}
</style>
