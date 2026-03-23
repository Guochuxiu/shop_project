import Vue from 'vue'
import Vuex from 'vuex'
//使用插件
Vue.use(Vuex)
//引入search模块
import search from './search'
//引入category模块
import home from './home'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

const store = new Vuex.Store({
    modules: {
        search,
        home,
        detail,
        shopcart,
        user,
        trade
    }
})
export default store