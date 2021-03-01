<template>
	<div>
		<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
		<link href="//cdn.quilljs.com/1.3.6/quill.core.css" rel="stylesheet" />
		<link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet" />
		<div :id="`toolbar-container${id}`">
			<span class="ql-formats">
				<select class="ql-font"></select>
				<select class="ql-size"></select>
			</span>
			<span class="ql-formats">
				<button class="ql-bold"></button>
				<button class="ql-italic"></button>
				<button class="ql-underline"></button>
				<button class="ql-strike"></button>
			</span>
			<span class="ql-formats">
				<select class="ql-color"></select>
				<select class="ql-background"></select>
			</span>
			<span class="ql-formats">
				<button class="ql-script" value="sub"></button>
				<button class="ql-script" value="super"></button>
			</span>
			<span class="ql-formats">
				<button class="ql-header" value="1"></button>
				<button class="ql-header" value="2"></button>
				<button class="ql-blockquote"></button>
				<button class="ql-code-block"></button>
			</span>
			<span class="ql-formats">
				<button class="ql-list" value="ordered"></button>
				<button class="ql-list" value="bullet"></button>
				<button class="ql-indent" value="-1"></button>
				<button class="ql-indent" value="+1"></button>
			</span>
			<span class="ql-formats">
				<button class="ql-direction" value="rtl"></button>
				<select class="ql-align"></select>
			</span>
			<span class="ql-formats">
				<button class="ql-link"></button>
				<button class="ql-image"></button>
				<button class="ql-video"></button>
				<button class="ql-voice">♫</button>
			</span>
			<span class="ql-formats">
				<button :class="`ql-html${id}`" style="width: fit-content">HTML</button>
			</span>
			<span class="ql-formats">
				<button :id="`ql-math${id}`">
					<div
						style="width: 18px; height: 18px"
						:class="`ql-math-icon${isLocal ? '' : '-prod'}`"
					></div>
				</button>
				<button :id="`ql-chemistry${id}`">
					<div
						style="width: 18px; height: 18px"
						:class="`ql-chemistry-icon${isLocal ? '' : '-prod'}`"
					></div>
				</button>
				<span
					:class="`ql-mathtype${id}`"
					:id="`ql-mathtype${id}`"
					style="display: none"
				></span>
			</span>
		</div>
		<div
			ref="quill-editor"
			:class="`quill-editor${id}`"
			:id="`quill-editor${id}`"
			:style="
				`min-height: ${minHeight}px; max-height: ${maxHeight}; overflow-y: auto`
			"
		></div>
		<BaseUploadDragger type="image" @onUploadSuccess="renderUploadedImage">
			<div ref="uploadImage"></div>
		</BaseUploadDragger>
		<BaseUploadDragger type="audio" @onUploadSuccess="renderUploadedAudio">
			<div ref="uploadAudio"></div>
		</BaseUploadDragger>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
import '@wiris/mathtype-generic/wirisplugin-generic'
Quill.register('modules/imageResize', ImageResize)

