/*eslint-disable */ 
import get from 'lodash-es/get'
import helpers from '@/helpers'



// const isAdmin = () => {
// 	return getRolePermission() && getRolePermission().name === 'admin'
// }

// const isTeacher = () => {
// 	return getRolePermission() && getRolePermission().name === 'teacher'
// }


const clearUnicode = (alias = '', hyphen = true) => {
	var str = alias
	str = str.toLowerCase()
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
	str = str.replace(/đ/g, 'd')
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		' '
	)
	str = str.replace(/ + /g, ' ')
	if (hyphen)
		str = str
			.trim()
			.split(' ')
			.join('-')
	return str.trim()
}

// const convertDuration = (duration) => {
// 	if (isNaN(duration)) {
// 		return duration
// 	} else {
// 		let tDuration = duration
// 		let tH = Math.floor(tDuration / (60 * 60))
// 		if (tH > 9) {
// 			let tH2 = Math.round(tDuration / (60 * 60))
// 			if (tH2 > tH) {
// 				return `Gần ${tH2} tiếng`
// 			} else if (tH == tH2) {
// 				if (tH * 60 * 60 == tDuration) {
// 					return `${tH2} tiếng`
// 				} else {
// 					return `Hơn ${tH2} tiếng`
// 				}
// 			}
// 		} else if (tH > 0) {
// 			let tM = Math.round((tDuration - tH * 60 * 60) / 60)
// 			if (tM > 0) {
// 				return `${tH} tiếng ${tM} phút`
// 			}
// 			return `${tH} tiếng`
// 		} else {
// 			let tM = Math.round(tDuration / 60)
// 			if (tM > 0) return `${tM} phút`
// 			return `${tDuration} giây`
// 		}
// 	}
// }



// const getRolePermission = () => {
// 	const {PERMISSION} = helpers
// 	const role = get(auth.state.auth, 'roles.0')
// 	const rolePermissionKey = Object.keys(PERMISSION).find(key => {
// 		return PERMISSION[key] && PERMISSION[key].name === role
// 	})
// 	const rolePermission = PERMISSION[rolePermissionKey]
// 	return rolePermission || {}
// }

const cleanObject = (obj = {}, filter = Boolean) => {
	const output = {}
	if (obj['not-clear-request']) return obj
	for (let key in obj) {
		if (filter(obj[key], key) || obj[key] === 0 || obj[key] === false) {
			output[key] = obj[key]
		}
	}
	return output
}

// const getDateFromSetting = (settings, type) => {
// 	if (!settings.hasRangeTime) return
// 	if (type === 'start') {
// 		return new Date(
// 			settings.rangeTimeFromHour + ' ' + settings.rangeTimeFromDate
// 		)
// 	} else if (type === 'end') {
// 		return new Date(settings.rangeTimeToHour + ' ' + settings.rangeTimeToDate)
// 	}
// }

// const secondsToHms = d => {
// 	d = Number(d)
// 	var h = Math.floor(d / 3600)
// 	var m = Math.floor((d % 3600) / 60)
// 	var s = Math.floor((d % 3600) % 60)

// 	var hDisplay = h > 0 ? h + (h == 1 ? ' tiếng, ' : ' tiếng, ') : ''
// 	var mDisplay = m > 0 ? m + (m == 1 ? ' phút, ' : ' phút, ') : ''
// 	var sDisplay = s > 0 ? s + (s == 1 ? ' giây' : ' giây') : ''
// 	return hDisplay + mDisplay + sDisplay
// }

const toNumberOrZero = (numberString = '') => {
	return numberString ? +numberString : 0
}

const parseScore = (score, number) => {
	return score ? Number(score.toFixed(number)) : 0
}

// const isImage = (extension) => {
// 	return /\.(gif|jpe?g|tiff?|png|webp|bmp)/i.test(`.${extension}`)
// }
// const delay = (ms) => new Promise((res) => setTimeout(res, ms))



export default {
	parseScore,
	clearUnicode,
	// combineLinkWithBucket,
	// getRolePermission,
	// isAdmin,
	// isTeacher,
	cleanObject,
	// getDateFromSetting,
	// secondsToHms,
	toNumberOrZero,
	// convertDuration,
	// isImage,
	// delay,
}
