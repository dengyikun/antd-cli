/**
 * Created by DengYiKun on 2017/2/8.
 */
import area from './list.json'

const getArea = () => {
    let areaAry = []
    let provinceKey = ''
    let cityKey = ''
    for (let key in area) {
        if (/^[0-9]{2}[0]{4}/.test(key)) {
            provinceKey = key
            areaAry.push({
                value: area[key],
                label: area[key],
                children: []
            })
        } else if (/^[0-9]{4}[0]{2}/.test(key)) {
            cityKey = key
            let lastProvince = areaAry[areaAry.length - 1]
            if (provinceKey === key.substr(0, 2) + '0000') {
                lastProvince.children.push({
                    value: area[key],
                    label: area[key],
                    children: []
                })
            }
        } else {
            let lastProvince = areaAry[areaAry.length - 1]
            if (provinceKey === key.substr(0, 2) + '0000') {
                let lastCity = lastProvince.children[lastProvince.children.length - 1]
                if (cityKey === key.substr(0, 2) + key.substr(2, 2) + '00') {
                    lastCity.children.push({
                        value: area[key],
                        label: area[key]
                    })
                } else {
                    lastProvince.children.push({
                        value: area[key],
                        label: area[key]
                    })
                    cityKey = key
                }
            }
        }
    }
    return areaAry
}

const getCity = () => {
    let areaAry = []
    let provinceKey = ''
    let cityKey = ''
    for (let key in area) {
        if (/^[0-9]{2}[0]{4}/.test(key)) {
            provinceKey = key
            areaAry.push({
                value: area[key],
                label: area[key],
                children: []
            })
        } else if (/^[0-9]{4}[0]{2}/.test(key)) {
            cityKey = key
            let lastProvince = areaAry[areaAry.length - 1]
            if (provinceKey === key.substr(0, 2) + '0000') {
                lastProvince.children.push({
                    value: area[key],
                    label: area[key],
                })
            }
        } else {
            let lastProvince = areaAry[areaAry.length - 1]
            if (provinceKey === key.substr(0, 2) + '0000') {
                if (cityKey !== key.substr(0, 2) + key.substr(2, 2) + '00') {
                    lastProvince.children.push({
                        value: area[key],
                        label: area[key]
                    })
                    cityKey = key
                }
            }
        }
    }
    return areaAry
}

export default {
    sex: ['男', '女'],
    area: getArea(),
    city: getCity(),
}