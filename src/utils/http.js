/**
 * Created by dyk on 2017/1/22.
 */
import fetch from 'isomorphic-fetch'
import {message} from 'antd';

const apiHost = window.localStorage.getItem('host') || WEBPACK_HOST

const fetchEnca = (type, url, data, urlParam, isOpen) => {
    let fetchOpt = {
        method: type,
        headers: {
            'Accept': 'application/json'
        }
    }

    if (data instanceof FormData) {
    } else {
        data = JSON.stringify(data)
        fetchOpt.headers['Content-Type'] = 'application/json'
    }

    switch (type) {
        case 'POST':
            fetchOpt['body'] = data
            break
        case 'PATCH':
            fetchOpt['body'] = data
            break
    }

    let fetchUrl = /^https?:\/\//.test(url) ? url : window.sitemap[url]

    if (urlParam) {
        fetchUrl += '?'
        for (let key in urlParam) {
            let value = urlParam[key]
            if (value) {
                value = typeof value === 'string' ? value : JSON.stringify(value)
                fetchUrl += '&' + key + '=' + encodeURIComponent(value)
            }
        }
    }

    if (!isOpen) {
        fetchOpt.headers['Authorization'] = 'token ' + getToken()
    }

    return fetch(fetchUrl, fetchOpt)
        .then(response => {
            if (response.status >= 400) {
                if (response.status === 401) {
                    loginOut()
                }
                if (response.status === 500) {
                    message.error('服务器异常！', 10)
                }
                response.json().then(data => {
                    const error = JSON.stringify(data).substr(0, 80) + '……'
                    message.error(error, 10)
                })
                throw new Error(response.status)
            } else if (response.status === 204) {
                return Promise.resolve('删除成功')
            }
            return response.json()
        })
}

const getUrl = (key) => window.sitemap[key]

const login = (data) => {
    return new Promise(resolve => {
        fetchEnca('POST', 'token_login', data, null, true)
            .then(tokenData => {
                if (tokenData.token && window.localStorage) {
                    const storage = window.localStorage
                    storage.setItem('cacheTime', new Date())
                    storage.setItem('token', tokenData.token)
                    storage.setItem('phone', data.phone)
                }
                resolve(tokenData)
            })
    })
}

const loginOut = () => {
    const storage = window.localStorage
    storage.removeItem("cacheTime")
    storage.removeItem("token")
    storage.removeItem("remember")
    window.location.href = '/'
}

const checkLogin = () => (window.localStorage.getItem('remember') === 'true' &&
(new Date() - new Date(window.localStorage.getItem('cacheTime'))) / (1000 * 60 * 60 * 24) <= 7) ||
(new Date() - new Date(window.localStorage.getItem('cacheTime'))) / (1000 * 60 * 60) <= 2

const getToken = () => {
    if (checkLogin()) {
        return window.localStorage.getItem('token')
    } else {
        loginOut()
    }
}

export default {
    apiHost,
    fetch: fetchEnca,
    get: (url) => fetchEnca('GET', url),
    post: (url, data) => fetchEnca('POST', url, data),
    put: (url, data) => fetchEnca('PUT', url, data),
    delete: (url) => fetchEnca('DELETE', url),
    patch: (url, data) => fetchEnca('PATCH', url, data),
    getSitemap: () => {
        return new Promise(resolve => {
            fetchEnca('GET', `${apiHost}api/sitemap/`, null, null, true)
                .then(data => {
                    window.sitemap = data
                    resolve(data)
                })
        })
    },
    getUrl,
    login,
    loginOut,
    checkLogin,
}