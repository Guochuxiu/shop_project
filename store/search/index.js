import { reqGetSearchList } from "@/api"
const state = {
    searchList: {}
}
const mutations = {

    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
}
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchList(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
}
const getters = {
    attrsList(state) {
        return state.searchList && state.searchList[0] && state.searchList[0].attrsList || []
    },
    trademarketList(state) {
        return state.searchList && state.searchList[0] && state.searchList[0].trademarketList || []
    },
    goodsList(state) {
        return state.searchList && state.searchList[0] && state.searchList[0].goodsList || []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
