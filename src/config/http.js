/**
 * Created by dyk on 2017/1/22.
 */
import fetch from 'isomorphic-fetch'
import {message} from 'antd';

const apiHost = () => {
    let env = process.env.NODE_ENV
    let apiHost = ''
    if (env === 'development') {
        apiHost = 'http://121.201.14.42:8081'
    } else if (env === 'production') {
        apiHost = 'http://121.201.14.42:8081'
    }
    return apiHost
}

const getToken = () => {
    if (window.localStorage) {
        const storage = window.localStorage
        if (storage.getItem('token') && (new Date() - new Date(storage.getItem('cacheTime'))) / (1000 * 60 * 60 * 24) < 7) {
            return storage.getItem('token')
        } else {
            loginOut()
        }
    }
}

const loginOut = () => {
    if (window.localStorage) {
        const storage = window.localStorage
        storage.removeItem("cacheTime");
        storage.removeItem("token");
        storage.removeItem("remember");
    }
    window.location.href = '/'
}

const fetchEnca = (type, url, data, callback, urlParam, errorCallback, isOpen) => {
    if (window.sitemap) {
        let fetchOpt = {
            method: type,
            headers: {
                'Accept': 'application/json'
            }
        }

        if (data instanceof FormData) {
        }else {
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
                if(urlParam[key]) {
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
                        if (errorCallback) {
                            errorCallback(data)
                        }
                    }
                    response.json().then(data => {
                        const error = JSON.stringify(data).substr(0, 80) + '……'
                        message.error(error, 10)
                        if (errorCallback) {
                            errorCallback(data)
                        }
                    })
                    throw new Error(response.status)
                }else if (response.status === 204) {
                    return '删除成功'
                }
                return response.json()
            })
            .then(data => {
                if (callback) {
                    callback(data)
                }
            })
    }
}

export default {
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
    captcha: (callback) => {
        fetchEnca('GET', 'captcha', null, callback, null, null, true)
    },
    login: (data, callback) => {
        fetchEnca('POST', 'token_login', data, callback, null, null, true)
    },
    loginOut,
    getSitemap: (callback) => {
        if (!window.sitemap) {
            fetch(`${window.localStorage.getItem('host') || apiHost()}/sitemap/`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status >= 400) {
                        response.json().then(data => {
                            message.error(JSON.stringify(data), 10)
                        })
                        throw new Error(response.status)
                    }
                    return response.json()
                })
                .then(data => {
                    window.sitemap = data
                    if (callback) {
                        callback()
                    }
                })
                .catch(() => {
                    message.error('服务器无法访问！', 10)
                })
        } else {
            if (callback) {
                callback()
            }
        }

    },
    apiHost
}