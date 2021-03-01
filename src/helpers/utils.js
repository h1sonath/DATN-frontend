/*eslint-disable */ 
import moment from 'moment'
import get from 'lodash-es/get'
import XLSX from 'xlsx'
import helpers from '@/helpers'


const combineLinkWithBucket = linkResource => {
	if (linkResource && linkResource.includes('http')) {
		return linkResource
	} else {
		return process.env.VUE_APP_AWS_BUCKET_S3 + '/' + linkResource
	}
}

// const isAdmin = () => {
// 	return getRolePermission() && getRolePermission().name === 'admin'
// }

// const isTeacher = () => {
// 	return getRolePermission() && getRolePermission().name === 'teacher'
// }

const exportFileExcel = async (data, fileName) => {
	let wb = XLSX.utils.book_new()
	let wsStudent = XLSX.utils.json_to_sheet(data)
	XLSX.utils.book_append_sheet(wb, wsStudent, 'result')
	XLSX.writeFile(
		wb,
		`${fileName}-${moment(new Date()).format('DD/MM/YYYY')}.xlsx`
	)
}

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

const convertDuration = (duration) => {
	if (isNaN(duration)) {
		return duration
	} else {
		let tDuration = duration
		let tH = Math.floor(tDuration / (60 * 60))
		if (tH > 9) {
			let tH2 = Math.round(tDuration / (60 * 60))
			if (tH2 > tH) {
				return `Gần ${tH2} tiếng`
			} else if (tH == tH2) {
				if (tH * 60 * 60 == tDuration) {
					return `${tH2} tiếng`
				} else {
					return `Hơn ${tH2} tiếng`
				}
			}
		} else if (tH > 0) {
			let tM = Math.round((tDuration - tH * 60 * 60) / 60)
			if (tM > 0) {
				return `${tH} tiếng ${tM} phút`
			}
			return `${tH} tiếng`
		} else {
			let tM = Math.round(tDuration / 60)
			if (tM > 0) return `${tM} phút`
			return `${tDuration} giây`
		}
	}
}



// const getRolePermission = () => {
// 	const {PERMISSION} = helpers
// 	const role = get(auth.state.auth, 'roles.0')
// 	const rolePermissionKey = Object.keys(PERMISSION).find(key => {
// 		return PERMISSION[key] && PERMISSION[key].name === role
// 	})
// 	const rolePermission = PERMISSION[rolePermissionKey]
// 	return rolePermission || {}
// }

const importFileExcelAndGetData = async (file, colRangeIndex, richCellRangeStart = 0, richCellRangeEnd = 0) => {
	let dataExcel = []
	const reader = new FileReader()
	return new Promise((resolve, reject) => {
		reader.onload = async evt => {
			const bstr = evt.target.result
			const wb = XLSX.read(bstr, {type: 'binary'})
			wb.SheetNames.forEach(sheetName => {
				const currentSheet = wb.Sheets[sheetName]
				const colRange = get(currentSheet['!ref'], '3', '')
				if (colRange && colRange == helpers.DEFAULT_LABELS[colRangeIndex]) {
					const rows = XLSX.utils.sheet_to_json(currentSheet, {defval: ''})
					rows.forEach((row, index) => {
						dataExcel.push({
							...row,
							..._richCellExtract(row, index, currentSheet, richCellRangeStart, richCellRangeEnd),
						})
					})
				} else {
					reject({
						type: 'wrong_template',
						message:
							'Sai định dạng file, vui lòng kiểm tra lại hoặc thử lại bằng template mẫu!'
					})
				}
			})
			resolve(dataExcel)
		}
		reader.readAsBinaryString(file)
	})
}

const _richCellExtract = (row, rowIndex, currentSheet, rangeStart = 0, rangeEnd = 0) => {
	const rowKeys = Object.keys(row)
	const richCells = {}
	for (let i = rangeStart; i < rangeEnd; i++) {
		const cell = row[rowKeys[i]]
		if (cell) {
			richCells[rowKeys[i]] = get(
				currentSheet[helpers.DEFAULT_LABELS[i] + (rowIndex + 2)],
				'h',
				cell
			)
		}
	}
	return richCells
}

const formatMoney = (number, currency = '', isSuffix = true) => {
	const cookedNumber = Math.floor(Number(number))
	let result = cookedNumber + ''
	if (number > 0) {
		result = cookedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
	}
	if (currency) {
		return isSuffix ? result + currency : currency + result
	}
	return result
}

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

const getDateFromSetting = (settings, type) => {
	if (!settings.hasRangeTime) return
	if (type === 'start') {
		return new Date(
			settings.rangeTimeFromHour + ' ' + settings.rangeTimeFromDate
		)
	} else if (type === 'end') {
		return new Date(settings.rangeTimeToHour + ' ' + settings.rangeTimeToDate)
	}
}

const secondsToHms = d => {
	d = Number(d)
	var h = Math.floor(d / 3600)
	var m = Math.floor((d % 3600) / 60)
	var s = Math.floor((d % 3600) % 60)

	var hDisplay = h > 0 ? h + (h == 1 ? ' tiếng, ' : ' tiếng, ') : ''
	var mDisplay = m > 0 ? m + (m == 1 ? ' phút, ' : ' phút, ') : ''
	var sDisplay = s > 0 ? s + (s == 1 ? ' giây' : ' giây') : ''
	return hDisplay + mDisplay + sDisplay
}

const toNumberOrZero = (numberString = '') => {
	return numberString ? +numberString : 0
}

const parseScore = (score, number) => {
	return score ? Number(score.toFixed(number)) : 0
}

const isImage = (extension) => {
	return /\.(gif|jpe?g|tiff?|png|webp|bmp)/i.test(`.${extension}`)
}
const delay = (ms) => new Promise((res) => setTimeout(res, ms))



export default {
	parseScore,
	clearUnicode,
	combineLinkWithBucket,
	// getRolePermission,
	// isAdmin,
	// isTeacher,
	exportFileExcel,
	importFileExcelAndGetData,
	formatMoney,
	cleanObject,
	getDateFromSetting,
	secondsToHms,
	toNumberOrZero,
	convertDuration,
	isImage,
	delay,
}
