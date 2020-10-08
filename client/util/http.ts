import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

interface AxiosParams {
  [key: string]: string;
}

const parseUrl = (url: string, params: AxiosParams) => {
  params = params || {}
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`
    return result
  }, '')
  return `${baseUrl}/api${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url: string, params: AxiosParams) => (
  new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then((resp) => {
        const { data } = resp
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(reject)
  })
)

export const post = (url: string, params: AxiosParams, requestData: AxiosParams) => (
  new Promise((resolve, reject) => {
    axios.post(parseUrl(url, params), requestData)
      .then((resp) => {
        const { data } = resp
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(reject)
  })
)
