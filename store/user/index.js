import { reqGetCode, reqRegister, reqLogin, reqGetUserInfo } from '@/api/index'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
    code: '',
    token: getToken() || '', // 初始化时从localStorage恢复token
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    GETTOKEN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        try {
            let result = await reqGetCode(phone);
            if (result.code === 200) {
                commit('GETCODE', result.data)
                return "ok"
            } else {
                return new Promise.reject("error")
            }
        } catch (err) {
            return Promise.reject(err);
        }


    },
    //注册
    async register({ commit }, data) {
        try {
            let result = await reqRegister(data);
            if (result.code === 200) {
                return "ok";
            } else {
                return new Promise.reject("error");
            }
        } catch (err) {
            return Promise.reject(err);
        }
    },
    //登录获取token
    async login({ commit }, data) {
        try {
            let result = await reqLogin(data);
            if (result.code === 200) {
                commit('GETTOKEN', result.data.token)
                // 登录成功后，将token存储到本地存储中
                setToken(result.data.token)
                return "ok";
            } else {
                return new Promise.reject("error");
            }
        } catch (err) {
            return Promise.reject(err);
        }
    },
    //获取用户信息
    async getUserInfo({ commit, state }) {
        // 优先从state获取token（性能更好）
        if (!state.token) {
            return Promise.reject("No token");  // 抛出错误，让路由守卫能捕获
        }
        try {
            let result = await reqGetUserInfo();
            if (result.code === 200) {
                commit('GETUSERINFO', result.data)
                return "ok";
            } else {
                return Promise.reject("error");
            }
        } catch (err) {
            return Promise.reject(err);
        }
    },
    //退出登录
    async logout({ commit }) {
        try {
            commit('GETTOKEN', '')
            commit('GETUSERINFO', {})
            removeToken()
            return "ok";
        } catch (err) {
            return Promise.reject(err);
        }
    },
}
const getters = {
    code(state) {
        return state.code
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
