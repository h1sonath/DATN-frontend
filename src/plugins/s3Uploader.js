import {Auth} from '@/api/repository/authRepository.js'
import mimeTypes from 'mime-types'
import auth from '@/store/modules/auth'
import axios from 'axios'

/**
 * Function upload video lên vimeos. sử dụng tus method để hỗ trợ upload và retry
 * @return: Promise
 */
async function uploadFile(file, link, onProgress) {
	const contentType = mimeTypes.lookup(file.name)
	if (contentType) {
		const params = {
			key: link,
			contentType,
		}
		let signedUrl = await Auth.getS3SignedToken(
			params,
			auth.state.user.token,
		)
		return await axios.put(signedUrl, file, {
			onUploadProgress: function(progressEvent) {
				let {loaded, total} = progressEvent
				onProgress({
					loaded,
					total,
					percent: (loaded / total) * 100
				})
			},
			headers: {
				'Content-Type': contentType
			}
		})
	} else throw new Error('Vui lòng kiểm tra lại định dạng file')
}

export default {
	uploadFile
}
