//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import store from '@/store';
import { getToken } from '@/utils/token'
//1.利用axios对象方法create，创建一个axios实例
const request = axios.create({
    baseURL: "/api",
    timeout: 5000,
});
//2.请求拦截器
request.interceptors.request.use(
    config => {
        //进度条开始
        nprogress.start()
        console.log("请求拦截器", store.state.detail.uuid_token);
        if (store.state.detail.uuid_token) {
            config.headers.userTempId = store.state.detail.uuid_token;
        }
        // 登录成功后，将token添加到请求头中
        if (getToken()) {
            config.headers.token = getToken();
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
//3.响应拦截器
request.interceptors.response.use(
    response => {
        //进度条结束
        nprogress.done()
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)
export default request