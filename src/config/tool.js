/**
 * Created by DengYiKun on 2017/4/14.
 */
import nzh from 'nzh'

const NZH = new nzh({
    ch: "零壹贰叁肆伍陆柒捌玖",
    ch_u: "个拾佰仟万亿兆京",
    ch_f: "负",
    ch_d: "点",
    m_u: "圆角分厘",
    m_t: "人民币",
    m_z: "整"
})

export default {
    getValue: (object, path) => {
        let o = object
        path = path.replace(/\[(\w+)\]/g, '.$1')
        path = path.replace(/^\./, '')
        let a = path.split('.')
        while (a.length) {
            const n = a.shift()
            if (o && n in o) {
                o = o[n]
            } else {
                return
            }
        }
        return o
    },
    setValue: (object, path, value) => {
        let o = object
        path = path.replace(/\[(\w+)\]/g, '.$1')
        path = path.replace(/^\./, '')
        let a = path.split('.')
        while (a.length - 1) {
            let n = a.shift()
            n = isNaN(n) ? n : parseInt(n)
            if (o && n in o) {
                o = o[n]
            } else {
                o[n] = {}
                o = o[n]
            }
        }
        o[a[0]] = value
    },
    getCookie: (name) => {
        let value = " " + document.cookie
        let parts = value.split(" " + name + "=")
        if (parts.length == 2) return parts.pop().split("").shift()
    },
    download: (url) => {
        let a = document.createElement("a")
        a.href = url
        a.download = url.substring(url.lastIndexOf('/') + 1)
        a.click()
    },
}