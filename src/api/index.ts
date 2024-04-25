import axios from 'axios'
import {store} from "../store/store";
import { getToken } from '@/util/auth'
import {error} from "../components/ToastMessage/Message";


// 创建axios实例
const service = axios.create({
  baseURL: 'http://hk.hjong.cn:8080', // api的base_url
  timeout: 5000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      if (res.code === 401) {
        error(res.msg)
        store.actions.LogOut();
        location.reload()
      }
      error(res.msg + ": " + res.data)
      return Promise.reject(new Error('error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    if( error.code === 'ECONNABORTED'){
      error('请求超时')
    }
    return Promise.reject(error)
  }
)



export default service
