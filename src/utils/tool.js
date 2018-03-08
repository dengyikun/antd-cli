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
    download: (url, fileName) => {
        let a = document.createElement("a")
        a.href = url
        a.download = fileName || url.substring(url.lastIndexOf('/') + 1)
        a.click()
    },
    getParams: (key) => {
        let match,
            pl = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, " "));
            },
            query = window.location.search.substring(1),
            params = {}
        while (match = search.exec(query))
            params[decode(match[1])] = decode(match[2])
        return key ? params[key] : params
    },
    imagesLoader: (images, callback) => {
        let total = images.length
        let completed = 0
        images.map(src => {
            let image = new Image()
            image.src = src
            image.onload = () => {
                callback((++completed / total * 100).toFixed(0))
            }
            image.onerror = () => {
                console.log('TOOL Error imagesLoader:' + src)
                callback((++completed / total * 100).toFixed(0))
            }
        })
    },
    getGUID: () => {
        const s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
}