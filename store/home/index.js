import { getCategoryList, reqGetBannerList, reqGetFloorList } from '@/api/index'
const state = {
    categoryList: [],
    bannerList: [],
    floorList: {}
}
const mutations = {
    CATEGORYYLIST(state, categoryList) {
        state.categoryList = categoryList
        state.categoryList.length = 3
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
}
const actions = {
    async categoryList({ commit }) {
        //getCategoryList返回的是一个Promise对象
        //需要用await接受成功返回的结果，await必须要结合async一起使用（CP）
        let result = await getCategoryList();
        // console.log(result);

        if (result.code == 200) {
            commit("CATEGORYYLIST", result.data);
        }
    },
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data);
        }
    }
}
const getters = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
