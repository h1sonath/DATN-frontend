import moment from 'moment'
const inputRules = {
  date: val => /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[0-9]|[0-9]\d)?\d{2})$/.test(val) || "Thời gian chưa hợp lệ",
  required: value => !!value || 'Thông tin bắt buộc',
  notSpace: value => value.replace(' ') === value || 'Không có khoảng trắng',
  notSpecialCharacters: value => !value.match(/[!@#$%^&*(),.?":{}|<>]/g) || 'Không được có kí tự đặc biệt',
  percentage: value => (Number(value) > 0 && Number(value) < 100) || 'Value must be less than 100 and greater than 0',
  atLeastOne: value => value.length > 0 || 'At least one.',
  maxLength: length => (value = '') => {
    if (!value) value = ''
    return value.length <= length || `Độ dài tối đa là ${length}`
  },
  minLength: length => (value = '') => {
    if (!value) value = ''
    return value.length >= length || `Độ dài tối thiểu là ${length}`
  },
  // eslint-disable-next-line
  phone: value => {
    // eslint-disable-next-line
    if(value.length > 0){
      const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      return pattern.test(value) || 'Không đúng số điện thoại'
    }
    else {
      return false
    }
  },
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Sai định dạng e-mail.'
  },
  url: value => {
    if (!value || value.length === 0) return true
    // eslint-disable-next-line
    const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return pattern.test(value) || 'Sai định dạng đường dẫn.'
  },
  number: value => {
    return !isNaN(value) || 'Sai định dạng số'
  },
  validPrice: value => {
    return Number(value) >= 10000 || 'Cổng Thanh toán điện tử không thể thực hiện giao dịch dưới 10.000VNĐ. Vui lòng đặt giá trị cao hơn.'
  },
  greaterEqual: number => value => {
    return Number(value) >= Number(number) || `Số lớn hơn hoặc bằng ${number}`
  },
  greaterThan: number => value => {
    return Number(value) > Number(number) || `Số lớn hơn ${number}`
  },
  lessThan: number => value => {
    return Number(value) < Number(number) || `Số nhỏ hơn ${number}`
  },
  clamp: (min, max) => value => {
    min = Number(min)
    max = Number(max)
    value = Number(value)
    return (value >= min && value <= max) || `Số nằm giữa ${min} và ${max}`
  },
  dateGreaterThan: (date, format = 'hh:mm DD/MM/YYYY') => value => {
    return new Date(value).getTime() > new Date(date).getTime() || `Ngày được chọn phải sau ngày ${moment(date).format(format)}`
  },
  dateLowerThan: (date, format = 'hh:mm DD/MM/YYYY') => value => {
    return new Date(value).getTime() < new Date(date).getTime() || `Ngày được chọn phải trước ngày ${moment(date).format(format)}`
  },
  dateGreaterOrEqual: (date, format = 'DD/MM/YYYY') => value => {
    return (!value || !date || (new Date(value).getTime() >= new Date(date).getTime())) || `Ngày được chọn phải sau ngày ${moment(date).format(format)}`
  },
  dateLowerOrEqual: (date, format = 'DD/MM/YYYY') => value => {
    return (!value || !date || (new Date(value).getTime() <= new Date(date).getTime())) || `Ngày được chọn phải trước ngày ${moment(date).format(format)}`
  },
  time: value => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value) || 'Thời gian chưa hợp lệ',
  rangeTime: endTime => startTime => {
    return startTime.replace(':', '') < endTime.replace(':', '') || 'Thời bắt đầu phải trước thời gian kết thúc!'
  },
  // eslint-disable-next-line
  domain: value => /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/gm.test(value) || 'Sai định dạng domain.'
}

export default inputRules
