/**
 * Created by dyk on 2017/1/22.
 */
import fetch from 'isomorphic-fetch'
import {message} from 'antd';

const apiHost = window.localStorage.getItem('host') || WEBPACK_HOST

const fetchEnca = (type, url, data, callback, urlParam, errorCallback, isOpen) => {
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
            if (urlParam[key]) {
                fetchUrl += '&' + key + '=' + encodeURIComponent(urlParam[key])
            }
        }
    }

    if (!isOpen) {
        fetchOpt.headers['Authorization'] = 'token ' + getToken()
    }

    fetch(fetchUrl, fetchOpt)
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
                if (errorCallback) {
                    errorCallback(data)
                }
                throw new Error(response.status)
            } else if (response.status === 204) {
                return '删除成功'
            }
            return response.json()
        })
        .then(data => {
            if (callback) {
                callback(data)
            }
        })
        .catch(error => {
            console.log(error);
        })
}

const getUrl = (key) => window.sitemap[key]

const login = (data, callback) => {
    fetchEnca('POST', 'token_login', data, (callbackData) => {
        if (callbackData.token && window.localStorage) {
            const storage = window.localStorage
            storage.setItem('cacheTime', new Date())
            storage.setItem('token', callbackData.token)
            storage.setItem('phone', data.phone)
        }
        if (callback) {
            callback(callbackData)
        }
    }, null, null, true)
}

const loginOut = (callback) => {
    const storage = window.localStorage
    storage.removeItem("cacheTime")
    storage.removeItem("token")
    storage.removeItem("remember")
    window.location.href = '/'
    if (callback) {
        callback()
    }
}

const checkLogin = () => (new Date() - new Date(window.localStorage.getItem('cacheTime'))) / (1000 * 60 * 60 * 24) <= 7

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
    get: (url, callback, errorCallback) => {
        fetchEnca('GET', url, null, callback, null, errorCallback)
    },
    post: (url, data, callback, errorCallback) => {
        fetchEnca('POST', url, data, callback, null, errorCallback)
    },
    put: (url, data, callback, errorCallback) => {
        fetchEnca('PUT', url, data, callback, null, errorCallback)
    },
    delete: (url, callback, errorCallback) => {
        fetchEnca('DELETE', url, null, callback, null, errorCallback)
    },
    patch: (url, data, callback, errorCallback) => {
        fetchEnca('PATCH', url, data, callback, null, errorCallback)
    },
    getSitemap: (callback) => {
        fetchEnca('GET', `${apiHost}/api/sitemap/`, null, (data) => {
            window.sitemap = data
            if (callback) {
                callback()
            }
        }, null, null, true)
    },
    getUrl,
    login,
    loginOut,
    checkLogin,
}