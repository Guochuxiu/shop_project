import { reqGetAddressList, reqGetOrderList } from '@/api/index'
const state = {
    addressList: [],
    orderInfo: {}
};
const mutations = {
    GETADDRESSLIST(state, addressList) {
        state.addressList = addressList
        console.log(state.addressList)
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
        console.log("订单详情", state.orderInfo)
    }
};
const actions = {
    //获取交易列表
    async getUserAddress({ commit }) {
        try {
            let result = await reqGetAddressList();
            if (result.code === 200) {
                commit('GETADDRESSLIST', result.data)
                return "ok"
            } else {
                return new Promise.reject("error")
            }
        } catch (err) {
            return Promise.reject(err);
        }
    },
    //获取订单详情
    async getOrderInfo({ commit }) {
        try {
            let result = await reqGetOrderList();
            if (result.code === 200) {
                commit('GETORDERINFO', result.data.data)
                return "ok"
            } else {
                return new Promise.reject("error")
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
};
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}


