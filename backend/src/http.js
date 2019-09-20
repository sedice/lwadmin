import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from './router'

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}

// 请求拦截  设置统一header
axios.interceptors.request.use(config => {
    // 加载
    startLoading()
    if (localStorage.eleToken)
        config.headers.Authorization = "Bearer " + localStorage.eleToken
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截  401 token过期处理
axios.interceptors.response.use(response => {
    endLoading()
    if (response.data && response.data.errcode > 0) {
        return Promise.reject(response.data);
    }
    return response.data
}, err => {
    // 错误提醒
    endLoading();
    if (err && err.response) {
        switch (err.response.status) {
          case 400: 
            err.message = '请求错误(400)';
            if (err.response.data && err.response.data.errmsg) {
                err.message +=  "  " + err.response.data.errmsg;
            }
            break;
          case 401: 
            localStorage.removeItem('eleToken')
            // 页面跳转
            router.push('/login')
            break;
          case 403: err.message = '拒绝访问(403)'; break;
          case 404: err.message = '请求出错(404)'; break;
          case 408: err.message = '请求超时(408)'; break;
          case 500: err.message = '服务器错误(500)'; break;
          case 501: err.message = '服务未实现(501)'; break;
          case 502: err.message = '网络错误(502)'; break;
          case 503: err.message = '服务不可用(503)'; break;
          case 504: err.message = '网络超时(504)'; break;
          case 505: err.message = 'HTTP版本不受支持(505)'; break;
          default: err.message = `连接出错(${err.response.status})!`;
        }
      } else {
        err.message = '连接服务器失败!'
      }
      Message.error(err.message);
      return Promise.reject(err);
})

export default axios