export default {
	props: {
		theme: {
			type: String,
			default: 'snow'
		},
		initData: {
			type: String,
			default: null
		},
		minHeight: {
			type: [Number, String],
			default: 300
		},
		maxHeight: {
			type: [Number, String],
			default: '60vh'
		}
	},
	watch: {
		initData: {
			handler(val) {
				if (val) {
					if (!this.initialized) {
						if (this.editor) {
							this.editor.clipboard.dangerouslyPasteHTML(val || '')
						}
						this.initialized = true
					}
				}
			},
			immediate: true
		}
	},
	data() {
		return {
			isLocal: location.hostname === 'localhost',
			initialized: false,
			editor: null,
			id: Date.now()
		}
	},
	async mounted() {
		this.initQuill()
		// eslint-disable-next-line
		this.editor.on('text-change', (delta, oldDelta, source) => {
			this.$emit('text-change', this.getContent())
		})
		if (this.initData) {
			this.editor.clipboard.dangerouslyPasteHTML(this.initData)
		}
	},
	methods: {
		...mapActions({
			createDocument: 'document/createDocument'
		}),
		renderUploadedImage(resource) {
			const link = this.$utils.combineLinkWithBucket(resource[0].link)
			if (link) {
				var range = this.editor.getSelection()
				this.editor.insertEmbed(range.index, 'image', link, Quill.sources.USER)
			} else {
				this.$message.error('Server internal error...')
			}
		},
		pauseAudio() {
			const listAudio = document.getElementsByTagName('audio')
			if (listAudio && listAudio.length) {
				Array.from(listAudio).forEach(audio => {
					audio.pause()
				})
			}
		},
		renderUploadedAudio(resource) {
			const link = this.$utils.combineLinkWithBucket(resource[0].link)
			if (link) {
				var range = this.editor.getSelection()
				this.editor.insertEmbed(
					range.index,
					'audio',
					{url: link},
					Quill.sources.USER
				)
				this.editor.setSelection(length + 1)
			} else {
				this.$message.error('Server internal error...')
			}
		},
		triggerAudioBlot() {
			let BlockEmbed = Quill.import('blots/block/embed')
			class AudioBlot extends BlockEmbed {
				static create(value) {
					let node = super.create()
					node.setAttribute('src', value.url)
					node.setAttribute('controls', true)
					return node
				}
				static value(node) {
					return {
						url: node.getAttribute('src')
					}
				}
			}
			AudioBlot.blotName = 'audio'
			AudioBlot.tagName = 'audio'
			Quill.register(AudioBlot)
		},
		initQuill() {
			this.triggerAudioBlot()
			const imageHandler = async () => {
				if (this.$refs['uploadImage']) this.$refs['uploadImage'].click()
			}

			const audioHandler = async () => {
				if (this.$refs['uploadAudio']) this.$refs['uploadAudio'].click()
			}

			Quill.prototype.getHtml = function() {
				return this.container.querySelector(`.ql-editor`).innerHTML
			}

			const options = {
				theme: this.theme,
				modules: {
					imageResize: true,
					toolbar: {
						container: `#toolbar-container${this.id}`,
						handlers: {
							image: imageHandler,
							voice: audioHandler
						}
					}
				}
			}
			this.editor = new Quill(this.$refs['quill-editor'], options)
			this.initHtmlButton()
			this.initMathtype()
			this.editor.container.onclick = () => {
				this.editor.container.firstChild.focus()
			}
		},
		initMathtype() {
			this.initWiris()
			const mathIcon = document.querySelector(`#ql-math${this.id}`)
			const chemistryIcon = document.querySelector(`#ql-chemistry${this.id}`)
			const trueMathIcon = document.querySelector(
				`.ql-mathtype${this.id} > img#editorIcon`
			)
			const trueChemistryIcon = document.querySelector(
				`.ql-mathtype${this.id} > img#chemistryIcon`
			)
			mathIcon.addEventListener('click', function() {
				if (trueMathIcon) trueMathIcon.click()
			})
			chemistryIcon.addEventListener('click', function() {
				if (trueChemistryIcon) trueChemistryIcon.click()
			})
		},
		initHtmlButton() {
			var txtArea = document.createElement('textarea')
			txtArea.style.cssText =
				'width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;display:none'
			var htmlEditor = this.editor.addContainer('ql-custom')
			htmlEditor.appendChild(txtArea)
			var myEditor = document.querySelector(`#quill-editor${this.id}`)
			// eslint-disable-next-line
			this.editor.on('text-change', (delta, oldDelta, source) => {
				var html = myEditor.children[0].innerHTML
				txtArea.value = html
			})
			var customButton = document.querySelector(`.ql-html${this.id}`)
			const self = this
			customButton.addEventListener('click', function() {
				let needToSave = false
				if (txtArea.style.display === '') {
					needToSave = true
				}
				txtArea.style.display = txtArea.style.display === 'none' ? '' : 'none'
				if (needToSave) {
					var html = txtArea.value
					self.editor.clipboard.dangerouslyPasteHTML(html)
				}
			})
		},
		getContent() {
			//trả về div html vì css của editor lấy từ root, đoạn code này đè thuộc tính của editor
			const border = this.editor.container.style.border
			const padding = this.editor.container.firstChild.style.padding
			this.editor.container.firstChild.removeAttribute('contenteditable')
			this.editor.container.style.minHeight = 'inherit'
			this.editor.container.style.maxHeight = 'inherit'
			this.editor.container.style.border = '0'
			this.editor.container.firstChild.style.padding = '0'
			const result = this.editor.container.outerHTML
			this.editor.container.firstChild.setAttribute('contenteditable', true)
			this.editor.container.style.minHeight = `${this.minHeight}px`
			this.editor.container.style.maxHeight = `${this.maxHeight}`
			this.editor.container.style.border = border
			this.editor.container.firstChild.style.padding = padding
			return result
			// return this.editor.container.outerHTML
			// return this.editor.container.firstChild.innerHTML
		},
		getHtml() {
			return this.editor.container.firstChild.innerHTML
		},
		insertContent(content) {
			this.editor.clipboard.dangerouslyPasteHTML(content)
		},
		reset(content) {
			if (content) {
				this.editor.clipboard.dangerouslyPasteHTML(content)
			}
		},
		initWiris() {
			var genericIntegrationProperties = {}
			// genericIntegrationProperties.target = document.getElementsByClassName(`ql-editor`)[0];
			genericIntegrationProperties.target = this.editor.container.firstChild
			genericIntegrationProperties.toolbar = document.getElementById(
				`ql-mathtype${this.id}`
			)
			var genericIntegrationInstance = new window.WirisPlugin.GenericIntegration(
				genericIntegrationProperties
			)
			genericIntegrationInstance.init()
			genericIntegrationInstance.listeners.fire('onTargetReady', {})
		}
	}
}
</script>
<style lang="scss" scoped>
:root {
	--admin-static: window.lo;
}
::v-deep .quill-editor {
	height: 1px;
	.ql-editor {
		height: 100%;
		> p {
			height: 100%;
		}
		img {
			vertical-align: inherit !important;
		}
	}
}
.ql-container,
.ql-editor {
	height: auto; /* auto-growth */
}

