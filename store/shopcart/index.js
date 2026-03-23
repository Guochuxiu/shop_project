import { reqGetShopCartList, reqDeleteCart, reqCartState } from '@/api/index'
const state = {
    cartDetailList: {},
}
const mutations = {
    // 购物车信息
    GETDETAILLIST(state, detailList) {
        state.cartDetailList = detailList;
    }

}
const actions = {
    // 获取购物车信息
    async getShopCartList({ commit }) {

        let result = await reqGetShopCartList();
        if (result.code == 200) {
            commit('GETDETAILLIST', result.data);
        }
    },
    // 删除购物车商品
    async deleteCart({ commit }, skuId) {
        try {
            let result = await reqDeleteCart(skuId);
            console.log("删除购物车商品", skuId);
            return result;;
        } catch (err) {
            Promise.reject(err);
        }
    },
    // 修改购物车商品选中状态
    async cartState({ commit }, { skuId, isChecked }) {
        try {
            let result = await reqCartState(skuId, isChecked);
            console.log("修改购物车商品选中状态", skuId, isChecked);
            return result;
        } catch (err) {
            return Promise.reject(err);
        }
    },



}
const getters = {
    cartInfoList(state) {
        return state.cartDetailList && state.cartDetailList[0] && state.cartDetailList[0].cartInfoList || [];
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}