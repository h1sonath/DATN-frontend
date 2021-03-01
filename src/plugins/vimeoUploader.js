import tus from "tus-js-client";
import axios from "axios";
import get from "lodash-es/get";
import vendor from '@/store/modules/vendor'
const BASE_URL = "https://api.vimeo.com/me/videos";
const HEADER = {
  "Content-Type": "application/json",
  Authorization: `bearer ${process.env.VUE_APP_VIMEO_TOKEN}`,
  Accept: "application/vnd.vimeo.*+json;version=3.4",
};
const VIDEO_URL = "https://api.vimeo.com";

/**
 * Function tạo authenticated POST request to /me/videos:
 * Tạo ra một  link để upload video lên vimeo
 * @return: Promise
 */
async function createVimeoLink(file) {
  return await axios.post(
    BASE_URL,
    {
      upload: {
        approach: "tus",
        size: file.size,
      },
      name: file.name,
      vendorId: vendor.state.vendor.vendorId,
    },
    {
      headers: HEADER,
    }
  );
}
/**
 * Function upload video lên vimeos. sử dụng tus method để hỗ trợ upload và retry
 * @return: Promise
 */
async function uploadVimeoFile(file, onProgress) {
  const data = await createVimeoLink(file);
  await createUploadPromise(file, data, onProgress);
  return data;
}

async function uploadSubtitleFile(file, id) {
  const videoData = await getDataVideo(id)
  let textTrackUri = videoData.metadata.connections.texttracks.uri
  const subLink = await createSubtitleLink(textTrackUri)
  let aPromise = await fetch(file.origin.link)
  let body = await aPromise.text()
  await axios.put(
    subLink,
    body,
    {
      headers: {
        Accept: HEADER.Accept,
        "Content-Type": "text/plain",
      }
    }
  )
  await axios.patch(
    VIDEO_URL + videoData.uri,
    {
      "active": true,
    },
    {
      headers: HEADER,
    }
  )
}

async function getDataVideo(id) {
  const result = await axios.get(
    VIDEO_URL + `/videos/${id}`,
    {
      headers: {
        Authorization: HEADER.Authorization,
        Accept: HEADER.Accept,
      }
    }
  )
  return result.data
}
async function createSubtitleLink(uri) {
  const result = await axios.post(
    VIDEO_URL + uri,
    {
      "type": "subtitles",
      "language": "vi",
      "name": "subtitleVideo",
    },
    {
      headers: HEADER,
    }
  );
  return result.data.link
}

async function createUploadPromise(file, data, onProgress) {
  return new Promise((resolve, reject) => {
    var upload = new tus.Upload(file, {
      uploadUrl: get(data, "data.upload['upload_link']"),
      retryDelays: [0, 3000, 5000, 10000, 20000],
      fileName: file.name,
      fileSize: file.size,
      metadata: {
        filename: file.name,
        filetype: file.type,
        fileSize: file.size,
      },
      onError: function (error) {
        reject(error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        onProgress({
          loaded: parseFloat(bytesUploaded),
          total: parseFloat(bytesTotal),
          percent: parseFloat(percentage),
        });
      },
      onSuccess: function () {
        resolve();
      },
    });

    // Start the upload
    upload.start();
  });
}
export default {
  createVimeoLink,
  uploadVimeoFile,
  uploadSubtitleFile,
  getDataVideo
};
