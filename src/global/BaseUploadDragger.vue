<template>
	<vue-dropzone
		ref="dropzone"
		id="dropzone"
		:include-styling="false"
		:useCustomSlot="true"
		:options="dropzoneOptions"
	>
		<slot></slot>
		<v-progress-linear
			class="mt-4"
			v-if="loading"
			:value="percent"
		></v-progress-linear>
	</vue-dropzone>
</template>
<script>
import {mapActions} from 'vuex'
import vue2Dropzone from 'vue2-dropzone'
export default {
	components: {
		vueDropzone: vue2Dropzone
	},
	props: {
		maxFilesize: {
			type: Number,
			default: 3750
		},
		type: String,
		maxFiles: {
			type: Number,
			default: 1
		},
		uploadMultiple: Boolean
	},
	data() {
		return {
			loading: false,
			percent: 0,
			dropzoneOptions: {
				previewTemplate: '<div/>',
				url: this.uploadFile,
				maxFilesize: this.maxFilesize,
				addRemoveLinks: false,
				maxFiles: this.maxFiles,
				acceptedFiles: this.acceptedFiles(),
				uploadMultiple: this.uploadMultiple,
				init: function() {
					// eslint-disable-next-line
					this.on('maxfilesexceeded', function(file) {
						this.removeAllFiles(true)
					})
					// eslint-disable-next-line
					this.on('error', function(file, message) {
						console.log(message)
						this.removeAllFiles(true)
					})
				}
			}
		}
	},
	methods: {
		...mapActions({
			createDocument: 'document/createDocument',
			createVimeo: 'cinema/createVimeo',
			createHLSVideo: 'cinema/createHLSVideo'
		}),
		acceptedFiles() {
			if (this.type === 'pdf') {
				return 'application/pdf'
			} else if (this.type === 'video' || this.type === 'vimeo') {
				return '.mp4, .mov, .m4v, .mkv'
			} else if (this.type === 'favicon') {
				return '.ico'
			} else if (this.type === 'sub') {
				return '.vtt'
			} else if (this.type === 'image') {
				return '.jpg, .png, .gif'
			} else if (this.type === 'audio') {
				return '.mp3, .wav'
			} else {
				return 'image/*,application/pdf,.zip, .rar, application/msword, .mp4, .mp3, .wav'
			}
		},
		progressHandler(percent) {
			this.percent = Math.floor(percent)
		},
		async uploadFile(files) {
			try {
				this.loading = true
				const promises = files.map(file => {
					if (this.type === 'vimeo') {
						return this.createVimeo({
							file,
							onProgress: ({percent}) => {
								this.progressHandler(percent)
							}
						})
					} else if (this.type === 'video') {
						return this.createHLSVideo({
							file,
							onProgress: ({percent}) => {
								this.progressHandler(percent)
							}
						})
					} else {
						return this.createDocument({
							type: this.type,
							file,
							onProgress: ({percent}) => {
								this.progressHandler(percent)
							}
						})
					}
				})
				const result = await Promise.all(promises)
				this.loading = false
				if (result) {
					this.$message.success(
						this.type === 'vimeo'
							? 'Đã tải lên, video đang được chuẩn bị'
							: 'Tải lên thành công'
					)
					this.$refs['dropzone'].removeAllFiles(true)
					this.$emit('onUploadSuccess', result)
				}
			} catch (e) {
				this.loading = false
				this.$message.error(e.message)
			}
		}
	}
}
</script>
