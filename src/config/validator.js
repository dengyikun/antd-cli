/**
 * Created by DengYiKun on 2017/2/23.
 */
export default {
    checkIdCard: (rule, value, callback) => {
        if (value === '' || /^[1-9][0-9]{14}$|^[1-9][0-9]{16}([0-9]|[xX])$/.test(value)) {
            callback()
            return
        }
        callback('请输入正确的身份证号！')
    },
    checkTelephone: (rule, value, callback) => {
        if (value === '' || /^[0-9]{7,}$/.test(value)) {
            callback()
            return
        }
        callback('请输入正确的电话号码！')
    },
}