*[quill__html] {
	display: none;

	width: 100%;
	margin: 0;
	background: rgb(29, 29, 29);
	box-sizing: border-box;
	color: rgb(204, 204, 204);
	outline: none;
	padding: 12px 15px;
	line-height: 24px;
	font-family: Consolas, Menlo, Monaco, 'Courier New', monospace;
	position: absolute;
	top: 0;
	bottom: 0;
	border: none;
}

*[quill__html*='-active-'] {
	display: initial;
}

.ql-math-icon {
	background-image: url('https://d3hf489lm7j7jq.cloudfront.net/online-learning-sites/admin/admin-static/math-icon.svg');
	&:hover {
		background-image: url('https://d3hf489lm7j7jq.cloudfront.net/online-learning-sites/admin/admin-static/math-hover-icon.svg');
	}
}
.ql-chemistry-icon {
	background-image: url('https://d3hf489lm7j7jq.cloudfront.net/online-learning-sites/admin/admin-static/chemistry-icon.svg');
	&:hover {
		background-image: url('https://d3hf489lm7j7jq.cloudfront.net/online-learning-sites/admin/admin-static/chemistry-hover-icon.svg');
	}
}

.ql-math-icon-prod {
	background-image: url('https://d3hf489lm7j7jq.cloudfront.net/online-learning-sites/admin/admin-static/math-icon.svg');
	&:hover {
		background-image: url('https://d3hf489lm7j7jq.cloudfront.net/online-learning-sites/admin/admin-static/math-hover-icon.svg');
	}
}
.ql-chemistry-icon-prod {
	background-image: url('https://d3hf489lm7j7jq.cloudfront.net/online-learning-sites/admin/admin-static/chemistry-icon.svg');
	&:hover {
		background-image: url('https://d3hf489lm7j7jq.cloudfront.net/online-learning-sites/admin/admin-static/chemistry-hover-icon.svg');
	}
}
</style>
