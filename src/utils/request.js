import axios from 'axios'
import qs from 'qs'
const CancelToken = axios.CancelToken
function Request() {
    this.pending = new Map() //保存每个请求的取消函数和请求标识
    this.whiteList = [] //保存可以多次请求的api白名单
    this.instance = axios.create({
        baseURL: '/api/',
        timeout: 5000,
    })
    this.init()
}

// 添加请求信息到pending中
Request.prototype.addPending = function(config) {
    const requestKey = this.getReqIndentify(config)
    console.log('requestKey', requestKey)
    config.cancelToken = config.cancelToken ||  new CancelToken(c => {
        if(!this.pending.has(requestKey)){
            this.pending.set(requestKey, c)
        }
    })
}
// 检查是否存在重复其你去，若存在则取消已发送的请求
Request.prototype.removePending = function(config) {
    const requestKey = this.getReqIndentify(config)
    console.log('requestKey', requestKey)
    if(this.pending.has(requestKey)) {
        const fn = this.pending.get(requestKey)
        fn('请勿频繁操作...')
        this.pending.delete(requestKey)
    }
    
}
// 获取唯一标识indentify
Request.prototype.getReqIndentify = function(config) {
    const { method, baseURL, url, params, data } = config
    return [method, baseURL, url, qs.stringify(params), qs.stringify(data)].join('&')
}
// 初始化拦截器方法
Request.prototype.init = function () {
    // 设置请求拦截器
    this.instance.interceptors.request.use(config => {
        // 如果请求url不在白名单中，设置取消请求
        if(!this.whiteList.includes(config.url)){
            this.removePending(config) // 检查是否存在重复请求，若存在则取消已发的请求
            this.addPending(config) //把当前请求信息添加到pending中
        }
        // 请求之前设置request header body等
        // 例如统一对phone，password等加密处理
        return config
    }, error => {
        // 请求出错
        return Promise.reject(error)
    })

    // 设置响应拦截器
    this.instance.interceptors.response.use(response => {
        this.removePending(response.config) //从pending中移除
        // 处理返回数据
        // 例如对返回码进行的错误处理
        return response.data
    }, error => {
        this.removePending(error.config || {}) //从pending中移除
        // 超出 2xx 范围的 状态码 触发error
        // 可以对4xx, 5xx等等响应错误进行处理
        return Promise.reject(error)
    })
}

Request.prototype.getInstance = function(){
    return this.instance
}

export default new Request().getInstance()