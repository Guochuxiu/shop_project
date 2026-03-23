import { reqGetDetailList, reqPostAddCart } from '@/api/index'
import getUUID from '@/utils/uuid_token'
const state = {
    detailList: {},
    uuid_token: getUUID()
}
const mutations = {
    GETDETAILLIST(state, detailList) {
        state.detailList = detailList;
    }
}
const actions = {
    async getDetailList({ commit }, id) {
        let result = await reqGetDetailList(id);
        if (result.code == 200) {
            commit('GETDETAILLIST', result.data);
        }
    },
    async postAddCart({ skuid, num }) {
        console.log('商品数量接口变化', skuid, num);
        try {
            let result = await reqPostAddCart(skuid, num);
            return 'ok';
        } catch (err) {
            console.log(err);
        }
    }

}
const getters = {
    categoryView(state) {
        return state.detailList && state.detailList[0] && state.detailList[0].categoryView || {}
    },
    skuInfo(state) {
        return state.detailList && state.detailList[0] && state.detailList[0].skuInfo && state.detailList[0].skuInfo[0] || {}
    },
    spuSaleAttrList(state) {
        return state.detailList && state.detailList[0] && state.detailList[0].spuSaleAttrList || []
    },
    skuImageList(state) {
        return state.detailList && state.detailList[0] && state.detailList[0].skuImageList || []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}