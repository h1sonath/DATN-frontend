import axios from "axios";
const BASE_URL = process.env.VUE_APP_API_RESOURCE
/**
 * Function lấy token từ API resource
 * Tạo ra một token để có thể upload video lên vstorage
 * @return: Promise
 */

async function createTokenUpload() {
  return await axios.get(BASE_URL + '/v-storage-token');
}

/**
 * Function upload video lên vstorage
 * Example params : `${process.env.ENV}/${unit.vendorId}/videos/${unit.vimeo.id}`, file, token, unit.vimeo.origin.mimeType
 * @return: Promise
 */

async function uploadVideo(url, file, mimeType, onProgress) {
  const newToken = await createTokenUpload()
  return await axios({
    headers: {
      'X-Auth-Token': newToken.data,
      'Content-Type': mimeType,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: 2 * 60 * 60 * 1000,
    method: 'put',
    url: `${process.env.VUE_APP_VSTORAGE_URL}${url}`,
    data: file,
    onUploadProgress: (progressEvent) => {
      const bytesTotal = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
      if (bytesTotal !== null) {
        const bytesUploaded = progressEvent.loaded
        const percentage = ((bytesUploaded * 100 / bytesTotal)).toFixed(2);
        onProgress({
          loaded: parseFloat(bytesUploaded),
          total: parseFloat(bytesTotal),
          percent: parseFloat(percentage),
        });
      }
    }
  })
}

export default {
  uploadVideo
};